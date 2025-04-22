import React from "react";
import Footer from "../footer/Footer";
import product from "../../assets/aboutus-banner.jpg";
import artistimg from "../../assets/best1.jpg";
import Navbar from "../navigation/Navbar";
import { Link } from "react-router-dom";

function IndividualArtistWorks({ url }) {
  return (
    <>
      <Navbar url={url} />

      <section className="Cover-img">
        <h1>Works</h1>
      </section>

      <div className="IndividualArtistWorks">
        <div className="artistworks-profile">
          <div className="artistworks-image">
            <img src={artistimg} alt="artist image" />
          </div>
          <h1>Lumiere</h1>
        </div>

        <h4>EXPLORE THE ART</h4>

        <div className="explore-gallery">
          <div className="gallery-products">
            <div class="container text-center">
              <div class="row gallery-row">
                <div class="col-6 gallery-col">
                  <div class="card" style={{ width: "20rem" }}>
                    <Link to="/viewsinglework">
                      <img src={product} class="card-img-top" alt="..." />
                    </Link>

                    <div class="artdesc">
                      <div className="productdet">
                        <h1 class="card-text1">Lumiere</h1>
                        <h3 id="card-text2">
                          <button>ADD TO CART</button>
                        </h3>
                      </div>

                      <div className="product-pricetag">
                        <h1> ₹ 500 </h1>
                      </div>

                      <Link to="/user_chat">
                        <div className="gallery-artistprofile">
                          <img src={artistimg} />
                        </div>
                      </Link>

                      <div className="gallery-chat-icon">
                        <Link to="/user_chat">
                         chat
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 gallery-col">
                  <div class="card" style={{ width: "20rem" }}>
                    <Link to="/viewsinglework">
                      <img src={product} class="card-img-top" alt="..." />
                    </Link>

                    <div class="artdesc">
                      <div className="productdet">
                        <h1 class="card-text1">Lumiere</h1>
                        <h3 id="card-text2">
                          <button>ADD TO CART</button>
                        </h3>
                      </div>

                      <div className="product-pricetag">
                        <h1> ₹ 500 </h1>
                      </div>

                      <Link to="/user_chat">
                        <div className="gallery-artistprofile">
                          <img src={artistimg} />
                        </div>
                      </Link>

                      <div className="gallery-chat-icon">
                        <Link to="/user_chat">
                          chat
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 gallery-col">
                  <div class="card" style={{ width: "20rem" }}>
                    <Link to="/viewsinglework">
                      <img src={product} class="card-img-top" alt="..." />
                    </Link>

                    <div class="artdesc">
                      <div className="productdet">
                        <h1 class="card-text1">Lumiere</h1>
                        <h3 id="card-text2">
                          <button>ADD TO CART</button>
                        </h3>
                      </div>

                      <div className="product-pricetag">
                        <h1> ₹ 500 </h1>
                      </div>

                      <Link to="/user_chat">
                        <div className="gallery-artistprofile">
                          <img src={artistimg} />
                        </div>
                      </Link>

                      <div className="gallery-chat-icon">
                        <Link to="/user_chat">
chat
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 gallery-col">
                  <div class="card" style={{ width: "20rem" }}>
                    <Link to="/viewsinglework">
                      <img src={product} class="card-img-top" alt="..." />
                    </Link>

                    <div class="artdesc">
                      <div className="productdet">
                        <h1 class="card-text1">Lumiere</h1>
                        <h3 id="card-text2">
                          <button>ADD TO CART</button>
                        </h3>
                      </div>

                      <div className="product-pricetag">
                        <h1> ₹ 500 </h1>
                      </div>

                      <Link to="/user_chat">
                        <div className="gallery-artistprofile">
                          <img src={artistimg} />
                        </div>
                      </Link>

                      <div className="gallery-chat-icon">
                        <Link to="/user_chat">
                          chat
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default IndividualArtistWorks;
