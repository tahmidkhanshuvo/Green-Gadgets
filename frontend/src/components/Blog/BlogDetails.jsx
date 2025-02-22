import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Row, Col, Divider } from "antd";

const { Title, Paragraph } = Typography;

// Blog data (kept intact)
const blogPosts = {
  Recycle: [
    {
      id: 1,
      title: "How We Recycle E-Waste",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQo3rvtXPMoYRD34PQ7onH7Cf8Fx3O1hoqkOeaV_68kbhY1aVDyLt1Zao&s",
      description: "A detailed guide on how we recycle e-waste efficiently.",
      content: `**Why Recycling E-Waste Matters**
- **Reduces environmental pollution**
- **Conserves natural resources**
- **Prevents hazardous waste contamination**

**How We Recycle:**
1. **Collection & Sorting** - Gathering e-waste from various sources.
2. **Dismantling** - Separating useful components.
3. **Processing & Refining** - Extracting valuable materials.

![Recycling Process](https://via.placeholder.com/600)

[Learn More](https://example.com/recycling)

By following these steps, we ensure a sustainable future!`,
      date: "2024-02-15",
    },
    {
      id: 2,
      title: "Top Tips for E-Waste Recycling",
      image:
        "https://img.freepik.com/free-vector/students-learning-about-various-recyclable-materials_53876-40276.jpg?semt=ais_hybrid",
      description: "Tips on reducing and recycling your electronic waste.",
      content: `
✅ Top Tips for Recycling E-Waste Properly
1. Find Certified Recycling Centers
Look for R2-certified or e-Steward-approved recyclers to ensure safe disposal. Check out:
🔹 Call2Recycle – Find battery recycling locations.
🔹 Earth911 Recycling Locator – Search for e-waste recycling centers near you.

2. Erase Data Before Recycling
Before dropping off your old devices:
✔️ Back up important files to a cloud or external drive.
✔️ Factory reset your phone or computer.
✔️ Use data-wiping software like DBAN or CCleaner for extra security.

3. Consider Repair or Refurbishing
Instead of tossing old devices, consider repairing them. Visit websites like:
🔹 iFixit – Free repair guides for all electronics.
🔹 Local repair shops for affordable fixes.

4. Donate Usable Electronics
Functional devices can help students and low-income families. Some organizations that accept donations:
✔️ World Computer Exchange
✔️ Computers for Schools

Final Thoughts
Recycling e-waste isn’t just about disposing of gadgets—it’s about making smart,
sustainable choices. Let’s reduce, reuse, and recycle for a greener future! 🌍♻️

![Recycling Process](https://via.placeholder.com/600)

[Learn More](https://example.com/recycling)

By following these steps, we ensure a sustainable future!`,
      date: "2024-02-15",
    },
    {
      id: 3,
      title: "The Importance of Proper Disposal",
      image:
        "https://img.freepik.com/premium-vector/green-ecology-concept-with-abstract-paper-cut-background_44481-215.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "A detailed guide on how we recycle e-waste efficiently.",
      content: `⚠️ The Risks of Improper E-Waste Disposal
Incorrect disposal of e-waste leads to:
💧 Water contamination as heavy metals leach into groundwater.
🌱 Soil pollution affecting food production and agriculture.

✅ How to Dispose of E-Waste Responsibly
1. Use Manufacturer Take-Back Programs
Many companies offer recycling programs, such as:
✔️ Apple Trade-In – Exchange old devices for credit.
✔️ Dell Recycling – Free pickup for old computers.

2. Choose Professional E-Waste Recyclers
Check if the recycler follows environmental guidelines through:
🔹 e-Stewards – Global directory of responsible recyclers.

3. Avoid Dumping Batteries in Trash
Batteries contain mercury, lithium, and lead, which can be hazardous. Instead:
✔️ Drop them off at battery recycling stations in malls or hardware stores.
✔️ Use Call2Recycle for collection locations.

Final Thoughts
Proper disposal isn’t just about convenience—it’s about 
protecting our health and environment. Be responsible and choose sustainable recycling solutions!

![Recycling Process](https://via.placeholder.com/600)

[Learn More](https://example.com/recycling)`,
      date: "2024-02-15",
    },
    {
      id: 4,
      title: "The Future of E-Waste Recycling",
      image:
        "https://img.freepik.com/free-vector/isometric-recycling-composition-with-isolated-view-factory-area-with-plant-building-bins-dump-truck-vector-illustration_1284-79914.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "We can see a sustainable future by doint it",
      content: `🌎 The Future of E-Waste Recycling

🚀 Emerging Innovations in E-Waste Recycling
🔹 AI-Powered Sorting – Robots separate valuable materials like gold and silver.
🔹 Bioleaching – Bacteria extract metals from circuit boards without harmful chemicals.
🔹 Modular Electronics – Brands like Framework & Fairphone design repairable and upgradable devices.

What Can You Do?
✔️ Buy refurbished gadgets to reduce waste.
✔️ Support brands using sustainable materials.
✔️ Push for stronger e-waste recycling laws.

The future is green if we act now! 🌿♻️
![Recycling Process](https://via.placeholder.com/600)

[Learn More](https://example.com/recycling)

By following these steps, we ensure a sustainable future!`,
      date: "2024-02-15",
    },
  ],
  Refurbish: [
    {
      id: 8,
      title: "How to Refurbish Your Old Laptop",
      image:
        "https://img.freepik.com/free-photo/cheerful-positive-radioman-holding-laptop-with-blank-screen-making-gesture-showing-with-forefinger-having-double-adapter-various-cords-neck-standing-with-necessary-equipment_176532-9104.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "A step-by-step guide to refurbishing your old laptop.",
      content: `**Why Refurbishing Matters**
- **Saves money** by extending the life of electronics.
- **Reduces e-waste**, contributing to a greener environment.
- **Improves performance** with upgrades.

**Steps to Refurbish:**
1. **Clean & Disassemble** - Remove dust and clean components.
2. **Upgrade Components** - Replace old RAM, SSD, and battery.
3. **Install Software** - Update drivers and OS for better performance.

![Refurbishing Process](https://via.placeholder.com/600)

[More Tips](https://example.com/refurbish)

With the right approach, your old laptop can feel brand new!`,
      date: "2024-02-12",
    },
    {
      id: 9,
      title: "The Benefits of Refurbished Electronics",
      image:
        "https://img.freepik.com/free-vector/background-with-ecology-recycling-concept_23-2148234397.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "Why buying refurbished is a smart choice?",
      content: `*Why Choose Refurbished Electronics?
Many people hesitate to buy refurbished devices, 
but did you know top brands like Apple, Dell, and Samsung sell refurbished products with warranties?

✅ Key Benefits of Refurbished Electronics
✔️ Cost Savings – Up to 50% cheaper than new products.
✔️ Eco-Friendly – Reduces e-waste and saves natural resources.
✔️ High-Quality Testing – Certified refurbished devices undergo rigorous testing.
✔️ Warranty & Support – Many refurbished gadgets come with a 6- to 12-month warranty.

💡 Looking for trusted sources? Check out:
🔹 Apple Certified Refurbished
🔹 Dell Refurbished

Refurbished gadgets are affordable, reliable, and sustainable—a smart choice for every tech user!

![Refurbishing Process](https://via.placeholder.com/600)

[More Tips](https://example.com/refurbish)`,
      date: "2024-02-12",
    },
    {
      id: 10,
      title: "DIY Computer Refurbishing Tips",
      image:
        "https://img.freepik.com/premium-vector/modern-quick-tips-composition-with-flat-design_23-2147885475.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "How to refurbish and upgrade your PC.",
      content: `Want to upgrade your old PC or laptop instead of buying a new one? Follow these DIY refurbishing steps:

🔧 Step 1: Clean & Disassemble
✔️ Remove dust using compressed air.
✔️ Replace old thermal paste to prevent overheating.

💾 Step 2: Upgrade the Hardware
✔️ Add an SSD – Speeds up performance by 5x.
✔️ Upgrade RAM – 8GB is the new standard.
✔️ Replace the battery – Extend laptop life.

🖥️ Step 3: Install a Lightweight OS
✔️ Use Linux (Ubuntu, Mint) for older PCs.
✔️ Reinstall Windows with a clean setup.

🔗 Need step-by-step guides? Visit iFixit!

Refurbishing your computer saves money and reduces e-waste! ♻️

![Refurbishing Process](https://via.placeholder.com/600)

[More Tips](https://example.com/refurbish)

With the right approach, your old laptop can feel brand new!`,
      date: "2024-02-12",
    },
    {
      id: 11,
      title: "Best Places to Buy Refurbished Gadgets",
      image:
        "https://img.freepik.com/free-photo/laptop-shopping-bags-online-shopping-concept_1423-189.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "A list of the best sites for refurbished electronics.",
      content: `Published on: March 10, 2024

Looking for affordable yet reliable refurbished devices? Check out these trusted sources:

🔹 Apple Refurbished Store – Official Apple-certified devices.
🔹 Best Buy Refurbished – Certified pre-owned gadgets.
🔹 Back Market – Strict quality testing with a 1-year warranty.
🔹 Amazon Renewed – Budget-friendly refurbished electronics.
🔹 Newegg Refurbished – Laptops, GPUs, and more.

Buying refurbished saves money, helps the environment, and ensures quality! 🌱`,
      date: "2024-02-12",
    },
    {
      id: 12,
      title: "Refurbished product's Quality",
      image:
        "https://img.freepik.com/free-vector/character-illustration-home-improvement-concept_53876-43040.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "A step-by-step guide to refurbishing your old laptop.",
      content: `**Why Refurbishing Matters**
- **Saves money** by extending the life of electronics.
- **Reduces e-waste**, contributing to a greener environment.
- **Improves performance** with upgrades.

**Steps to Refurbish:**
1. **Clean & Disassemble** - Remove dust and clean components.
2. **Upgrade Components** - Replace old RAM, SSD, and battery.
3. **Install Software** - Update drivers and OS for better performance.

![Refurbishing Process](https://via.placeholder.com/600)

[More Tips](https://example.com/refurbish)

With the right approach, your old laptop can feel brand new!`,
      date: "2024-02-12",
    },
    {
      id: 13,
      title: "How we refurbish your e-wastes",
      image:
        "https://img.freepik.com/premium-photo/employee-paint-shop-automobile-plant-conducts-training-preparation-bumpers-painting_207949-113.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "A step-by-step guide to refurbishing your old laptop.",
      content: `Every discarded electronic device has hidden potential. Instead of letting them pile up in landfills, we refurbish and restore them to extend their lifespan. The process begins with a thorough inspection, where we assess which parts can be reused, repaired, or replaced.

Once devices are sorted, we proceed with:

Secure Data Erasure – Ensuring complete removal of personal information.
Hardware Repairs & Upgrades – Replacing faulty components like batteries, screens, and motherboards.
Software Optimization – Installing the latest OS updates, drivers, and security patches.
After rigorous testing, the refurbished devices are sold at affordable prices or donated to communities in need.
![Refurbishing Process](https://via.placeholder.com/600)

[More Tips](https://example.com/refurbish)

With the right approach, your old laptop can feel brand new!`,
      date: "2024-02-12",
    },
  ],
  "E-waste": [
    {
      id: 14,
      title: "E-Waste Management Strategies",
      image:
        "https://img.freepik.com/free-photo/man-drawing-bulb-gears_1134-465.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "The best ways to manage and reduce e-waste.",
      content: `With the growing problem of e-waste, proper management is crucial to minimize environmental impact. Governments and organizations worldwide are adopting strategies to ensure responsible disposal and recycling.

Some key strategies include:
✔️ Using Certified Recyclers – Partnering with licensed e-waste processing facilities.
✔️ Encouraging Take-Back Programs – Many companies now offer trade-in options for old devices.
✔️ Promoting Circular Economy – Designing products for longevity, repairability, and recyclability.

By adopting these practices, we can reduce toxic waste and preserve natural resources for future generations.

![E-Waste Management](https://via.placeholder.com/600)

[Learn More](https://example.com/ewaste)

Implementing these strategies ensures a cleaner planet!`,
      date: "2024-02-08",
    },
    {
      id: 15,
      title: "What Happens to E-Waste?",
      image:
        "https://img.freepik.com/premium-photo/large-pile-assorted-electronic-waste-including-components-devices-isolated-white-backg_829699-8257.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "The best ways to manage and reduce e-waste.",
      content: `When electronics are thrown away, they don’t just disappear. Many end up in landfills, where hazardous materials like lead and mercury seep into the soil and water. Others are illegally exported to developing countries, where unsafe dismantling methods pose serious health risks.

The responsible path for e-waste involves:

Recycling for Raw Materials – Extracting valuable metals like gold, silver, and copper.
Refurbishing & Reselling – Giving devices a second life through repairs and upgrades.
Proper Disposal of Toxic Components – Ensuring harmful substances don’t harm the environment.
Understanding the journey of e-waste helps us make better choices in handling our old electronics.

![E-Waste Management](https://via.placeholder.com/600)

[Learn More](https://example.com/ewaste)`,
      date: "2024-02-08",
    },
    {
      id: 16,
      title: "The Hidden Dangers of E-Waste",
      image:
        "https://img.freepik.com/free-vector/pollution-awareness-element-set_1284-32824.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid",
      description: "How e-waste harms the environment and health.",
      content: `Many people don’t realize that e-waste is one of the most toxic waste streams in the world. Devices contain harmful substances like lead, cadmium, and brominated flame retardants, which can cause severe health issues when not disposed of properly.

Why is e-waste dangerous?
Soil & Water Contamination – Toxic chemicals leach into the environment, affecting ecosystems.
Health Hazards – Exposure to heavy metals can lead to respiratory issues, neurological damage, and cancer.
Unsafe Recycling Practices – In many countries, informal workers dismantle e-waste with no protective gear.
Proper recycling and responsible disposal methods are essential to prevent these dangers.

![E-Waste Management](https://via.placeholder.com/600)

[Learn More](https://example.com/ewaste)

Implementing these strategies ensures a cleaner planet!`,
      date: "2024-02-08",
    },
    {
      id: 17,
      title: "E-Waste and the Environment",
      image:
        "https://img.freepik.com/free-vector/pollution-icon-flat_98292-1496.jpg?t=st=1740156035~exp=1740159635~hmac=2669fac21b6b7279b5dc2ff1f739ad8bc3d2de1683bdd8f56715044527bc9912&w=900",
      description: "E-wastes destroyes the environment.",
      content: `The environmental impact of e-waste is devastating. With millions of tons of electronic waste generated annually, landfills are overflowing, and natural resources are being depleted. The carbon footprint of manufacturing new devices is massive, making reuse and recycling more critical than ever.

To mitigate environmental damage:

Support Sustainable Manufacturing – Companies should use eco-friendly materials and modular designs.
Encourage Consumer Awareness – People need to be educated about proper disposal and recycling.
Reduce, Reuse, Recycle – Extending the life of electronics reduces demand for new resources.
By making conscious choices, we can minimize e-waste pollution and create a greener future.

![E-Waste Management](https://via.placeholder.com/600)

[Learn More](https://example.com/ewaste)

Implementing these strategies ensures a cleaner planet!`,
      date: "2024-02-08",
    },
    {
      id: 18,
      title: "E-waste Repair Guide",
      image:
        "https://img.freepik.com/free-vector/image-upload-landing-page_52683-23795.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400",
      description: "Its high time to learn how to repair e-wastes!",
      content: `Electronics break, but that doesn’t mean they should be thrown away! Repairing e-waste is a great way to save money, reduce pollution, and extend the life of your gadgets. With the right approach, many issues can be fixed at home or with professional help.
Electronics break, but that doesn’t mean they should be thrown away! Repairing e-waste is a great way to save money, reduce pollution, and extend the life of your gadgets. With the right approach, many issues can be fixed at home or with professional help.

Why Should You Repair Instead of Replace?
Saves Money 💰 – Buying new devices is expensive, but repairs are often much cheaper.
Reduces E-Waste ♻️ – Repairing prevents electronics from ending up in landfills.
Preserves Resources 🌍 – Manufacturing new devices consumes raw materials like metals and plastics.

🛠️ Common E-Waste Repairs & How to Fix Them
1️⃣ Battery Replacement
🔋 Issue: Your phone, laptop, or tablet won’t hold a charge.
🔧 Solution:
   Check if the battery is removable and order a replacement.
   For built-in batteries, visit an authorized repair center or a DIY repair guide.
2️⃣ Screen & Keyboard Fixes
💻 Issue: Cracked laptop screen or unresponsive keyboard.
🔧 Solution:
   Screens – Buy a replacement screen and carefully swap it using a repair guide.
   Keyboards – Clean under the keys; if that doesn’t work, replace the keyboard module.
3️⃣ Software & Performance Issues
🐢 Issue: Your device is slow, crashing, or freezing.
🔧 Solution:
   Remove unnecessary files & apps.
   Update drivers, operating systems, and security software.
   Reset the device to factory settings if necessary.
4️⃣ Charging Port or Speaker Problems
🔌 Issue: Your device won’t charge, or the sound is distorted.
🔧 Solution:
   Cleaning – Use a toothpick or soft brush to remove dust and debris.
   Port Replacement – If cleaning doesn’t help, ports can be replaced affordably.
📍 Where to Get E-Waste Repaired?
   If DIY repairs aren’t an option, consider:
   ✅ Authorized Service Centers – Best for warranty-covered devices.
   ✅ Local Repair Shops – Affordable and convenient.
   ✅ Self-Repair Kits – Websites like iFixit offer guides and tools.

🔄 Make Repairing a Habit!
By repairing instead of replacing, you contribute to a more sustainable world. Next time your device malfunctions, try fixing it first!

[Learn More](https://example.com/ewaste)

Implementing these strategies ensures a cleaner planet!`,
      date: "2024-02-08",
    },
  ],
};

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  const allBlogs = Object.values(blogPosts).flat();
  const blog = allBlogs.find((post) => post.id === parseInt(id));

  if (!blog) {
    return (
      <Title level={2} style={{ textAlign: "center", marginTop: "50px" }}>
        Blog Not Found
      </Title>
    );
  }

  const relatedBlogs = allBlogs.filter((post) => post.id !== blog.id).slice(0, 3);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      <Button
        onClick={() => navigate("/blogs")}
        type="link"
        style={{
          margin: "20px",
          fontSize: "16px",
          textDecoration: "underline",
        }}
      >
        ← Back to Blogs
      </Button>
      <Card
        bordered={false}
        style={{
          borderRadius: "0",
          boxShadow: "none",
          margin: "0",
          padding: "0",
        }}
      >
        <img
          src={blog.image}
          alt={blog.title}
          style={{
            width: "100%",
            height: "80vh",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div style={{ padding: "60px 40px", backgroundColor: "#f0f2f5" }}>
          <Title level={2} style={{ marginBottom: "20px" }}>
            {blog.title}
          </Title>
          <p style={{ color: "#888", marginBottom: "20px" }}>
            Published on: {blog.date}
          </p>
          <Paragraph
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
              color: "#333",
              maxWidth: "1200px",
              margin: "auto",
            }}
          >
            {blog.content || blog.description}
          </Paragraph>
        </div>
      </Card>

      <Divider orientation="left" style={{ color: "#333", margin: "40px 40px 20px" }}>
        Related Blogs
      </Divider>
      <Row gutter={[24, 24]} style={{ padding: "0 40px 40px" }}>
        {relatedBlogs.map((related) => (
          <Col xs={24} sm={12} md={8} key={related.id}>
            <Card
              hoverable
              onClick={() => navigate(`/blog/${related.id}`)}
              bordered={false}
              style={{ borderRadius: "8px" }}
              cover={
                <img
                  alt={related.title}
                  src={related.image}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              }
            >
              <Title level={4} style={{ margin: "0 0 10px" }}>
                {related.title}
              </Title>
              <Paragraph ellipsis={{ rows: 2 }}>{related.description}</Paragraph>
              <Button type="primary" block style={{ marginTop: "10px" }}>
                Read More
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogDetails;
