import product from "../../../../Assets/Rectangle 12.png";
import artistimg from "../../../../Assets/aubrey-graham-photo-u164.jpg";
import NavMain from "../../../Navbar/NavMain";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";

function IndividualArtistWorks({ url }) {
  return (
    <>
      <NavMain url={url} />

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
            <div className="container text-center">
              <div className="row gallery-row">
                <div className="col-6 gallery-col">
                  <div className="card" style={{ width: "20rem" }}>
                    <Link to="/viewsinglework">
                      <img src={product} className="card-img-top" alt="..." />
                    </Link>

                    <div className="artdesc">
                      <div className="productdet">
                        <h1 className="card-text1">Lumiere</h1>
                        <h3 id="card-text2">
                          <button>ADD TO CART</button>
                        </h3>
                      </div>

                      <div className="product-pricetag">
                        <h1> ₹ 500 </h1>
                      </div>

                      <Link to="/buyer_chat/:artisanId/:productId">
                        <div className="gallery-artistprofile">
                          <img src={artistimg} />
                        </div>
                      </Link>

                      <div className="gallery-chat-icon">
                        <Link to="/buyer_chat/:artisanId/:productId">
                         chat
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 gallery-col">
                  <div className="card" style={{ width: "20rem" }}>
                    <Link to="/viewsinglework">
                      <img src={product} className="card-img-top" alt="..." />
                    </Link>

                    <div className="artdesc">
                      <div className="productdet">
                        <h1 className="card-text1">Lumiere</h1>
                        <h3 id="card-text2">
                          <button>ADD TO CART</button>
                        </h3>
                      </div>

                      <div className="product-pricetag">
                        <h1> ₹ 500 </h1>
                      </div>

                      <Link to="/buyer_chat/:artisanId/:productId">
                        <div className="gallery-artistprofile">
                          <img src={artistimg} />
                        </div>
                      </Link>

                      <div className="gallery-chat-icon">
                        <Link to="/buyer_chat/:artisanId/:productId">
                          chat
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 gallery-col">
                  <div className="card" style={{ width: "20rem" }}>
                    <Link to="/viewsinglework">
                      <img src={product} className="card-img-top" alt="..." />
                    </Link>

                    <div className="artdesc">
                      <div className="productdet">
                        <h1 className="card-text1">Lumiere</h1>
                        <h3 id="card-text2">
                          <button>ADD TO CART</button>
                        </h3>
                      </div>

                      <div className="product-pricetag">
                        <h1> ₹ 500 </h1>
                      </div>

                      <Link to="/buyer_chat/:artisanId/:productId">
                        <div className="gallery-artistprofile">
                          <img src={artistimg} />
                        </div>
                      </Link>

                      <div className="gallery-chat-icon">
                        <Link to="/buyer_chat/:artisanId/:productId">
                         
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 gallery-col">
                  <div className="card" style={{ width: "20rem" }}>
                    <Link to="/viewsinglework">
                      <img src={product} className="card-img-top" alt="..." />
                    </Link>

                    <div className="artdesc">
                      <div className="productdet">
                        <h1 className="card-text1">Lumiere</h1>
                        <h3 id="card-text2">
                          <button>ADD TO CART</button>
                        </h3>
                      </div>

                      <div className="product-pricetag">
                        <h1> ₹ 500 </h1>
                      </div>

                      <Link to="/buyer_chat/:artisanId/:productId">
                        <div className="gallery-artistprofile">
                          <img src={artistimg} />
                        </div>
                      </Link>

                      <div className="gallery-chat-icon">
                        <Link to="/buyer_chat/:artisanId/:productId">
                         
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
