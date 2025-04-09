import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import "./contact.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Centered Card */}
      <div className="contact-card-container">
        <div className="contact-card">
          <h1 className="contact-title">Contact Us</h1>
          <form className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-input" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows={4} className="form-input"></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>

{/* Bottom Strip */}
      <div className="bottom-strip">
        <div className="contact-item">
          <MapPin className="icon" />
          <span>123, Indigo Street, Thiruvananthapuram, Kerala</span>
        </div>
        <div className="contact-item">
          <Mail className="icon" />
          <span>contact@yourcompany.com</span>
        </div>
        <div className="contact-item">
          <Phone className="icon" />
          <span>+91 98765 43210</span>
        </div>
      </div>
    </div>
  );
}
