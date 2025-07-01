import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../BaseApi/baseurl";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ArtisanNavbar from "../navigation/ArtisanNavbar";

function ArtistWorks({ url }) {
  const artistid = localStorage.getItem("artisanid");

  const [addwork, setAddwork] = useState({
    name: "",
    customName: "",
    category: "",
    customCategory: "",
    price: "",
    image: "",
    artistId: artistid,
  });

  const [array, setArray] = useState([]);

  const titleCategoryMap = {
    tailored_dress: ["cotton_fabric", "hand_stitching"],
    handpainted_canvas: ["canvas", "natural_paint"],
    wall_art_painting: ["paper", "natural_dye"],
    clay_tea_cups: ["terracotta", "clay"],
    ceramic_home_decor: ["glazed_clay", "ceramic_paint"],
    custom_jewelry_set: ["metal_alloy", "glass_beads", "resin"],
    fabric_dolls: ["cotton_fabric", "wool", "thread"],
    hand_knit_sweater: ["wool", "hand_knitting"],
    embroidery_hoop_art: ["cotton_fabric", "embroidery_thread"],
    handwoven_carpet: ["wool", "loom"],
    handmade_storybook: ["recycled_paper", "thread_binding"],
    illustrated_notebook: ["recycled_paper", "hand_illustration"],
    handcarved_wood_art: ["neem_wood", "natural_polish"],
    bamboo_pen_holder: ["bamboo", "varnish"],
    coconut_shell_lamp: ["coconut_shell", "led"],
    bottle_art_vase: ["glass_bottle", "acrylic_paint"],
    gift_box: ["kraft_paper", "jute_twine"],
    coconut_shell_bowl: ["coconut_shell"],
    handmade_candle: ["soy_wax", "beeswax"],
    organic_cosmetic: ["herbal_oil"],
    jute_slipper: ["jute", "jute_cotton"],
    handmade_jewelry: ["wood_seeds", "recycled_materials"],
    handmade_basket: ["jute", "bamboo", "cane"],
    other: [],
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const val = name === "image" ? files[0] : value;
    setAddwork({ ...addwork, [name]: val });
  };

  const submitfn = (e) => {
    e.preventDefault();

    const finalName = addwork.name === "other" ? addwork.customName : addwork.name;
    const finalCategory = addwork.category === "other" ? addwork.customCategory : addwork.category;

    if (!finalName || !finalCategory || !addwork.price || !addwork.image) {
      toast.error("All fields are required.");
      return;
    }

    if (Number(addwork.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    const formData = new FormData();
    formData.append("name", finalName);
    formData.append("category", finalCategory);
    formData.append("price", addwork.price);
    formData.append("image", addwork.image);
    formData.append("artistId", addwork.artistId);

    axiosInstance
      .post(`/addartworks`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Work added successfully");
          window.location.reload(false);
        } else {
          toast.error("Failed to add");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosInstance
      .post(`viewArtWorksByArtistId/${artistid}`)
      .then((res) => {
        setArray(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const availableCategories =
    addwork.name && titleCategoryMap[addwork.name]?.length
      ? titleCategoryMap[addwork.name]
      : [
          "cotton_fabric", "wood", "wool", "canvas", "jute", "bamboo", "paper",
          "resin", "herbal_oil", "glass_beads", "hand_stitching",
          "thread_binding", "natural_paint", "metal_alloy"
        ];

  return (
    <>
      <ArtisanNavbar />
      <div className="p-6 bg-[#f6f6ff] min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
            <h1 className="text-2xl font-semibold text-[#5046f4] mb-4">Add New Artwork</h1>
            <form onSubmit={submitfn} className="space-y-4">

              {/* Name Dropdown */}
              <select
                name="name"
                value={addwork.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#5046f4] rounded-md focus:outline-none"
              >
                <option value="">-- Select Work Name --</option>
                {Object.keys(titleCategoryMap).map((key) => (
                  <option key={key} value={key}>
                    {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
              {addwork.name === "other" && (
                <input
                  type="text"
                  name="customName"
                  value={addwork.customName}
                  onChange={handleChange}
                  placeholder="Enter custom name"
                  className="w-full px-4 py-2 border border-[#5046f4] rounded-md"
                />
              )}

              {/* Category Dropdown */}
              <select
                name="category"
                value={addwork.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#5046f4] rounded-md"
              >
                <option value="">-- Select Category --</option>
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              {addwork.category === "other" && (
                <input
                  type="text"
                  name="customCategory"
                  value={addwork.customCategory}
                  onChange={handleChange}
                  placeholder="Enter custom category"
                  className="w-full px-4 py-2 border border-[#5046f4] rounded-md"
                />
              )}

              {/* Price */}
              <input
                type="number"
                placeholder="Price"
                name="price"
                value={addwork.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#5046f4] rounded-md"
              />

              {/* Image Upload */}
              <input
                type="file"
                name="image"
                onChange={handleChange}
                required
                className="w-full"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#5046f4] text-white px-6 py-2 rounded-md hover:bg-[#3d38c3] transition"
              >
                ADD
              </button>
            </form>
          </div>

          {/* Table View */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-semibold text-[#5046f4] mb-4">Works List</h1>
            <div className="overflow-x-auto">
              <Table striped bordered hover>
                <thead className="text-center bg-[#5046f4] text-white">
                  <tr>
                    <th>SL</th>
                    <th>Work</th>
                    <th>Price</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {array?.length ? (
                    array.map((a, index) => (
                      <tr key={a._id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`${url}/${a.file?.filename}`}
                            alt="work"
                            className="w-20 h-20 object-cover rounded-md mb-2"
                          />
                        </td>
                        <td>₹{a?.price}</td>
                        <td>{a?.name}</td>
                         <td>{a?.status}</td>
                        <td>
                          <Link
                            to={`/artist_editprofile/${a._id}`}
                            className="text-[#5046f4] hover:underline"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistWorks;
