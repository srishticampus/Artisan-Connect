import React, { useEffect, useState } from 'react';
import Table from "react-bootstrap/Table";
import axiosInstance from '../../BaseApi/baseurl';
import DeliveryNavbar from '../navigation/DeliveryNavbar';

function DeliveryRoutes() {
  const agentid = localStorage.getItem("deliveryagentid");

  const [delivery, setDelivery] = useState([]);
  const [del, setDel] = useState({
    deliveryId: agentid,
    expectedDeliveryDate: ""
  });

  useEffect(() => {
    axiosInstance.post(`viewPendingOrdersForDelivery`)
      .then((res) => {
        setDelivery(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changefn = (e) => {
    setDel({
      ...del,
      [e.target.name]: e.target.value
    });
  };

  const takedel = (deliveryId, agentid) => {
    if (!del.expectedDeliveryDate) {
      alert("Please select a delivery date");
      return;
    }

    axiosInstance.post(`acceptorderByDeliverAgent/${deliveryId}`, del)
      .then((res) => {
        if (res.data.status === 200) {
          alert("Delivery taken successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <DeliveryNavbar />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Order Requests</h1>

          <div className="overflow-x-auto">
            <Table striped bordered hover className="text-center align-middle">
              <thead className="bg-blue-200 text-blue-900 text-lg font-semibold">
                <tr>
                  <th>SL</th>
                  <th>Order</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Expected Delivery Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {delivery && delivery.length > 0 ? (
                  delivery.map((a, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="font-medium text-gray-700">{a?.artid?.name}</td>
                      <td>{a?.artistId?.housename}, {a?.artistId?.city}, {a?.artistId?.district}</td>
                      <td>{a?.userid?.housename}, {a?.userid?.city}, {a?.userid?.district}</td>
                      <td>
                        <input
                          type='date'
                          name='expectedDeliveryDate'
                          min={new Date().toISOString().split('T')[0]}
                          value={del.expectedDeliveryDate}
                          onChange={changefn}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          type="submit"
                          onClick={() => takedel(a._id, agentid)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                        >
                          Accept Delivery
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-4">
                      No Works Available
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

export default DeliveryRoutes;
