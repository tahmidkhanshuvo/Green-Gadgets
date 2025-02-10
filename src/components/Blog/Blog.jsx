import React, { useState } from "react";
import { List, Avatar, Space, Button, Card } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";


const articles = {
  recycle: [
    {
      title: "How to Recycle E-Waste Products",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      description: "E-waste recycling is an essential process in managing discarded electronic devices responsibly.",
      content: `E-waste recycling ensures materials are reused efficiently, reducing environmental damage. Many electronic components, such as metals, plastics, and rare earth elements, can be extracted and repurposed. By recycling E-waste, we can conserve natural resources and reduce the negative environmental impacts caused by mining and production.  
      Proper recycling also prevents the release of harmful chemicals into the environment, including heavy metals like lead and mercury. Additionally, recycling facilities ensure that electronics are disposed of safely, without contaminating the soil or water. By making recycling a routine part of our lives, we contribute to a sustainable future.  
      So, the next time you dispose of an old device, remember that recycling is the responsible and eco-friendly choice.`
    },
    {
      title: "Benefits of Recycling",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      description: "Recycling e-waste conserves natural resources and prevents hazardous waste.",
      content: `Recycling e-waste conserves natural resources and prevents hazardous waste. Many electronics contain valuable materials such as gold, copper, and silver, which can be extracted and reused in the manufacturing of new products. This reduces the need for mining, which has significant environmental impacts, including habitat destruction and pollution.  
      Additionally, by recycling E-waste, we help prevent the accumulation of hazardous substances like lead, mercury, and cadmium in landfills. These substances can leach into the soil and water, posing significant risks to human health and the environment. Recycling E-waste properly mitigates these risks and helps build a more sustainable and circular economy.`
    },
  ],
  refurbish: [
    {
      title: "How to Refurbish E-Waste Products",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
      description: "Refurbishing extends the lifespan of devices while reducing unnecessary disposal.",
      content: `Refurbishing old electronic devices not only helps in reducing e-waste but also provides economic benefits by giving second-hand products a new life. A refurbishing process typically involves repairing broken parts, upgrading hardware like the processor or memory, and thoroughly cleaning the device. Refurbished devices are tested to ensure they function like new, and then they can be resold or donated for continued use.  
      This process is often cheaper than buying new devices and can save consumers a significant amount of money. Refurbished devices are a sustainable option for people who want to reduce their environmental impact and still access high-quality technology. By refurbishing devices, we extend their useful life, conserve resources, and contribute to sustainability.`
    },
    {
      title: "Benefits of Refurbishing E-Waste",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
      description: "Refurbishing electronics contributes to sustainability and provides affordable tech options.",
      content: `Refurbishing electronics contributes to sustainability by reducing the amount of e-waste that ends up in landfills. Instead of being thrown away, devices like phones, laptops, and tablets are given a second chance at life. Refurbishing also promotes a circular economy by extending the lifespan of products, reducing the demand for new electronics, and conserving valuable materials such as metals and plastics.  
      Aside from environmental benefits, refurbished devices are an affordable alternative to purchasing new products. Consumers can save money while still getting access to fully functional devices. Many refurbished electronics come with warranties, ensuring peace of mind for buyers. By refurbishing devices, we can lower e-waste, reduce the consumption of raw materials, and provide more affordable tech options to individuals around the world.`
    },
  ],
  e_waste: [
    {
      title: "Impact of e-waste on our environment",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
      description: "Electronic waste, or E-waste, is one of the fastest-growing waste streams in the world. With technology evolving rapidly, old devices become obsolete, leading to massive amounts of discarded electronics.",
      content: `E-waste contains hazardous materials like lead, mercury, and cadmium, which can harm the environment if not disposed of properly. Unfortunately, many electronic devices end up in landfills, where toxic chemicals leach into the soil and water. The rapid growth of e-waste is directly linked to the increasing use of electronics, such as smartphones, laptops, and other gadgets. With a constant cycle of technological advancements, old devices become outdated faster than they can be disposed of properly.  
      The Solution:  
      To tackle this issue, we need to:  
      ✅ Recycle old electronics properly  
      ✅ Donate or sell working devices instead of throwing them away  
      ✅ Support companies that use sustainable materials in electronics  
      By making conscious choices, we can reduce E-waste and protect our planet! 🌍♻️`
    },
    {
      title: "What can we do with e-waste",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
      description: "Many electronic components can be reused or recycled to prevent pollution. Take your old gadgets to a certified E-waste recycling center where they can be safely processed",
      content: `There are many ways we can manage E-waste responsibly, and it starts with reducing, reusing, and recycling old electronics.  
      **Donate or Resell** 💻  
      If your electronic device is still functional, consider donating it to:  
      ✔️ Schools or charities  
      ✔️ Local organizations  
      ✔️ Friends or family members  
      You can also sell or trade it in for an upgrade!  

      **Repair & Refurbish** 🔄  
      Many devices can be fixed instead of being discarded. Try repairing your electronics or buying refurbished products instead of new ones. Refurbished electronics are a great way to reduce waste and conserve resources.  

      **Repurpose Old Gadgets** 🛠️  
      Turn old devices into useful tools:  
      ✔️ Use an old phone as a security camera 📷  
      ✔️ Turn a tablet into a digital photo frame 🖼️  
      ✔️ Convert an old computer into a media server 🎥  

      **Be a Conscious Consumer** 🌱  
      Before buying new gadgets:  
      ✅ Choose products with longer lifespans  
      ✅ Look for brands with recycling programs  
      ✅ Avoid upgrading too frequently to reduce waste  

      By managing E-waste responsibly, we can protect the environment and conserve natural resources! 🌍💚`
    },
  ],
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Blog = ({ themeMode }) => {
  const [selectedTopic, setSelectedTopic] = useState("recycle");

  // Define colors for light and dark mode
  const isDarkMode = themeMode === "dark";
  const cardBackground = isDarkMode ? "#e8f5e9" : "#e8f5e9";
  const textColor = isDarkMode ? "#000" : "#000";

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "auto", color: textColor }}>
      <div style={{ textAlign: "matchParent", margin: "20px" }}>
        {Object.keys(articles).map((topic) => (
          <Button
            key={topic}
            type={selectedTopic === topic ? "primary" : "default"}
            onClick={() => setSelectedTopic(topic)}
            style={{ margin: "0 10px" }}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </Button>
        ))}
      </div>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{ pageSize: 2 }}
        dataSource={articles[selectedTopic]}
        renderItem={(item) => (
          <Card style={{ backgroundColor: cardBackground, color: textColor, marginBottom: "16px", borderRadius: "8px" }}>
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="star" />,
                <IconText icon={LikeOutlined} text="120" key="like" />,
                <IconText icon={MessageOutlined} text="24" key="comment" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href="#" style={{ color: textColor }}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          </Card>
        )}
      />
    </div>
  );
};

export default Blog;
