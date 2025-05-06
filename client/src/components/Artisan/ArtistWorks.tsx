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
    price: "",
    image: "",
    artistId: artistid,
  });
  const [array, setArray] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setAddwork({ ...addwork, [e.target.name]: file });
    } else {
      setAddwork({ ...addwork, [e.target.name]: e.target.value });
    }
  };

  const submitfn = (e) => {
    e.preventDefault();
    if (addwork.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    axiosInstance
      .post(`addartworks`, addwork, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Work added successfully");
          window.location.reload(false);
        } else {
          toast.error(res.data.status);
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

  return (
    <>
      <ArtisanNavbar />
      <div className="p-6 bg-[#f6f6ff] min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
            <h1 className="text-2xl font-semibold text-[#5046f4] mb-4">Add New Artwork</h1>
            <form onSubmit={submitfn} className="space-y-4">
              <input
                type="text"
                placeholder="Art Name"
                name="name"
                value={addwork.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#5046f4] rounded-md focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                name="price"
                value={addwork.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#5046f4] rounded-md focus:outline-none"
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                required
                className="w-full"
              />
              <button
                type="submit"
                className="bg-[#5046f4] text-white px-6 py-2 rounded-md hover:bg-[#3d38c3] transition"
              >
                ADD
              </button>
            </form>
          </div>

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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {array?.length ? (
                    array.map((a, index) => (
                      <tr key={a._id}>
                        <td>{index + 1}</td>
                        <td id="workorders">
                          <img
                            src={`${url}/${a.file?.filename}`}
                            alt="work"
                            className="w-20 h-20 object-cover rounded-md mb-2"
                          />
                        </td>
                        <td>₹{a?.price}</td>
                        <td>{a?.name}</td>
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
