import React from "react";
import Footer from "../footer/Footer";
import DeliveryNavbar from "../navigation/DeliveryNavbar";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

import deliveryimage from "../../assets/deliveryimage.jpg";
import deliveryImg from "../../assets/delivery-banner.jpg";
import confirmPic from "../../assets/confirm-delivery.jpg";
import { Link } from "react-router-dom";

// Declare types
interface Delivery {
  name: string;
  status: string;
}

const DeliveryAgentHome: React.FC = () => {
  const deliveries: Delivery[] = [
    { name: "John Doe", status: "In-Transit" },
    { name: "Priya Sharma", status: "Pending" },
  ];

  return (
    <div className="min-h-screen d-flex flex-column">
      <DeliveryNavbar />

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Deliver With</span>
                  <span className="block text-indigo-600">Speed & Trust</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Join our network of delivery professionals and make a difference in people’s lives by ensuring quick, safe, and timely deliveries.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link  to="/delivery_agent_jobs" className="btn btn-dark px-4 py-2">
                      View Deliveries
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/deliveryagent/profile" className="btn btn-outline-dark px-4 py-2">
                      Profile Settings
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            src={deliveryimage}
            alt="Delivery person"
            style={{ height: "550px", width: "100%" }}
          />
        </div>
      </div>

      {/* Assigned Deliveries Section */}
      {/* <section className="dashboard-section">
        <Container>
          <h2 className="section-title">Assigned Deliveries</h2>
          <Row className="gy-4">
            {deliveries.map((d, i) => (
              <Col md={6} key={i}>
                <Card className="delivery-card text-center">
                  <Card.Body>
                    <Card.Title className="card-title text-indigo-600">{d.name}</Card.Title>
                    <Card.Text>Status: {d.status}</Card.Text>
                    <Card.Text><strong>Address:</strong> 123 MG Road, Trivandrum</Card.Text>
                    <Card.Text><strong>ETA:</strong> 1:30 PM</Card.Text>
                    <Card.Text><strong>Contact:</strong> +91 98765 43210</Card.Text>
                    <Button variant="outline-dark" size="sm" className="me-2">
                      View Route
                    </Button>
                    <Button variant="outline-success" size="sm">
                      {d.status === "Pending"
                        ? "Start Delivery"
                        : d.status === "In-Transit"
                        ? "Mark Delivered"
                        : "Delivered"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}

      {/* Welcome Message Section */}
      <section className="py-5 bg-light mt-5 text-center">
        <Container>
          <h2 className="fw-bold text-indigo-600 mb-4">Welcome, Delivery Hero!</h2>
          <p className="fs-5 text-muted">
            Every delivery you make connects a dream to reality. Your dedication brings handcrafted art to doorsteps across the region. We appreciate your hard work, punctuality, and customer care. You’re not just delivering items — you’re delivering happiness.
          </p>
        </Container>
      </section>

      {/* Empowering Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="align-items-center">
            <Col md={5} className="mb-4 mb-md-0">
              <Image
                src={deliveryImg}
                alt="Delivery Executive"
                fluid
                rounded
              />
            </Col>
            <Col md={7}>
              <h3 className="fw-bold font-italic text-indigo-600 mb-3">Empowering You to Excel</h3>
              <ul className="fs-5 text-muted ps-3">
                <li className="mb-2">Real-time order tracking to simplify your route.</li>
                <li className="mb-2">Performance rewards and incentives based on delivery milestones.</li>
                <li className="mb-2">24/7 support team to assist you on the go.</li>
                <li className="mb-2">Flexible schedules tailored to your availability.</li>
                <li>Trusted by a growing community of happy customers and artisans.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Confirm Delivery Section */}
      <section className="dashboard-section mb-5">
        <Container>
          <h2 className="section-title">Confirm Delivery</h2>
          <Row className="gy-4 justify-content-center">
            <Col md={6}>
              <Card className="dashboard-card text-center">
                <Card.Img variant="top" src={confirmPic} className="dashboard-img img-fluid" />
                <Card.Body>
                  <Card.Text>
                    Upload photo proof or digital signature to confirm successful deliveries.
                  </Card.Text>
                  <Button variant="outline-dark">Confirm Delivery</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default DeliveryAgentHome;
