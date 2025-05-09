import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navigation/Navbar";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../BaseApi/baseurl";

function IndividualArtistWorks({ url }) {
  const { id } = useParams();
  const [artworks, setArtworks] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [artistimage, setArtistImage] = useState("");

  const userid=localStorage.getItem("buyerid")
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axiosInstance.post(`/viewArtWorksByArtistId/${id}`);
        setArtworks(res.data.data);
        setArtistName(res.data.data[0]?.artistId?.firstname || "Artist");
        setArtistImage(res.data.data[0]?.artistId?.image.filename || "Artist");

      } catch (err) {
        console.error("Failed to fetch artist works", err);
      }
    };
    fetchArtworks();
  }, [id]);

  const cartfn = (artid, artistId) => {
    if (!userid) {
      alert("Please login to add items to cart.");
      return;
    }

    axiosInstance
      .post(`/addCart`, {
        userid,
        artid,
        artistId,
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("Artwork added to cart.");
        } else {
          alert(res.data.message || "Could not add to cart.");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Something went wrong. Try again later.");
      });
  };

  return (
    <>
      <Navbar url={url} />

      <section style={{
          backgroundColor: "#5046f4",
          padding: "15px 0",
          textAlign: "center",
        }} className="bg-cover bg-center h-20 flex items-center justify-center bg-gray-200">
        <h1  className=" font-bold text-light">Works</h1>
      </section>

      <div className= "px-5">
        <div className="flex flex-col items-center mb-2">
          {/* <div className="w-28 h-28 border-4 border-gray-300 mb-4">
            <img src={`${url}/${artistimage}`} alt="artist" />
          </div> */}
          <h1 className="">{artistName}</h1>
        </div>

        <h4 className="text-center text-xl font-medium text-gray-600 mb-6">
          EXPLORE THE ART
        </h4>

        <div className="container mx-auto">
          <div className="row">
            {artworks.length > 0 ? (
              artworks.map((art, index) => (
                <div className="col-md-6 col-lg-4 mb-5" key={index}>
                  <div className="card shadow-lg border-0">
                    <Link to={`/viewsinglework_art/${art._id}`}>
                      <img
                        src={`${url}/${art.file.filename}`}
                        className="card-img-top object-cover h-64"
                        alt={art.title}
                      />
                    </Link>
                    <div className="card-body p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-lg font-bold">{art.title}</h5>
                        <h5 className="text-green-700 font-semibold">₹ {art.price}</h5>
                      </div>
                      <div className="flex justify-between items-center">
                        <button  onClick={() => cartfn(art._id, art.artistId?._id)} className="btn btn-outline-primary btn-sm">
                          ADD TO CART
                        </button>
                        {/* <Link to="/buyer_chat/:artisanId/:productId" className="flex items-center space-x-2"> */}
                          <img
                            src={`${url}/${art.artistId.image.filename}`}
                            alt="artist"
                            className="w-8 h-8 rounded-full border"
                          />
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 w-full mt-5">
                <p>No artworks available for this artist.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default IndividualArtistWorks;
