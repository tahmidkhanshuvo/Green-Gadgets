import React from "react";
import "./About_us.css";
import image1 from "../../assets/tahmid.jpg";
import image2 from "../../assets/saobia.jpg";
import image3 from "../../assets/khan.jpg";

const teamMembers = [
  {
    id: "20220204082",
    name: "Md. Tahmid Amir",
    image: image1, // Replace with actual image path
  },
  {
    id: "20220204088",
    name: "Saobia Islam",
    image: image2, // Replace with actual image path
  },
  {
    id: "20220204086",
    name: "Tahmid Khan",
    image: image3, // Replace with actual image path
  },
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-hero">
        <h1 className="about-title">Meet Our Team</h1>
      </div>

      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-image" />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-id">ID: {member.id}</p>
          </div>
        ))}
      </div>

      <div className="about-description">
        <h2>About Our Project</h2>
        <p className="big-text">
          🌍 **Empowering Sustainability Through Technology!**  
          <br /><br />
          We are revolutionizing **E-Waste Management** by creating an **innovative platform** 
          that facilitates the **buying and selling of e-waste, recycled, and refurbished products.**  
          Our system works **like an advanced ads listing website,** allowing individuals and businesses 
          to **post, browse, and purchase electronic waste products for reuse.**  
          <br /><br />
          ♻️ **Our mission is simple**: **Reduce electronic waste, promote sustainability, and make technology more accessible**  
          by extending the life cycle of electronic devices. By **recycling and refurbishing** used electronics,  
          we contribute to a **cleaner planet** while offering affordable and reliable tech solutions.  
          <br /><br />
          🚀 **Join us in shaping a future where e-waste becomes an opportunity, not a burden.**  
          Let’s work together to **reduce, reuse, and recycle!** 🌱💻♻️
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
