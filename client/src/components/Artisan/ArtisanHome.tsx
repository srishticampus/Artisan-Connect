import React from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import artisanimg from "../../assets/download (4).jpg";
import ArtisanNavbar from "../navigation/ArtisanNavbar";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import artisanImage from "../../assets/aesthetic.jpg";
import "./ArtisanHomePage.css";
import { Link } from "react-router-dom";

const ArtisanHome: React.FC = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <ArtisanNavbar />
        <main className="flex-grow">
          <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block">Share Your</span>
                      <span className="block text-indigo-600">
                        Craft With the World
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      Turn your passion into purpose. Join our artisan community
                      and showcase your handmade creations to a global audience.
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <Link
                          to="/artisan/order"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          View My Shop
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link 
                          to="/artisan/works"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                        >
                          Add New Product
                        </Link>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                src={artisanimg}
                alt="Artisan working"
              />
            </div>
          </div>
        </main>

        {/* Section 1: Motivational Overview */}
        <section className="py-5 bg-light text-center">
          <Container>
            <h2 className="fw-bold text-indigo-600 mb-4">Welcome, Artisans!</h2>
            <p className="fs-5 text-muted">
              Your hands create beauty, your passion breathes life into every
              piece. We celebrate your dedication to preserving age-old
              traditions while embracing modern creativity. Here, you’re not
              just a seller—you’re a storyteller, an artist, and a changemaker.
              Keep crafting, keep inspiring, and let your art reach hearts far
              and wide.
            </p>
          </Container>
        </section>

        {/* Section 2: 5/7 Split with Image & Content */}
        <section className="py-5 bg-white">
          <Container>
            <Row className="align-items-center">
              <Col md={5} className="mb-4 mb-md-0">
                <Image src={artisanImage} alt="Artisan at Work" fluid rounded />
              </Col>
              <Col md={7}>
                <h3 className="fw-bold text-indigo-600 mb-3">
                  Craft with Love & Skill
                </h3>
                <p className="fs-5 text-muted">
                  "Don’t just dream it—craft it into reality. Your art holds the
                  power to inspire, and we’re here to help you share it with the
                  world. From your hands to global homes, your journey begins
                  here."
                </p>
                <br />
                <br />
                <p className="fs-5 text-indigo-900">
                There are stories waiting to be told. Don’t just dream it—bring it
                to life with your hands and heart. Your art has the power to
                inspire, and we’re here to help you share that inspiration with
                the world. From your workshop to homes across the globe, this is
                where your journey begins. Each piece you make carries your
                passion, culture, and creativity. We believe in empowering
                artisans to thrive by turning their talents into opportunities.
                With our platform, you're not just selling—you’re building a
                legacy. Together, let’s celebrate craftsmanship and make your
                dreams a global reality.</p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="py-5 bg-white">
          <Container className="steps px-4 py-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold text-indigo-600">
                Your Journey, Step by Step
              </h2>
              <p className="fs-5 text-muted">
                From showcasing your craft to receiving your earnings – it's
                simple and seamless.
              </p>
            </div>
            <Row className="gy-4 text-center">
              <Col md={3}>
                <div>
                  <div className="mb-2 fs-3 fw-bold text-indigo-600">1</div>
                  <h5 className="fw-bold text-dark">Add Your Product</h5>
                  <p className="text-muted">
                    Upload clear photos, enter a description, and set your
                    price—it’s quick and easy.
                  </p>
                </div>
              </Col>
              <Col md={3}>
                <div>
                  <div className="mb-2 fs-3 fw-bold text-indigo-600">2</div>
                  <h5 className="fw-bold text-dark">Get Notified on Orders</h5>
                  <p className="text-muted">
                    We notify you when someone places an order. You pack the
                    item with care.
                  </p>
                </div>
              </Col>
              <Col md={3}>
                <div>
                  <div className="mb-2 fs-3 fw-bold text-indigo-600">3</div>
                  <h5 className="fw-bold text-dark">Delivery is Handled</h5>
                  <p className="text-muted">
                    Our delivery partners pick it up and ensure it reaches the
                    customer safely.
                  </p>
                </div>
              </Col>
              <Col md={3}>
                <div>
                  <div className="mb-2 fs-3 fw-bold text-indigo-600">4</div>
                  <h5 className="fw-bold text-dark">Receive Your Payment</h5>
                  <p className="text-muted">
                    Once the product is delivered, your earnings are sent
                    directly to your account.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Section 3: Insights & Quick Actions */}
        <section className="insights-section">
          <Container>
            <h2 className="section-title">Quick Insights</h2>
            <Row className="text-center gy-4">
              <Col md={4}>
                <div className="insight-box">
                  <h3>₹15,000</h3>
                  <p>Total Sales</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="insight-box">
                  <h3>28</h3>
                  <p>Products Listed</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="insight-box">
                  <h3>5 ★</h3>
                  <p>Average Rating</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default ArtisanHome;
