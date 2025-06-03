import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import axiosInstance from "../../BaseApi/Baseurl";

function TrackOrder({ url }) {
  const [order, setOrder] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showModal, setShowModal] = useState(false);

  const userid = localStorage.getItem("buyerid");

  const submitReview = async () => {
    try {
      await axiosInstance.post(`/rate/${selectedProduct}`, {
        userId: userid,
        rating,
        review,
      });
      alert("Review submitted!");
      setShowModal(false);
      setRating(0);
      setReview("");
    } catch (err) {
      console.error(err);
      alert("Error submitting review.");
    }
  };
  
  useEffect(() => {
    axiosInstance
      .post(`/vieworderByUserid/${userid}`)
      .then((res) => {
        setOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userid]);

  return (
    <>
      <Navbar url={url} />

      <section
        style={{
          backgroundColor: "#5046f4",
          color: "#fff",
          padding: "15px 0",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "30px", margin: "0" }}>Track Order</h1>
      </section>

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "36px", color: "#5046f4" }}>
          Your Orders
        </h1>

        <div className="delivery-schedule">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            <thead style={{ backgroundColor: "#e6e0f8" }}>
              <tr>
                <th style={thStyle}>Date (Order)</th>
                <th style={thStyle}>Expected (Delivery)</th>
                <th style={thStyle}>Delivery Agent Name and Contact</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {order?.length > 0 ? (
                order.map((a, index) => {
                  const dateTime = new Date(a?.date);
                  const dateOnly = dateTime?.toISOString().split("T")[0];
                  return (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <td style={tdStyle}>{dateOnly}</td>
                      <td style={tdStyle}>{a?.expectedDeliveryDate}</td>
                      <td style={tdStyle}>
                        {a?.deliveryId
                          ? `${a?.deliveryId?.name}, ${a?.deliveryId?.contact}`
                          : "Order not picked up"}
                      </td>
                      <td
                        style={{
                          ...tdStyle,
                          fontWeight: "600",
                          color:
                            a?.deliveryStatus === "Delivered"
                              ? "green"
                              : "#f44336",
                        }}
                      >
                        {a?.deliveryStatus}
                      </td>
                      <td style={{ ...tdStyle, fontWeight: "600", color: "#5046f4" }}>
                        ₹{a?.artid?.price}
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => {
                            setSelectedProduct(a?.artid?._id);
                            setShowModal(true);
                          }}
                          className="bg-indigo-600 text-white px-3 py-1 rounded"
                        >
                          Add Review
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "20px", color: "#999" }}
                  >
                    No Orders Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Outside the Map */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Rate this product</h2>
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating
                      ? "text-yellow-500 text-2xl"
                      : "text-gray-400 text-2xl"
                  }
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              placeholder="Write a review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  color: "#5046f4",
  fontWeight: "600",
};

const tdStyle = {
  padding: "16px",
};

export default TrackOrder;
