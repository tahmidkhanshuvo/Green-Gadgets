import React from 'react';
import './HelpCenter.css'; // Optional: Create a custom CSS file for styling

const HelpCenter = () => {
  return (
    <div className="help-center-container">
      <h1>Welcome to the Help Center</h1>
      <p>
        We're here to help! Browse the topics below for answers to common questions or feel free to contact us directly.
      </p>

      <div className="help-topic">
        <h3>1. How to recycle your electronics?</h3>
        <p>
          Recycling your electronics is easy! Simply follow our step-by-step guide to ensure your devices are disposed of in an environmentally friendly way. Visit our <strong><a href="/recycling-guide">Recycling Guide</a></strong> for more details.
        </p>
      </div>

      <div className="help-topic">
        <h3>2. What happens to my electronics after recycling?</h3>
        <p>
          After we collect your old electronics, we carefully dismantle them and extract valuable materials like metals and plastics. Hazardous substances are safely disposed of, and the recovered materials are reused to make new products.
        </p>
      </div>

      <div className="help-topic">
        <h3>3. How can I schedule a pickup?</h3>
        <p>
          Scheduling a pickup is easy! Simply visit our <strong><a href="/schedule-pickup">Pickup Scheduling Page</a></strong> and enter your details. Our team will contact you to arrange a convenient time for collection.
        </p>
      </div>

      <div className="help-topic">
        <h3>4. What types of electronics can be recycled?</h3>
        <p>
          We accept a wide variety of electronics, including:
          <ul>
            <li>Mobile phones and tablets</li>
            <li>Laptops and desktops</li>
            <li>Monitors, keyboards, and mice</li>
            <li>Home appliances</li>
            <li>TVs and audio devices</li>
            <li>And much more!</li>
          </ul>
          If you're unsure about a specific item, visit our <strong><a href="/faq">FAQ</a></strong> page for more information.
        </p>
      </div>

      <div className="help-topic">
        <h3>5. How do I contact customer support?</h3>
        <p>
          If you have any questions or need assistance, please reach out to our customer support team via:
          <ul>
            <li>Email: <a href="mailto:support@greengadgets.com">support@greengadgets.com</a></li>
            <li>Phone: 123-456-7890</li>
            <li>Or visit our <strong><a href="/contact">Contact Page</a></strong> for more ways to reach us.</li>
          </ul>
        </p>
      </div>

      <p>
        For more information, please visit our <strong><a href="/terms-and-conditions">Terms & Conditions</a></strong> and <strong><a href="/privacy-policy">Privacy Policy</a></strong> pages.
      </p>
    </div>
  );
};

export default HelpCenter;
