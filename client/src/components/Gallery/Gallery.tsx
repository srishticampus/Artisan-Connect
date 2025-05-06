import { useEffect, useState } from "react";
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

  const userid = localStorage.getItem("buyerid");
  const productsPerPage = 6;

  useEffect(() => {
    fetchAllArtworks();
  }, []);

  const fetchAllArtworks = async () => {
    try {
      const res = await axiosInstance.post(`/viewArtworks`);
      setArtworks(res.data.data || []);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setErrorMessage("Failed to fetch artworks.");
    }
  };

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

  // Filtered artworks based on search term
  const filteredArtworks = artworks.filter((art) =>
    art.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        {/* Search Input */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              placeholder="Search Artwork Name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}
        </div>

        <div className="text-center p-4">
          Dive into a vibrant ocean of creativity. Museofire, where passionate
          artists meet art lovers seeking the extraordinary.
        </div>

        {/* Art Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArt.length > 0 ? (
            currentArt.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative">
                  <Link to={`/viewsinglework_art/${a._id}`}>
                    <img
                      src={`${url}/${a?.file?.filename}`}
                      alt={a.name}
                      className="w-full h-64 object-cover"
                    />
                  </Link>
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 truncate">
                    {a.name}
                  </h3>
                  <p className="text-indigo-600 font-bold mb-2">₹ {a.price}</p>
                  <div className="flex justify-between items-center">
                    <Link to="/user_chat">
                      <img
                        src={`${url}/${a?.artistId?.image?.filename}`}
                        alt="artist"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    </Link>
                    <button
                      onClick={() => cartfn(a._id, a.artistId?._id)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No artworks found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Gallery;
