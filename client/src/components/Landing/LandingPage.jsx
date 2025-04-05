import React from 'react'
import { Button, ButtonGroup, Navbar, Carousel, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaGooglePlay, FaApple, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";


function LandingPage() {
  return (
<div className="bg-white text-dark min-vh-100 px-2" style={{ scrollBehavior: "smooth", fontFamily: 'Segoe UI, sans-serif', overflowX: "hidden" }}>
      {/* Navbar */}
      <Navbar className="shadow-sm px-5 py-3 w-100 d-flex justify-content-between align-items-center mx-0">
        <Navbar.Brand href="#" style={{ color: "#7a5c3e", fontWeight: "bold", fontSize: "2rem" }}>ArtisanConnect</Navbar.Brand>
        <div className="d-flex gap-3 align-items-center">
          <Button variant="outline-success" className="rounded-pill px-4" style={{borderColor:"#5e4b3c", color: "#5e4b3c", fontWeight: "500" }}>Become a Seller</Button>
          <ButtonGroup>
            <Button variant="outline-secondary" className="rounded-start-pill px-3" style={{fontWeight: "500" }}>Login</Button>
            <Button variant="primary" className="rounded-end-pill px-3" style={{ borderColor: "#bfa98d", fontWeight: "500" }}>Sign Up</Button>
          </ButtonGroup>
        </div>
      </Navbar>

      {/* Description Section */}
      <section className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="lead text-center" style={{ color: "#5e4b3c", fontSize: "25px", maxWidth: "900px", margin: "0 auto" }}>
            <strong>At Artisans Connect</strong>, we bridge the gap between traditional craftsmanship and modern convenience by bringing local art and handmade products straight from talented artisans to your fingertips. Whether you're searching for authentic pottery, handwoven textiles, or unique home décor, our platform makes it easy to explore and support your region’s hidden gems. With just a few clicks, customers can discover their favorite local creations, celebrate cultural heritage, and empower communities — all while enjoying the ease of online shopping.
          </p>
        </motion.div>
      </section>


{/* CTA Section */}
      <section className="text-center py-5" style={{ backgroundColor: "#f0ebe1" }}>
        <h2 className="h4 fw-bold mb-3" style={{ color: "#7a5c3e" }}>Download the App</h2>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button variant="outline-dark" className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill">
            <FaGooglePlay /> Google Play
          </Button>
          <Button variant="outline-dark" className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill">
            <FaApple /> App Store
          </Button>
        </div>
      </section>

      {/* Social Media Strip */}
      <section className="text-center py-3" style={{ backgroundColor:"#e7e1d4" }}>
        <div className="d-flex justify-content-center gap-4">
          <a href="#" className="text-dark fs-5"><FaInstagram /></a>
          <a href="#" className="text-dark fs-5"><FaFacebookF /></a>
          <a href="#" className="text-dark fs-5"><FaTwitter /></a>
        </div>
        <p className="mt-2 mb-0 small" style={{ color: "#7a5c3e" }}>Follow us on social media</p>
      </section>
    </div>

  )
}

export default LandingPage
