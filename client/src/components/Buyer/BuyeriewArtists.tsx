import React, { useEffect, useState } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import axiosInstance from '../../BaseApi/baseurl'; // Adjust path if needed

function ViewArtists({ url }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axiosInstance
      .post('/viewArtists')
      .then((res) => {
        console.log(res);
        
        if (res.data?.data) {
          setArtists(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching artists:', err);
      });
  }, []);

  return (
    <>
      <Navbar url={url} />

      <section className="bg-cover bg-center py-10 text-white text-center" style={{ backgroundImage: `url('/path/to/banner.jpg')` }}>
        <h1 className="text-4xl font-bold">Artists</h1>
      </section>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-4 text-center">Artists</h1>
        <p className="text-gray-600 text-center mb-10">We provide the tools and support to help your artistic compass guide you.</p>

        <div className="row">
          {artists && artists.length > 0 ? (
            artists.map((artist, index) => (
              <div className="col-6 col-md-4 col-lg-3 mb-4" key={artist._id}>
                <Link to={`/view_artistworks/${artist._id}`}>
                  <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 p-3 text-center">
                    <img
                      src={`http://localhost:4004/${artist.image.filename}`}
                      alt={`${artist.firstname}'s image`}
                      className="rounded-full w-24 h-24 mx-auto object-cover mb-3"
                    />
                    <h2 className="text-lg font-semibold">{artist.firstname} {artist.lastname}</h2>
                    <h6 className="text-lg font-semibold">{artist.district} </h6>

                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No artists available.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ViewArtists;
