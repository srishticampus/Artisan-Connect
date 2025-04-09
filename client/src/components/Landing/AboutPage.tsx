import React from "react";
import "./about.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-card-container">
        <div className="about-card">
          <h1 className="about-title">About Us</h1>
          <p className="about-description">
            Artisans Connect is a platform dedicated to empowering local
            artisans by bridging the gap between traditional craftsmanship and
            modern markets. We believe in the beauty of handmade goods and the
            value they bring to our culture and economy. Our mission is to
            provide artisans with the tools, visibility, and support they need
            to thrive in today's competitive world.
          </p>
          <p className="about-description">
            Through Artisans Connect, we aim to preserve indigenous art forms
            while enabling artisans to expand their reach beyond local
            boundaries. By combining technology with tradition, we create
            meaningful connections between creators and customers, ensuring
            every product tells a story of skill, passion, and heritage.
          </p>
        </div>
      </div>

      <div className="bottom-strip">
        <div className="about-item">Founded in 2020</div>
        <div className="about-item">
          Headquarters: Thiruvananthapuram, Kerala
        </div>
        <div className="about-item">
          Empowering People, Delivering Excellence
        </div>
      </div>
    </div>
  );
}