import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../BaseApi/Baseurl';
import "./Admincss.css";

function AdminViewRequestedAgent({ url }) {

  const admin = localStorage.getItem("adminid");
  const { id } = useParams();
  const [delivery, setDelivery] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.post(`viewdeliveryById/${id}`)
      .then((res) => {
        setDelivery(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const acceptfn = () => {
    axiosInstance.post(`acceptDelReqs/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          alert("Agent approved successfully!");
          navigate("/admin_viewagentrequests");
        }
      })
      .catch(() => alert("Can't accept"));
  };

  const deletefn = () => {
    axiosInstance.post(`deletedeliveryById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          alert("Agent removed successfully!");
          navigate(-1);
        }
      })
      .catch(() => alert("Can't delete"));
  };

  return (
    <div className="row m-0">
      <div className="col-md-3">
        <AdminSidebar />
      </div>

      <div className="col-md-9 p-4">
        <div className="card shadow-sm p-4 bg-white">
          <h4 className="mb-4 text-center text-primary fw-bold">Requested Agent Details</h4>

          <div className="text-center mb-4">
            {delivery?.licence?.filename ? (
              <img
                src={`${url}/${delivery.licence.filename}`}
                alt="License"
                className="img-fluid rounded"
                style={{ maxHeight: "300px" }}
              />
            ) : (
              <p className="text-muted">No licence uploaded</p>
            )}
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <p><strong>Name:</strong> {delivery?.firstname} {delivery?.lastname}</p>
              <p><strong>Aadhar:</strong> {delivery?.aadhar}</p>
              <p><strong>Email:</strong> {delivery?.email}@gmail.com</p>
            </div>

            <div className="col-md-6">
              <p><strong>Age:</strong> {delivery?.age}</p>
              <p><strong>Contact:</strong> {delivery?.contact}</p>
              <p><strong>Vehicle Reg. Number:</strong> {delivery?.vehicleRegNumber || "N/A"}</p>
            </div>

            <div className="col-12">
              <p><strong>Address:</strong> {delivery?.housename}, {delivery?.city}, {delivery?.district} - {delivery?.pincode}</p>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-success px-4" onClick={acceptfn}>Accept Agent</button>
              <button className="btn btn-danger px-4" onClick={deletefn}>Remove Agent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewRequestedAgent;
