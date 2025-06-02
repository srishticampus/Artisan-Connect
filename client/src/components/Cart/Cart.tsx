import React, { useEffect, useState } from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseApi/baseurl";

function Cart({ url }) {
  const navigate = useNavigate();
  const userid = localStorage.getItem("buyerid");
  const [art, setArt] = useState([]);
  const [cartitems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    number: '',
    cdnumber: '',
    numberError: '',
    cdnumberError: ''
  });

  useEffect(() => {
    axiosInstance
      .post(`viewCartByUserid/${userid}`)
      .then((res) => {
        setArt(res.data.data);
        const mapped = res.data.data.map((item) => ({
          userid: userid,
          artid: item.artid._id,
          artistId: item.artid.artistId,
        }));
        setCartItems(mapped);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const total = art?.reduce((sum, a) => sum + (a?.artid?.price || 0), 0);
    setTotalPrice(total);
  }, [art]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      numberError: '',
      cdnumberError: ''
    });
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const confirmPayment = () => {
    if (formData.number.length !== 16) {
      setFormData({ ...formData, numberError: 'Card number must be 16 digits.' });
      return;
    }
    if (formData.cdnumber.length < 3 || formData.cdnumber.length > 3) {
      setFormData({ ...formData, cdnumberError: 'CVV must 3 digits.' });
      return;
    }

    axiosInstance
      .post("addOrderFromCart", { cartitems })
      .then((res) => {
        if (res.data.status === 200) {
          // Delete cart items after successful order
          axiosInstance
            .post(`deleteCartByUserId/${userid}`)
            .then((deleteRes) => {
              if (deleteRes.data.status === 200) {
                alert("Order placed and cart cleared successfully");
                setShowModal(false);
                navigate("/gallery");
              } else {
                alert("Order placed but failed to clear cart");
              }
            })
            .catch((deleteErr) => {
              console.log(deleteErr);
              alert("Order placed but error occurred while clearing cart");
            });
        } else {
          alert("Failed to place order");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error occurred while placing order");
      });
  };

  const removecartfn = (itemid) => {
    axiosInstance.post(`deleteCartById/${itemid}`).then((res) => {
      if (res.data.status === 200) {
        alert("Item removed successfully");
        window.location.reload();
      }
    }).catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar url={url} />
      <section style={{ backgroundColor: "#5046f4", color: "#fff", padding: "15px 0", textAlign: "center" }}>
        <h1 style={{ fontSize: "30px", margin: "0" }}>Cart</h1>
      </section>

      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.05)" }}>
        <h1 style={{ textAlign: "center", fontSize: "36px", color: "#5046f4" }}>CART</h1>
        <p style={{ textAlign: "center", fontSize: "16px", color: "#666", marginBottom: "30px" }}>
          Dive into a vibrant ocean of creativity. Musefire, passionate artists meet art lovers seeking the extraordinary.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "10px" }}>
            <thead style={{ backgroundColor: "#e6e0f8" }}>
              <tr>
                <th style={{ padding: "16px", textAlign: "left", color: "#5046f4" }}>ITEM</th>
                <th style={{ padding: "16px", textAlign: "left", color: "#5046f4" }}>PRICE</th>
                <th style={{ padding: "16px" }}></th>
              </tr>
            </thead>
            <tbody>
              {art?.length > 0 ? (
                art.map((a, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "16px", display: "flex", alignItems: "center", gap: "15px" }}>
                      <img src={`${url}/${a?.artid?.file?.filename}`} alt="item" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px", border: "2px solid #c4b3f2" }} />
                      <h3 style={{ margin: 0 }}>{a?.artid?.name}</h3>
                    </td>
                    <td style={{ padding: "16px", fontWeight: "600", fontSize: "18px" }}>₹{a?.artid?.price}</td>
                    <td style={{ padding: "16px" }}>
                      <button onClick={() => removecartfn(a._id)} style={{ padding: "8px 15px", backgroundColor: "#5046f4", color: "white", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Remove</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" style={{ textAlign: "center", padding: "20px", color: "#999" }}>No Works Available</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: "right", marginTop: "30px", fontSize: "20px", fontWeight: "bold" }}>
          GRAND TOTAL: <span style={{ color: "#5046f4", fontSize: "22px" }}>₹{totalPrice}</span>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            type="button"
            onClick={handleCheckout}
            style={{
              backgroundColor: "#5046f4",
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

      {/* Payment Modal */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "#fff", padding: "30px", borderRadius: "8px",
            width: "400px", boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ marginBottom: "20px", color: "#5046f4" }}>Enter Payment Details</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="cardHolderName"
                    placeholder="Your Name"
                    name="name"
                    //   value={form.name}
                    //   onChange={changefn}
                    required title='please fill'
                  />

                  <label for="name">Card Holder Name</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="cardNo"
                    placeholder="Your Name"
                    name="number"
                    //   value={form.number}
                    onChange={(e) => {
                      handleInputChange(e);
                      // changefn(e)
                    }}

                    required
                  />
                  <p style={{ color: 'red' }}>
                    {formData.numberError}
                  </p>
                  <label for="cardNo">Card Number</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="cvv"
                    placeholder="Your Name"
                    required
                    name="cdnumber"
                    //   value={form.cdnumber}
                    onChange={(e) => {
                      handleInputChange(e);
                      // changefn(e)
                    }}

                  />
                  <p style={{ color: 'red' }}>
                    {formData.cdnumberError}
                  </p>
                  <label for="email">CVV</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-4">
                        <label for="email">Expiry</label>
                      </div>
                      <div className="col-4">
                        <label for="email">Month</label>
                        <select
                          className="form-control"
                          name="month"
                          id="month"

                          required
                        >
                          <option>Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                      <div className="col-4">
                        <label for="email">Year</label>
                        <select
                          className="form-control"
                          name="year"
                          id="year"
                          required
                        >
                          <option>Year</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                          <option value="2031">2031</option>
                          <option value="2032">2032</option>
                          <option value="2033">2033</option>
                          <option value="2034">2034</option>
                          <option value="2035">2035</option>
                          <option value="2036">2036</option>
                          <option value="2037">2037</option>
                          <option value="2038">2038</option>
                          <option value="2039">2039</option>
                          <option value="2040">2040</option>
                          <option value="2041">2041</option>
                          <option value="2042">2042</option>
                          <option value="2043">2043</option>
                          <option value="2044">2044</option>
                          <option value="2045">2045</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {formData?.cdnumberError && <div style={{ color: "red", marginBottom: "10px" }}>{formData?.cdnumberError}</div>}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button onClick={confirmPayment} style={{ padding: "10px 20px", backgroundColor: "#5046f4", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Pay Now</button>
              <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", backgroundColor: "#ccc", color: "#000", border: "none", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Cart;
