import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../BaseApi/Baseurl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminViewDeliveryAgentIndividual({ url }) {
  const { id } = useParams();
  const [delivery, setDelivery] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.post(`viewdeliveryById/${id}`)
      .then((res) => {
        setDelivery(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deletefn = () => {
    axiosInstance.post(`deletedeliveryById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Deleted Successfully");
          navigate(-1);
        }
      })
      .catch((err) => {
        toast.error("Can't Delete");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-2 bg-light p-0">
          <AdminSidebar />
        </div>

        {/* Main content */}
        <div className="col-md-8 ms-5 py-5 bg-white">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Delivery Agent Profile</h2>

            <div className="text-center mb-4">
              <img
                src={`${url}/${delivery.licence?.filename}`}
                alt="Licence"
                className="img-fluid rounded shadow"
                style={{ width: '350px', height: '190px', objectFit: 'cover' }}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <p><strong>Name:</strong> {delivery?.firstname} {delivery?.lastname}</p>
                <p><strong>Aadhar:</strong> {delivery?.aadhar}</p>
                <p><strong>Email:</strong> {delivery?.email}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Age:</strong> {delivery?.age}</p>
                <p><strong>Contact:</strong> {delivery?.contact}</p>
              </div>
            </div>

            <div className="mb-4">
              <p>
                <strong>Address:</strong><br />
                {delivery?.housename}, {delivery?.city}, {delivery?.district}, {delivery?.pincode}
              </p>
            </div>

            <div className="text-center">
              <button
                className="btn btn-danger px-4"
                onClick={deletefn}
              >
                Remove Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewDeliveryAgentIndividual;
