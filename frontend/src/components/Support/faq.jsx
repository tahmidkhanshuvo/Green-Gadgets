import React from 'react';
import './FAQ.css'; // You can create a custom CSS file for styling if needed

const FAQ = () => {
  return (
    <div className="faq-container">
      <h1>FAQ - Green Gadgets</h1>

      <div className="faq-item">
        <h3>1. What is e-waste recycling?</h3>
        <p>
          E-waste recycling is the process of collecting and recycling discarded electronic devices like old phones, computers, televisions, and other electronic gadgets to reduce environmental impact and extract valuable materials from them.
        </p>
      </div>

      <div className="faq-item">
        <h3>2. Why should I recycle my old electronics?</h3>
        <p>
          Recycling your electronics helps to:
          <ul>
            <li>Prevent harmful chemicals from polluting the environment.</li>
            <li>Save natural resources by recovering valuable materials like gold, copper, and plastic.</li>
            <li>Reduce landfill waste and energy consumption.</li>
            <li>Promote sustainability and support a circular economy.</li>
          </ul>
        </p>
      </div>

      <div className="faq-item">
        <h3>3. What types of electronics can I recycle with Green Gadgets?</h3>
        <p>You can recycle a wide variety of electronic items with us, including:</p>
        <ul>
          <li>Mobile phones and tablets</li>
          <li>Laptops and desktop computers</li>
          <li>Monitors, keyboards, and mice</li>
          <li>TVs and home appliances</li>
          <li>Batteries and chargers</li>
          <li>Gaming consoles</li>
          <li>Audio devices</li>
        </ul>
      </div>

      <div className="faq-item">
        <h3>4. How do I recycle my old gadgets with Green Gadgets?</h3>
        <p>
          Recycling your electronics is easy:
          <ol>
            <li>Check the items: Ensure your electronics are eligible for recycling.</li>
            <li>Drop off or schedule a pickup: Visit our website to find a nearby drop-off location or schedule a pickup for large items.</li>
            <li>We handle the rest: Our team will safely transport and recycle your gadgets in an environmentally friendly way.</li>
          </ol>
        </p>
      </div>

      <div className="faq-item">
        <h3>5. Is there a fee to recycle my old electronics?</h3>
        <p>
          At Green Gadgets, recycling is <strong>free</strong> for most small and medium-sized electronics. For large items, like old refrigerators or bulky monitors, there might be a small fee. Check our website for details.
        </p>
      </div>

      <div className="faq-item">
        <h3>6. What happens to my electronics after I recycle them?</h3>
        <p>
          After collection, your electronics are carefully dismantled and sorted. We safely extract valuable materials such as metals and plastics and responsibly dispose of hazardous materials like mercury and lead.
        </p>
      </div>

      <div className="faq-item">
        <h3>7. Do you offer any incentives for recycling with Green Gadgets?</h3>
        <p>
          Yes! We offer rewards such as discounts on new electronics and coupons for environmentally friendly products when you recycle with us. Check our promotions page for current offers.
        </p>
      </div>

      <div className="faq-item">
        <h3>8. Can I recycle damaged or broken electronics?</h3>
        <p>
          Yes! Even if your electronics are damaged or non-functional, we can still recycle them. We accept electronics in any condition.
        </p>
      </div>

      <div className="faq-item">
        <h3>9. How does e-waste recycling help the environment?</h3>
        <p>
          By recycling e-waste, we:
          <ul>
            <li>Prevent toxic substances from leaching into the soil and water.</li>
            <li>Reduce the need for new raw materials, lowering energy consumption.</li>
            <li>Help reduce carbon emissions by conserving natural resources.</li>
          </ul>
        </p>
      </div>

      <div className="faq-item">
        <h3>10. How can I make my electronics safe to recycle?</h3>
        <p>
          To prepare your electronics for recycling:
          <ul>
            <li><strong>Data wipe</strong>: Make sure to back up and wipe any personal data from devices like smartphones, laptops, and tablets.</li>
            <li><strong>Remove batteries</strong>: If possible, remove batteries from devices.</li>
            <li><strong>Separate cables</strong>: Detach any cords, chargers, or accessories.</li>
          </ul>
        </p>
      </div>

      <div className="faq-item">
        <h3>11. Is e-waste recycling different from regular recycling?</h3>
        <p>
          Yes, e-waste recycling requires specialized processes due to the unique materials and potential hazards in electronics. It ensures that hazardous substances like lead, mercury, and cadmium are disposed of safely, while valuable materials are recovered and reused.
        </p>
      </div>

      <div className="faq-item">
        <h3>12. Do you accept business or corporate e-waste?</h3>
        <p>
          Yes, Green Gadgets offers e-waste recycling services for businesses, corporations, and organizations. Contact us for bulk recycling options and scheduled pickups for your office or company.
        </p>
      </div>

      <div className="faq-item">
        <h3>13. How can I contact Green Gadgets for more information?</h3>
        <p>
          For more information or specific inquiries, you can reach us through:
          <ul>
            <li><strong>Phone</strong>: 123-456-7890</li>
            <li><strong>Email</strong>: <a href="mailto:support@greengadgets.com">support@greengadgets.com</a></li>
            <li><strong>Visit</strong>: Our nearest drop-off location.</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default FAQ;
