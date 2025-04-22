import React from "react";
import "./about.css";
import bannerImage from "../../assets/aboutus-banner.jpg"; // Background image
import teamImage from "../../assets/team.jpg"; // Optional image
import NavLanding from "./NavLanding";
import Footer from "../footer/Footer";

export default function AboutPage() {
  return (
    < >
    <NavLanding/>
    <div className="aboutus-wrapper">
      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="hero-overlay">
          <h1 className="hero-heading">About Us</h1>
        </div>
      </section>

      {/* Description Section */}
      <section className="aboutus-description-section">
        <div className="description-card">
          <h2>Who We Are</h2>
          <p>
            We are a passionate team committed to creating outstanding digital
            experiences. Our mission is to combine innovation and creativity to
            build solutions that empower individuals and businesses alike.
          </p>
          <p>
            With a focus on design, technology, and customer-centric values, we
            take pride in delivering services that are both meaningful and
            impactful.
          </p>
          <img src={teamImage} alt="Our Team" className="description-image" />
        </div>
      </section>
      <Footer/>
    </div>
    </>
  );
}
