import React from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../footer/Footer';

function OrderConfirm() {
  return (
    <>
      <Navbar />

      {/ Banner Section /}
      <section
        style={{
          backgroundColor: '#5046f4',
          color: '#fff',
          padding: '50px 0',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '42px', margin: '0' }}>Thank You For Your Order</h1>
      </section>

      {/ Order Confirmation Section /}
      <div
        style={{
          maxWidth: '900px',
          margin: '40px auto',
          padding: '30px',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            fontSize: '36px',
            color: '#5046f4',
            marginBottom: '20px',
          }}
        >
          We have received the order for Product Name
        </h1>
        <h3 style={{ fontSize: '22px', color: '#555', marginBottom: '15px' }}>
          The order is ready to be picked up at:
        </h3>

        <div style={{ marginBottom: '25px', fontSize: '18px', color: '#444' }}>
          <p>Address</p>
          <p>Place</p>
          <p>City</p>
          <p>Pin code</p>
          <p>Kerala</p>
          <p>India</p>
        </div>

        {/ Mark as Read Button /}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          <button
            style={{
              padding: '15px 30px',
              backgroundColor: '#5046f4',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3c3cf4';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#5046f4';
            }}
          >
            Mark as read
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderConfirm;