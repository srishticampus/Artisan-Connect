import React, { useEffect, useState } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../footer/Footer.js';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../BaseApi/Baseurl.js';

function ViewSingleWork({ url }) {
  const { id } = useParams();
  const [art, setArt] = useState({});
  const userid = localStorage.getItem('buyerid');

  useEffect(() => {
    axiosInstance.post(`/viewArtworkById/${id}`)
      .then((res) => {
        console.log(res);
        setArt(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cartfn = (artid, artistId) => {
    axiosInstance.post(`addCart`, {
      userid: userid,
      artid: artid,
      artistId: artistId
    })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          alert("Cart added successfully");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <>
      <Navbar url={url} />

      {/* Cover Section */}
      <div className='bg-gradient-to-r from-indigo-500 to-purple-500 py-10 text-white text-center'>
        <h1 className='text-4xl font-bold'>Artwork Details</h1>
      </div>

      {/* Artwork Details Section */}
      <div className='container mx-auto px-4 my-10'>
        <div className='row d-flex justify-content-center align-items-start gap-5'>

          {/* Image */}
          <div className='col-md-6 mb-4'>
            <img
              src={`${url}/${art?.file?.filename}`}
              alt='Artwork'
              className='w-full h-auto rounded-xl shadow-lg object-cover'
            />
          </div>

          {/* Details */}
          <div className='col-md-5 bg-white p-6 rounded-xl shadow-md'>
            <h1 className='text-3xl font-semibold mb-4'>{art?.name}</h1>
            <h2 className='text-2xl text-gray-700 mb-6'>₹{art?.price}</h2>

            {/* Add to Cart */}
            <div className='mb-4'>
              <button
                onClick={() => cartfn(art._id, art?.artistId?._id)}
                className='w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition duration-300'
              >
                ADD TO CART
              </button>
            </div>

            {/* Buy Now */}
            <div>
              <Link to={`/payment/${art._id}`}>
                <button className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition duration-300'>
                  BUY NOW
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default ViewSingleWork;
