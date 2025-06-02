import React, { useEffect, useState } from "react";
import ArtisanNavbar from "../navigation/ArtisanNavbar";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../BaseApi/baseurl";
import { FaStar } from "react-icons/fa";

function ArtistOrdrers({ url }) {
  const artistid = localStorage.getItem("artisanid");
  const [order, setOrder] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    axiosInstance
      .post(`viewOrderByArtist/${artistid}`)
      .then(async (res) => {
        const orders = res.data.data;
        setOrder(orders);

        // Fetch average rating for each artwork
        const ratingPromises = orders.map(async (order) => {
          const artId = order?.artid?._id;
          if (!artId) return { artId: null, avgRating: "N/A" };

          try {
            const res = await axiosInstance.get(`/average/${artId}`);
            return { artId, avgRating: res.data.average?.toFixed(1) ?? "N/A" };
          } catch (error) {
            return { artId, avgRating: "N/A" };
          }
        });

        const ratingsData = await Promise.all(ratingPromises);
        const ratingMap = {};
        ratingsData.forEach(({ artId, avgRating }) => {
          if (artId) ratingMap[artId] = avgRating;
        });
        setRatings(ratingMap);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ArtisanNavbar />

      <div className="p-6 bg-[#f4f4ff] min-h-screen">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-[#5046f4] mb-6">Orders</h1>

          <div className="overflow-x-auto">
            <Table striped bordered hover responsive>
              <thead className="bg-[#5046f4] text-white text-center">
                <tr>
                  <th>No</th>
                  <th>Work</th>
                  <th>User</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Delivery</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {order && order.length > 0 ? (
                  order.map((a, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="flex flex-col items-center gap-2 py-3">
                        <img
                          src={`${url}/${a?.artid?.file?.filename}`}
                          alt="Artwork"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <span>{a?.artid?.name}</span>
                      </td>
                      <td>{a?.userid?.firstname}</td>
                      <td>₹{a?.artid?.price}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${a?.deliveryStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : a?.deliveryStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                          }`}
                        >
                          {a?.deliveryStatus}
                        </span>
                      </td>
                      <td>
                        {a?.deliveryId ? (
                          <>
                            {a?.deliveryId.firstname}, {a?.deliveryId.contact}
                          </>
                        ) : (
                          <span className="text-gray-500">Not picked up</span>
                        )}
                      </td>
                      <td>
                        {ratings[a?.artid?._id] !== undefined ? (
                          <div className="flex items-center gap-1 justify-center">
                            {Array.from({ length: 5 }, (_, i) => (
                              <FaStar
                                key={i}
                                className={
                                  i < Math.round(ratings[a.artid._id])
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="text-sm text-gray-600">
                              ({ratings[a.artid._id]})
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-gray-500">
                      No Orders Available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistOrdrers;
