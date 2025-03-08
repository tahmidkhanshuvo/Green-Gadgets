import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      <div className="contact-info">
        <div className="contact-item">
          <h4>Email</h4>
          <p>support@greengadgets.com</p>
        </div>

        <div className="contact-item">
          <h4>Phone</h4>
          <p>+1 (123) 456-7890</p>
        </div>

        <div className="contact-item">
          <h4>Address</h4>
          <p>123 Green Road Street,Dhanmondi,Dhaka, Bangladesh</p>
        </div>

        <div className="contact-item">
          <h4>Business Hours</h4>
          <p>Sunday - Saturday: 9:00 AM - 6:00 PM</p>
        </div>
      </div>

      <div className="footer-note">
        <p>We’re here to help! Feel free to reach out to us with any inquiries.</p>
      </div>
    </div>
  );
};

export default Contact;
