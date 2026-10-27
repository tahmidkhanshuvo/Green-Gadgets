const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");
process.env.JWT_SECRET = "green-gadgets-local-test-secret";
const { app, io } = require("../index");
let server;
let base;
const userId = "000000000000000000000001";
const token = jwt.sign({ userId }, process.env.JWT_SECRET);
before(async () => {
  server = await new Promise((resolve) => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  await new Promise((resolve) => server.close(resolve));
  io.close();
});
test("private conversations require authentication", async () => {
  const response = await fetch(`${base}/api/chats/000000000000000000000002`);
  assert.equal(response.status, 401);
});
test("uploads and seller lookup require authentication", async () => {
  assert.equal(
    (await fetch(`${base}/api/upload/ad`, { method: "POST" })).status,
    401,
  );
  assert.equal(
    (await fetch(`${base}/api/users/email/seller@example.test`)).status,
    401,
  );
});
test("user JSON serialization never includes the password hash", () => {
  const User = require("../models/User");
  const serialized = new User({
    name: "Seller",
    email: "seller@example.test",
    password: "hash",
    location: "Dhaka",
  }).toJSON();
  assert.equal(Object.hasOwn(serialized, "password"), false);
});
test("a user cannot list another person’s chats", async () => {
  const response = await fetch(
    `${base}/api/chats/user/000000000000000000000002`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  assert.equal(response.status, 403);
});
test("malformed chat identifiers return a controlled not-found response", async () => {
  const response = await fetch(`${base}/api/chats/invalid`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal(response.status, 404);
});
test("a conversation cannot be created on behalf of two other people", async () => {
  const response = await fetch(`${base}/api/chats`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      participants: ["000000000000000000000002", "000000000000000000000003"],
    }),
  });
  assert.equal(response.status, 400);
});
test("marketplace help answers without a third-party model", async () => {
  const response = await fetch(`${base}/api/assistant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "How do I sell a phone?" }),
  });
  assert.equal(response.status, 200);
  assert.match((await response.json()).reply, /Post Free Ads/);
});

test("listing validation rejects blank, null and boolean prices", () => {
  const validate = require("../middleware/validateAd");
  const listing = { title: "Phone", category: "Reuse", subCategory: "Mobile", description: "Working phone", location: "Dhaka", mobile: "01700000000", mainImage: "https://example.test/phone.jpg", images: [] };
  for (const price of [null, "", "  ", true, -1, "invalid"]) {
    let status;
    validate({ body: { ...listing, price } }, { status(code) { status = code; return this; }, json() {} }, () => assert.fail("invalid price accepted"));
    assert.equal(status, 400);
  }
  for (const price of [0, "0", 1200]) {
    let accepted = false;
    validate({ body: { ...listing, price } }, {}, () => { accepted = true; });
    assert.equal(accepted, true);
  }
});
