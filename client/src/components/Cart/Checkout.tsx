import React from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const clickFn = () => {
    navigate("/order_confirmed");
  };

  return (
    <>
      <Navbar />

      {/ Banner Section /}
      <section
        style={{
          backgroundColor: "#5046f4",
          color: "#fff",
          padding: "50px 0",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "42px", margin: "0" }}>CHECK OUT</h1>
      </section>

      {/ Checkout Section /}
      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "36px", color: "#5046f4" }}>
          Checkout
        </h1>
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          You can checkout and pay for your order
        </p>

        {/ UPI Section /}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Enter UPI ID"
            style={{
              padding: "12px",
              width: "80%",
              maxWidth: "400px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

        {/ Buttons Section /}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div style={{ flex: "1", maxWidth: "150px" }}>
            <button
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#5046f4",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              PAY WITH UPI
            </button>
          </div>
          <div style={{ flex: "1", maxWidth: "150px" }}>
            <button
              onClick={clickFn}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>

      {/ Featured Artists Section /}
      <section
        style={{
          backgroundColor: "#f5f5f5",
          padding: "50px 0",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "36px", color: "#5046f4", marginBottom: "20px" }}>
          Featured Artists
        </h1>
        <h2
          style={{
            fontSize: "18px",
            color: "#777",
            marginBottom: "30px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          We provide the tools and support to help your artistic compass guide
          you.
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              style={{
                width: "200px",
                height: "250px",
                backgroundColor: "#ddd",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h1 style={{ color: "#5046f4", margin: "0" }}>Lumiere</h1>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Checkout;

