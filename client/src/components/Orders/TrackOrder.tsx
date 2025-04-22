import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import axiosInstance from "../../BaseApi/Baseurl";

function TrackOrder({ url }) {
  const userid = localStorage.getItem("userid");
  console.log(userid);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`vieworderByUserid/${userid}`)
      .then((res) => {
        console.log(res);
        setOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar url={url} />

      {/ Banner Section /}
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

      {/ Orders Dashboard /}
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
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "#5046f4",
                    fontWeight: "600",
                  }}
                >
                  Date (Order)
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "#5046f4",
                    fontWeight: "600",
                  }}
                >
                  Expected (Delivery)
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "#5046f4",
                    fontWeight: "600",
                  }}
                >
                  Delivery Agent Name and Contact
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "#5046f4",
                    fontWeight: "600",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    color: "#5046f4",
                    fontWeight: "600",
                  }}
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {order && order.length ? (
                order.map((a, index) => {
                  const dateTime = new Date(a?.date);
                  const dateOnly = dateTime.toISOString().split("T")[0];

                  return (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #ddd",
                        textAlign: "left",
                        backgroundColor: "#fafafa",
                      }}
                    >
                      <td style={{ padding: "16px" }}>{dateOnly}</td>
                      <td style={{ padding: "16px" }}>{a.expectedDeliveryDate}</td>
                      <td style={{ padding: "16px" }}>
                        {a.deliveryId
                          ? `${a.deliveryId.firstname}, ${a.deliveryId.contact}`
                          : "Order not picked up"}
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          fontWeight: "600",
                          color: a?.deliveryStatus === "Delivered" ? "green" : "#f44336",
                        }}
                      >
                        {a?.deliveryStatus}
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          fontWeight: "600",
                          color: "#5046f4",
                        }}
                      >
                        ₹{a?.artid?.price}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#999" }}>
                    No Orders Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/ Message Section /}
        {/ Uncomment if needed /}
        {/* <div className="dashboard-msgshipper">
          <h2>Message Shipper</h2>
          <div className="dashboard-form">
            <select>
              <option selected>Select One</option>
            </select>
          </div>
          <div className="dashboard-form">
            <textarea placeholder="Message" />
          </div>
          <div className="dashboard-button">
            <button>Submit</button>
          </div>
        </div> */}
      </div>

      <Footer />
    </>
  );
}

export default TrackOrder;
