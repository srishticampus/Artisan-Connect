import { useEffect, useState, useCallback } from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "../../BaseApi/Baseurl";

function Gallery({ url }) {
  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});

  const userid = localStorage.getItem("buyerid");
  const productsPerPage = 6;

  const fetchAllArtworks = useCallback(async () => {
    try {
      const res = await axiosInstance.post(`/viewArtworks`);
      const artworksData = res.data.data || [];
      setArtworks(artworksData);
      fetchAllAverageRatings(artworksData);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setErrorMessage("Failed to fetch artworks.");
    }
  }, []);

  const fetchAllAverageRatings = async (artworksList) => {
    const ratings = {};
    await Promise.all(
      artworksList.map(async (art) => {
        try {
          const res = await axiosInstance.get(`/average/${art._id}`);
          ratings[art._id] = res.data.average || 0;
        } catch (err) {
          console.error(`Failed to fetch average rating for ${art._id}`);
          ratings[art._id] = 0;
        }
      })
    );
    setAverageRatings(ratings);
  };

  const fetchFavorites = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/getFavorites/${userid}`);
      const favIds = res.data.data.map((fav) => fav.productId._id);
      setFavorites(favIds);
    } catch (err) {
      console.error("Error fetching favorites", err);
    }
  }, [userid]);

  useEffect(() => {
    fetchAllArtworks();
    if (userid) fetchFavorites();
  }, [fetchAllArtworks, fetchFavorites, userid]);

  const handleAddToCart = (artid, artistId) => {
    if (!userid) return alert("Please login to add items to cart.");

    axiosInstance
      .post(`/addCart`, { userid, artid, artistId })
      .then((res) => {
        alert(res.data.message || "Added to cart.");
      })
      .catch((err) => {
        console.error("Add to cart failed", err);
        alert("Error adding to cart.");
      });
  };

  const toggleFavorite = async (productId) => {
    if (!userid) return alert("Please login to manage favorites.");
    const isFav = favorites.includes(productId);

    try {
      if (isFav) {
        await axiosInstance.post("/removeFavorite", { userId: userid, productId });
        setFavorites((prev) => prev.filter((id) => id !== productId));
      } else {
        await axiosInstance.post("/addToFavorites", { userId: userid, productId });
        setFavorites((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Favorite toggle failed", err);
    }
  };

  const filteredArtworks = artworks.filter((art) =>
    art.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArtworks.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentArt = filteredArtworks.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-6 text-center">
        <h1 className="text-3xl font-bold">Gallery</h1>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Search Artwork Name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-96"
          />
        </div>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {currentArt.length > 0 ? (
            currentArt.map((a) => (
              <div key={a._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <Link to={`/viewsinglework_art/${a._id}`}>
                    <img
                      src={`${url}/${a?.file?.filename}`}
                      alt={a.name}
                      className="w-full h-64 object-cover"
                    />
                  </Link>
                  <button
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
                    onClick={() => toggleFavorite(a._id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${favorites.includes(a._id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-600"
                        }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold truncate">{a.name}</h3>
                  <p className="text-indigo-600 font-bold mt-1 mb-2">₹ {a.price}</p>

                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < Math.round(averageRatings[a._id] || 0) ? "text-yellow-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({(averageRatings[a._id] || 0).toFixed(1)})
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <Link to={`/buyer_chat/${a.artistId?._id}/${a._id}`}>
                      <img
                        src={`${url}/${a?.artistId?.image?.filename}`}
                        alt="artist"
                        className="w-10 h-10 rounded-full border object-cover"
                      />
                    </Link>
                    <button
                      onClick={() => handleAddToCart(a._id, a.artistId?._id)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No artworks found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded border hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "border hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded border hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Gallery;
