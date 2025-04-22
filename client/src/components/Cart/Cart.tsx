import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseApi/baseurl";

function Cart({ url }) {
  const navigate = useNavigate();

  const submitFn = (e) => {
    e.preventDefault();
    navigate("/checkout");
  };

  const userid = localStorage.getItem("buyerid");
  console.log(userid);

  const [art, setArt] = useState([]);
  const [cartitems, setCartItems] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`viewCartByUserid/${userid}`)
      .then((res) => {
        console.log(res);
        setArt(res.data.data);
        const mappedCartItems = res.data.data.map((item) => ({
          userid: userid,
          artid: item.artid._id,
          artistId: item.artid.artistId,
        }));
        setCartItems(mappedCartItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckout = () => {
    // Call your addOrderFromCart API with cartitems data
    axiosInstance
      .post("addOrderFromCart", { cartitems })
      .then((res) => {
        if (res.data.status === 200) {
          alert("Order placed successfully");
          // navigate("/checkout");
        } else {
          alert("Failed to place order");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error occurred while placing order");
      });
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#5046f4", // Updated color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    position: "relative",
    animation: "blink 1s infinite",
    transition: "background-color 0.3s ease",
  };

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const calculateTotalPrice = () => {
      let sum = 0;
      art?.forEach((a) => {
        sum += a?.artid?.price || 0;
      });
      setTotalPrice(sum);
    };

    calculateTotalPrice();
  }, [art]);

  const removecartfn = (itemid) => {
    axiosInstance.post(`deleteCartById/${itemid}`).then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        alert("Item removed successfully");
        window.location.reload();
      }
    }).catch = (err) => {
      console.log(err);
    };
  };

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
        <h1 style={{ fontSize: "30px", margin: "0" }}>Cart</h1>
      </section>
      {/ Cart Container /}
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "36px", color: "#5046f4" }}>CART</h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Dive into a vibrant ocean of creativity. Musefire, passionate artists
          meet art lovers seeking the extraordinary.
        </p>

        {/ Cart Table /}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <thead style={{ backgroundColor: "#e6e0f8" }}>
              <tr>
                <th style={{ padding: "16px", textAlign: "left", color: "#5046f4" }}>
                  ITEM
                </th>
                <th style={{ padding: "16px", textAlign: "left", color: "#5046f4" }}>
                  PRICE
                </th>
                <th style={{ padding: "16px" }}></th>
              </tr>
            </thead>
            <tbody>
              {art && art.length ? (
                art.map((a, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <img
                        src={`${url}/${a?.artid?.file?.filename}`}
                        alt="item-img"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          border: "2px solid #c4b3f2",
                        }}
                      />
                      <h3 style={{ margin: 0 }}>{a?.artid?.name}</h3>
                    </td>
                    <td style={{ padding: "16px", fontWeight: "600", fontSize: "18px" }}>
                      ₹{a?.artid?.price}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <button
                        type="button"
                        onClick={() => removecartfn(a._id)}
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#5046f4", // Updated color
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "20px", color: "#999" }}>
                    No Works Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/ Total & Checkout /}
        <div
          style={{
            textAlign: "right",
            marginTop: "30px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          GRAND TOTAL:{
" "}
          <span style={{ color: "#5046f4", fontSize: "22px" }}>₹{totalPrice}</span>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            type="button"
            onClick={handleCheckout}
            style={{
              backgroundColor: "#5046f4", // Updated color
              color: "white",
              padding: "12px 35px",
              fontSize: "18px",
              borderRadius: "8px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            }}
          >
            CHECKOUT
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;