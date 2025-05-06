import React, { useEffect, useState } from 'react';
import axiosInstance from "../../BaseApi/baseurl";
import { useNavigate, useParams } from "react-router-dom";
import ArtisanNavbar from '../navigation/ArtisanNavbar';

function Editwork({ url }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState({
    name: "",
    price: "",
    file: null,
    artistId: id
  });

  useEffect(() => {
    axiosInstance.post(`viewArtworkById/${id}`)
      .then((res) => {
        setEdit(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      const file = e.target.files[0];
      setEdit({ ...edit, file });
    } else {
      setEdit({ ...edit, [e.target.name]: e.target.value });
    }
  };

  const updatefn = (e) => {
    e.preventDefault();
    if (edit.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    const formData = new FormData();
    formData.append("name", edit.name);
    formData.append("price", edit.price);
    formData.append("image", edit.file);

    axiosInstance.post(`/editArtWorkById/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        if (res.data.status === 200) {
          alert("Updated successfully");
          navigate("/artisan/works");
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletefn = () => {
    axiosInstance.post(`deleteArtWorkById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
            navigate("/artisan/works");
          alert("Deleted successfully");
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ArtisanNavbar />
      <div className="bg-gray-100 min-h-screen py-2 px-2">
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-md">
          <h1 className="text-3xl font-semibold text-center text-indigo-700 mb-2">Edit Artwork</h1>
          <form onSubmit={updatefn} className="space-y-2">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Art Name"
                value={edit.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={edit.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {edit.file?.filename && (
              <div className="flex justify-center">
                <img
                  src={`${url}/${edit.file.filename}`}
                  alt="Artwork"
                  className="w-60 h-60 object-cover rounded-md shadow-md"
                />
              </div>
            )}

            <div>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Save
              </button>

              <button
                type="button"
                onClick={deletefn}
                className="bg-red-600 text-white px-2 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Editwork;
