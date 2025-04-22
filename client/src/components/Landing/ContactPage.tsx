import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import "./contact.css";
import contactus from "../../assets/contactus.jpg";
import NavLanding from "./NavLanding";
import Footer from "../footer/Footer";

export default function ContactPage() {
  return (
    <>
    <NavLanding/>
    <div
      className="contact-page"
      style={{
        backgroundImage: `url(${contactus})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Sidebar */}
      <div className="sidebar">
        <div className="contact-item">
          <MapPin className="icon" />
          <span>ArtisansConnect, no: 12, Ulloor junction, Thiruvananthapuram, Kerala</span>
        </div>
        <div className="contact-item">
          <Mail className="icon" />
          <span>contact@artisansconnect.com</span>
        </div>
        <div className="contact-item">
          <Phone className="icon" />
          <span>+91 98765 43210</span>
        </div>
      </div>

      {/* Contact Card */}
      <div className="contact-card-container">
        <div className="contact-card">
          <h1 className="contact-title">Contact Us</h1>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={4} className="form-input" required />
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
}
