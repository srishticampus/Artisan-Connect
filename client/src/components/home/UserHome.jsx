import React from "react";
import Navbar from "../navigation/Navbar";
import Hero from "./Hero";
import FeaturedArtisans from "./FeaturedArtisans";
import Footer from "../footer/Footer";
import categoryImg from "../../assets/category3.jpg";
import { FaRobot } from "react-icons/fa";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./BuyersHomePage.css";
import bannerImg from "../../assets/buyers-banner.jpg";
import category1 from "../../assets/category1.jpg";
import category2 from "../../assets/category2.jpg";
import category3 from "../../assets/category3.jpg";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import lakshmi from "../../assets/lakshmi.jpg";
import ravi from "../../assets/ravi.jpg";
import meena from "../../assets/meena.jpg";
import { Link } from "react-router-dom";

function UserHome() {
  return (
    <div>
      <div>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Hero />

          {/* Section: Motivational Quote */}
          <section className="quote-section text-center my-4 px-3">
            <h4 className="text-indigo-700 italic">
              “Crafted with heart, delivered with pride — discover the stories
              behind every handmade piece.”
            </h4>
          </section>

          <section className="py-5 bg-white">
            <Container>
              <Row className="justify-content-center">
                <Col md={10}>
                  <h2 className="text-center text-indigo-800 fw-bold mb-4">
                    Celebrating Craftsmanship & Culture
                  </h2>
                  <p className="fs-5 text-muted text-center">
                    Discover a vibrant selection of handcrafted products ranging
                    from traditional handloom textiles and wooden carvings to
                    eco-friendly home décor and naturally dyed accessories. Each
                    piece tells a story of heritage, precision, and cultural
                    pride passed down through generations. Our dedicated
                    artisans pour their heart and soul into every creation,
                    ensuring authenticity and quality in every detail. Support
                    local communities while experiencing the richness of India’s
                    diverse art forms—all in one place.
                  </p>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="py-5 bg-light">
            <Container>
              <Row className="align-items-center">
                {/* Image Column */}
                <Col md={5} className="mb-4 mb-md-0">
                  <img
                    src={categoryImg}
                    alt="Category"
                    className="img-fluid rounded-4 shadow"
                  />
                </Col>

                {/* Text Column */}
                <Col md={7}>
                  <h2 className="text-indigo-800 fw-bold mb-3">
                    Explore Unique Categories
                  </h2>
                  <p className="text-muted  mb-4">
                    Dive into our vibrant world of handcrafted artistry. Each
                    category brings you closer to local craftsmanship and
                    traditional skills. Choose your favorite and discover
                    treasures made with passion.
                  </p>
                  <ul className="list-unstyled  ps-3">
                    <li className="mb-2">🌿 Handloom Weaves</li>
                    <li className="mb-2">🖌️ Natural Dye Textiles</li>
                    <li className="mb-2">🪵 Wooden Carvings</li>
                    <li className="mb-2">🏺 Traditional Pottery</li>
                    <li className="mb-2">🎨 Eco-friendly Decor</li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </section>

          {/* Section: Meet Our Artisans */}
          <section className="meet-artisans-section">
            <Container>
              <h2 className="section-title text-center mb-5">
                Meet Our Artisans
              </h2>
              <Row className="gy-4 justify-content-center">
                {[
                  {
                    name: "Lakshmi Deepak",
                    expertise: "Handwoven Sarees",
                    image: lakshmi,
                  },
                ].map((artisan, index) => (
                  <Col md={4} sm={6} key={index}>
                    <Card className="artisan-card text-center">
                      <Card.Body>
                        <Card.Img
                          src={artisan.image}
                          className="artisan-img img-fluid rounded-circle"
                        />
                        <Card.Title className="artisan-name">
                          {artisan.name}
                        </Card.Title>
                        <Card.Text className="artisan-expertise">
                          {artisan.expertise}
                        </Card.Text>
                        <Button
                          variant="outline-dark"
                          className="view-products-btn"
                        >
                          View Products
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>

          {/* Section 4: Why Choose Us */}
          <section className="why-section">
            <Container>
              <h2 className="section-title">Why Shop on ArtisanConnect?</h2>
              <Row className="gy-4 text-center">
                <Col md={4}>
                  <h5>Authentic & Handmade</h5>
                  <p>
                    Every product is crafted with care and passion by skilled
                    artisans.
                  </p>
                </Col>
                <Col md={4}>
                  <h5>Direct Support</h5>
                  <p>
                    Your purchases directly support small businesses and
                    creators.
                  </p>
                </Col>
                <Col md={4}>
                  <h5>Sustainable Choices</h5>
                  <p>
                    Our platform promotes eco-conscious and locally sourced
                    goods.
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
          {/* Floating Chatbot Icon */}
          <Link to="/chatbot">
          <div
            className="fixed bottom-5 right-5 bg-indigo-600 text-white p-4 rounded-full shadow-lg z-50 cursor-pointer hover:bg-indigo-700 transition"
            title="Chat with us"
          >
            <FaRobot size={24} />
          </div></Link>

        </div>

        <main className="flex-grow">
          {/* <Hero /> */}
          {/* <FeaturedArtisans /> */}
        </main>
        <Footer />
      </div>
      
    </div>
  );
}

export default UserHome;
