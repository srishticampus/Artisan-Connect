import { Button, ButtonGroup, Navbar, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaGooglePlay,
  FaApple,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";
import hero4 from "../../assets/hero4.jpg";
import hero5 from "../../assets/hero5.jpg";
import hero6 from "../../assets/hero6.jpg";
import feature1 from "../../assets/feature1.jpg";
import feature2 from "../../assets/feature2.jpg";
import feature3 from "../../assets/feature3.jpg";
import spotlight1 from "../../assets/spotlight1.jpg";
import spotlight2 from "../../assets/spotlight2.jpg";
import spotlight3 from "../../assets/spotlight3.jpg";
import best1 from "../../assets/best1.jpg";
import best2 from "../../assets/best2.jpg";
import best3 from "../../assets/best3.jpg";

import video from "../../assets/vid2.mp4";
import "./LandingPage.css";
import NavLanding from "./NavLanding";
import Footer from "../footer/Footer";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <NavLanding />

      {/* Hero Carousel */}
      <section className="carousel-section mt-0">
        <Carousel fade interval={3000} className="hero-carousel">
          {[hero1, hero2, hero3, hero4, hero5, hero6].map((img, i) => (
            <Carousel.Item key={i}>
              <img src={img} alt={`Slide ${i}`} className="carousel-img" />
              <Carousel.Caption className="carousel-caption">
                <h1>Empowering Artisans</h1>
                <p>Connecting Customers with Authentic Craftsmanship</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Description Section */}
      <section className="description-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="description-text">
            <strong>At Artisans Connect</strong>, we bridge the gap between
            traditional craftsmanship and modern convenience by bringing local
            art and handmade products straight from talented artisans to your
            fingertips.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose ArtisanConnect?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img
              src={feature1}
              alt="Handmade Quality"
              className="feature-img"
            />
            <h3>Handmade Quality</h3>
            <p>Every product is crafted with care by skilled artisans.</p>
          </div>
          <div className="feature-card">
            <img src={feature2} alt="Fair Trade" className="feature-img" />
            <h3>Fair Trade</h3>
            <p>We ensure artisans receive fair pricing for their work.</p>
          </div>
          <div className="feature-card">
            <img
              src={feature3}
              alt="Local & Sustainable"
              className="feature-img"
            />
            <h3>Local & Sustainable</h3>
            <p>Support eco-friendly and locally sourced products.</p>
          </div>
        </div>
      </section>

      <div className="video-section-wrapper py-5">
        <Container>
          <Row className="align-items-center">
            {/* Video Column */}
            <Col md={4} className="video-column">
              <video className="video" controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Col>

            {/* Description Column */}
            <Col md={8} className="text-column main-text">
              <p>
                We work directly with these talented creators to ensure that
                every item tells a unique story—rooted in authenticity, made
                with integrity, and crafted using high-quality, locally sourced
                materials. When you purchase from us, you're not just buying a
                product; you're investing in the legacy of genuine craftsmanship
                and supporting the livelihoods of artisans across the region.
                <br />
                <br />
                Whether you're shopping for unique goods, showcasing your craft,
                or delivering with pride, ArtisanConnect is where passion meets
                purpose. Join a community that values quality over quantity,
                stories over mass production, and people over profit. Together,
                let’s celebrate creativity, support small businesses, and make
                every purchase meaningful.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <section className="community-spotlight-oval my-5 py-4">
        <h2 className="text-center mb-5 spotlight-heading">
          ✨ Community Spotlight
        </h2>
        <Container>
          <Row className="gy-5 justify-content-center">
            {[
              {
                img: spotlight1,
                name: "Priya S.",
                craft: "Terracotta Artist – Madurai",
                story:
                  "Priya’s earthy terracotta pieces breathe life into traditional South Indian design. Her dedication to reviving heritage art has touched homes across the region.",
              },
              {
                img: spotlight2,
                name: "Rahim K.",
                craft: "Carpenter and designer– Kochi",
                story:
                  "Rahim transforms any piece of wood into elegant, eco-friendly products. Every piece is a blend of sustainability and soul.",
              },
              {
                img: spotlight3,
                name: "Meena",
                craft: "Handloom Weavers – Salem",
                story:
                  "This weaver weaves magic with threads. Their colorful sarees and scarves are rooted in culture and woven with love.",
              },
            ].map(({ img, name, craft, story }, idx) => (
              <Col md={4} key={idx}>
                <Card className="text-center shadow-sm p-3 border-0 spotlight-oval-card">
                  <div className="d-flex justify-content-center mb-3">
                    <img src={img} alt={name} className="oval-img" />
                  </div>
                  <Card.Body>
                    <Card.Title className="spot-best-color">{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted spot-best-color">
                      {craft}
                    </Card.Subtitle>
                    <Card.Text>{story}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>


      <section className="py-5 bg-indigo-100">
  <Container>
    <div className="text-center mb-5">
      <h2 className="fw-bold text-indigo-600">Support Local, Support the Earth</h2>
      <p className="fs-5 text-muted">
        Every choice you make matters. Here's how your support empowers both artisans and the planet.
      </p>
    </div>
    <Row className="gy-4">
      <Col md={4}>
        <div>
          <h5 className="text-indigo-600 fw-bold">Eco-Friendly Practices</h5>
          <p className="text-muted">
            Locally sourced products travel shorter distances, reducing transportation emissions and your carbon footprint.
          </p>
        </div>
      </Col>
      <Col md={4}>
        <div>
          <h5 className="text-indigo-600 fw-bold">Sustainable Communities</h5>
          <p className="text-muted">
            When you buy local, you invest in community livelihoods and support sustainable, small-scale production.
          </p>
        </div>
      </Col>
      <Col md={4}>
        <div>
          <h5 className="text-indigo-600 fw-bold">Earth-Friendly Choices</h5>
          <p className="text-muted">
            Local artisans use fewer resources and minimal packaging—helping reduce waste and preserve the environment.
          </p>
        </div>
      </Col>
    </Row>
  </Container>
</section>


      <section className="best-sellers-section my-5 py-4">
        <h2 className="text-center mb-4 best-sellers-title">🔥 Best Sellers</h2>
        <Container>
          <Row className="gy-4 justify-content-center">
            {[
              {
                img: best1,
                title: "Handwoven Cotton Saree",
                artisan: "Meena & Daughters",
                price: "₹2,499",
              },
              {
                img: best2,
                title: "Terracotta Tea Set",
                artisan: "Priya S.",
                price: "₹1,250",
              },
              {
                img: best3,
                title: "Paintings",
                artisan: "Rahim K.",
                price: "₹899",
              },
            ].map(({ img, title, artisan, price }, idx) => (
              <Col xs={12} sm={6} md={4} lg={3} key={idx}>
                <Card className="best-seller-card shadow-sm border-0 text-center h-100">
                  <Card.Img
                    variant="top"
                    src={img}
                    className="best-seller-img"
                  />
                  <Card.Body>
                    <Card.Title className="spot-best-color">{title}</Card.Title>
                    {/* <Card.Subtitle className="text-muted small mb-2">{artisan}</Card.Subtitle> */}
                    <Card.Text className="fw-bold text-dark spot-best-color">
                      {price}
                    </Card.Text>
                    
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
