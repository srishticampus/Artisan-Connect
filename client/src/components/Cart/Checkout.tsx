import React,{useEffect,useState} from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import axiosInstance  from "../../BaseApi/baseurl";
function Checkout() {
  const navigate = useNavigate();

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
      axiosInstance
        .post("addOrderFromCart", { cartitems })
        .then((res) => {
          if (res.data.status === 200) {
            alert("Order placed successfully");
    
            // After successful order, delete cart items of that user
            axiosInstance
              .post(`deleteCartByUserId/${userid}`)
              .then((deleteRes) => {
                if (deleteRes.data.status === 200) {
                  alert("Cart cleared successfully");
                  navigate("/order_confirmed"); // navigate to confirmation page
                } else {
                  alert("Order placed, but failed to clear cart");
                }
              })
              .catch((err) => {
                console.log(err);
                alert("Order placed, but error occurred while clearing cart");
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
  
  const clickFn = () => {

    // navigate("/order_confirmed");
  };

  return (
    <>
      <Navbar />

      {/* {/ Banner Section /} */}
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

      {/* {/ Checkout Section /} */}
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

        {/* {/ UPI Section /} */}
        {/* <div
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
        </div> */}

        {/* {/ Buttons Section /} */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* <div style={{ flex: "1", maxWidth: "150px" }}>
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
          </div> */}
          <div style={{ flex: "1", maxWidth: "150px" }}>
            <button
              onClick={handleCheckout}
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

      <Footer />
    </>
  );
}

export default Checkout;

