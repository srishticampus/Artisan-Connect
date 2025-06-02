import React, { useEffect, useState } from "react";
import axiosInstance from "../../BaseApi/baseurl";
import Navbar from "../navigation/Navbar";

const FavoriteList = ({url}) => {
    const [favorites, setFavorites] = useState([]);
    const userId = localStorage.getItem("buyerid");

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await axiosInstance.get(`/getFavorites/${userId}`);
            console.log(response, "response");
            setFavorites(response.data.data);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await axiosInstance.post("/removeFavorite", {
                userId,
                productId,
            });
            setFavorites((prev) => prev.filter((fav) => fav?.productId?._id !== productId));
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h3>Your Favorite Products</h3>
                {favorites?.length === 0 ? (
                    <p>No favorites added yet.</p>
                ) : (
                    <div className="row">
                        {favorites.map((fav) => {
                            const product = fav?.productId;
                            return (
                                <div key={fav?._id} className="col-md-4 mb-4">
                                    <div className="card">
                                        {product?.file?.filename && (
                                            <img
                                                src={`${url}/${product?.file?.filename}`}
                                                alt={product?.name}
                                                className="card-img-top"
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{product?.name || "Untitled"}</h5>
                                            <p className="card-text">Price: ₹{product?.price}</p>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleRemove(product._id)}
                                            >
                                                Remove from Favorites
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteList;
