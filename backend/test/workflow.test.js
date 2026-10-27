const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { io: connectSocket } = require("socket.io-client");
process.env.JWT_SECRET = "isolated-marketplace-test-secret";
const { server, io } = require("../index");
let database, base, users;

before(async () => {
  if (process.env.TEST_MONGO_BASE_URI) {
    const uri = new URL(process.env.TEST_MONGO_BASE_URI);
    uri.pathname = `/green_gadgets_test_${Date.now()}_${process.pid}`;
    await mongoose.connect(uri.toString());
  } else {
    database = await MongoMemoryServer.create();
    await mongoose.connect(database.getUri());
  }
  await Promise.all(
    Object.values(mongoose.models).map((model) => model.init()),
  );
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  users = [];
  for (const name of ["Alice", "Bob", "Mallory"]) {
    const result = await request("/api/auth/register", null, {
      name,
      email: `${name.toLowerCase()}@example.test`,
      password: "sample-test-password",
      location: "Dhaka",
    });
    assert.equal(result.status, 201);
    users.push(result.body);
  }
});
after(async () => {
  await new Promise((resolve) => io.close(resolve));
  try {
    if (/^green_gadgets_test_\d+_\d+$/.test(mongoose.connection.name)) {
      for (const collection of await mongoose.connection.db.collections())
        await collection.drop();
    }
  } finally {
    await mongoose.disconnect();
    if (database) await database.stop();
  }
});
async function request(path, token, body, method = body ? "POST" : "GET") {
  const response = await fetch(base + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { status: response.status, body: await response.json() };
}

test("account, listing identity and blog content work together", async () => {
  const [alice] = users;
  const profile = await request("/api/account/profile", alice.token);
  assert.equal(profile.status, 200);
  assert.equal(Object.hasOwn(profile.body.user, "password"), false);
  const listing = await request("/api/ad", alice.token, {
    title: "Reusable keyboard",
    category: "Reuse",
    subCategory: "Keyboard",
    description: "A test listing in an isolated database.",
    price: 0,
    location: "Dhaka",
    mobile: "01700000000",
    mainImage: "https://example.test/keyboard.jpg",
    images: ["https://example.test/keyboard.jpg"],
    name: "Forged seller",
    email: "bob@example.test",
  });
  assert.equal(listing.status, 201);
  assert.equal(listing.body.email, "alice@example.test");
  assert.equal(listing.body.name, "Alice");
  assert.equal(listing.body.createdBy, alice.user.id);
  assert.equal((await request(`/api/ad/${listing.body._id}`)).status, 200);
  const bob = users[1];
  assert.equal(
    (
      await request(
        `/api/ad/${listing.body._id}/status`,
        bob.token,
        { status: "sold" },
        "PATCH",
      )
    ).status,
    404,
  );
  assert.equal(
    (
      await request(
        `/api/ad/${listing.body._id}/status`,
        alice.token,
        { status: "sold" },
        "PATCH",
      )
    ).status,
    200,
  );
  assert.equal(
    (await request("/api/ad")).body.some((ad) => ad._id === listing.body._id),
    false,
  );
  assert.equal(
    (await request("/api/ad/mine", alice.token)).body[0].status,
    "sold",
  );
  await request(
    `/api/ad/${listing.body._id}/status`,
    alice.token,
    { status: "active" },
    "PATCH",
  );
  await request(`/api/account/favorites/${listing.body._id}`, bob.token, {});
  await request(`/api/account/favorites/${listing.body._id}`, bob.token, {});
  const favorites = await request("/api/account/favorites", bob.token);
  assert.equal(favorites.body.length, 1);
  assert.equal(favorites.body[0]._id, listing.body._id);
  assert.deepEqual(
    (
      await request(
        `/api/account/favorites/${listing.body._id}`,
        bob.token,
        null,
        "DELETE",
      )
    ).body.favorites,
    [],
  );
  assert.equal(
    (
      await request(
        "/api/account/change-password",
        alice.token,
        { currentPassword: "wrong", newPassword: "replacement-test-password" },
        "PUT",
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await request(
        "/api/account/change-password",
        alice.token,
        {
          currentPassword: "sample-test-password",
          newPassword: "replacement-test-password",
        },
        "PUT",
      )
    ).status,
    200,
  );
  const blog = await request("/api/blog", alice.token, {
    title: "Circular tech",
    category: "Reuse",
    shortDescription: "Repair and reuse.",
    content:
      '<p>Keep <strong>good tech</strong>.</p><script>alert(1)</script><a href="javascript:alert(1)" onclick="alert(1)">Read</a>',
  });
  assert.equal(blog.status, 201);
  assert.match(blog.body.blog.content, /<strong>good tech<\/strong>/);
  assert.doesNotMatch(blog.body.blog.content, /script|onclick|javascript:/i);
});

test("HTTP conversations enforce membership and authenticated sender identity", async () => {
  const [alice, bob, mallory] = users;
  const chat = await request("/api/chats", alice.token, {
    participants: [alice.user.id, bob.user.id],
  });
  assert.equal(chat.status, 200);
  const id = chat.body._id;
  assert.equal((await request(`/api/chats/${id}`, mallory.token)).status, 404);
  assert.equal(
    (
      await request("/api/chats/message", mallory.token, {
        chatId: id,
        text: "Intrusion",
      })
    ).status,
    404,
  );
  const message = await request("/api/chats/message", alice.token, {
    chatId: id,
    sender: bob.user.id,
    text: "Hello, is this available?",
  });
  assert.equal(message.status, 200);
  assert.equal(message.body.messages[0].sender, alice.user.id);
  const buyerView = await request(`/api/chats/${id}`, bob.token);
  assert.equal(buyerView.body.messages.length, 1);
  assert.equal(
    buyerView.body.participants.some((user) => Object.hasOwn(user, "password")),
    false,
  );
});

test("socket messages require a token and acknowledge stored messages", async (t) => {
  const [alice, bob] = users;
  const guest = connectSocket(base, { reconnection: false });
  t.after(() => guest.disconnect());
  await new Promise((resolve, reject) => {
    guest.once("connect", () =>
      reject(new Error("Anonymous socket connected")),
    );
    guest.once("connect_error", resolve);
    setTimeout(
      () => reject(new Error("Socket authentication timed out")),
      10000,
    ).unref();
  });
  const chat = await request("/api/chats", alice.token, {
    participants: [alice.user.id, bob.user.id],
  });
  const client = connectSocket(base, {
    auth: { token: alice.token },
    reconnection: false,
  });
  t.after(() => client.disconnect());
  await new Promise((resolve, reject) => {
    client.once("connect", resolve);
    client.once("connect_error", reject);
  });
  assert.deepEqual(
    await client
      .timeout(10000)
      .emitWithAck("joinChat", { chatId: chat.body._id }),
    { ok: true },
  );
  const confirmed = await client
    .timeout(10000)
    .emitWithAck("sendMessage", {
      chatId: chat.body._id,
      sender: bob.user.id,
      text: "Socket hello",
    });
  assert.equal(confirmed.ok, true);
  const view = await request(`/api/chats/${chat.body._id}`, bob.token);
  assert.equal(view.body.messages.at(-1).sender, alice.user.id);
});
