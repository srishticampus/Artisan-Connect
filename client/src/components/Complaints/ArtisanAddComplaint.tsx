import React, { useState } from 'react';
import axiosInstance from "../../BaseApi/baseurl"
import ArtisanNavbar from '../navigation/ArtisanNavbar';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
function ArtisanAddComplaint() {
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) {
      setMessage('Please enter your complaint.');
      return;
    }
    const artisanId = localStorage.getItem("artisanid")

    try {
      const response = await axiosInstance.post(
        `/artisan/addComplaint/${artisanId}`,
        { description }
      );
      if (response.status === 200) {
        setMessage('Complaint sent successfully!');
        setDescription('');
      } else {
        setMessage('Failed to send complaint.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error while sending complaint.');
    }
  };

  return (
    <div>
      <ArtisanNavbar />
      <div className="container mx-auto mt-6 p-6 border rounded shadow bg-white mb-5">
      <Link to="/artisan/viewComplaint" className='btn btn-primary'>View Complaints</Link>

        <h2 className="text-2xl font-bold mb-4 text-center">Artisan Complaint</h2>

        {message && (
          <div className="alert alert-info text-center mb-3">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="form-label font-semibold">Complaint Description</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter your complaint..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4 py-2">
              Submit Complaint
            </button>
          </div>
        </form>
      </div><Footer /> </div>
  );
}

export default ArtisanAddComplaint;
