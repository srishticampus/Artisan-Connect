import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../BaseApi/baseurl";
import DeliveryNavbar from "../navigation/DeliveryNavbar";

function DeliveryJobs() {
  const agentid = localStorage.getItem("deliveryagentid");
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`viewOrdersByDeliveryId/${agentid}`)
      .then((res) => {
        setDelivery(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updatefn = (orderid, status) => {
    axiosInstance
      .post(`updateStatusOfOrdersByOrderId/${orderid}`, {
        deliveryStatus: status,
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("Updated Successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dropped = (orderid, status) => {
    axiosInstance
      .post(`updateStatusOfOrdersByOrderId/${orderid}`, {
        deliveryStatus: status,
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert("Updated Successfully");
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
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Jobs</h1>

          <div className="overflow-auto">
            <Table
              striped
              bordered
              hover
              responsive
              className="text-center align-middle"
            >
              <thead className="bg-blue-200">
                <tr>
                  <th>SL</th>
                  <th>Order</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Pickup</th>
                  <th>Drop</th>
                  <th>Complete Status</th>
                </tr>
              </thead>
              <tbody>
                {delivery && delivery.length ? (
                  delivery.map((a, index) => (
                    <tr key={a._id}>
                      <td>{index + 1}</td>
                      <td>{a?.artid?.name}</td>
                      <td className="text-sm">
                        {a?.artistId?.housename}, {a?.artistId?.city},{" "}
                        {a?.artistId?.district}
                        <br />
                        <span className="text-gray-500">
                          Contact: {a?.artistId?.contact}
                        </span>
                      </td>
                      <td className="text-sm">
                        {a?.userid?.housename}, {a?.userid?.city},{" "}
                        {a?.userid?.district}
                        <br />
                        <span className="text-gray-500">
                          Contact: {a?.userid?.contact}
                        </span>
                      </td>
                      <td>
                        <span className="text-blue-600 font-medium">
                          Accepted
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-primary mt-2"
                          onClick={() => updatefn(a._id, "pickup")}
                        >
                          Picked Up
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-success mt-2"
                          onClick={() => dropped(a._id, "dropped")}
                        >
                          Dropped
                        </button>
                      </td>
                      <td>
                        {a?.deliveryStatus === "pickup" ? (
                          <span className="text-yellow-600 font-semibold">
                            Pending
                          </span>
                        ) : a?.deliveryStatus === "dropped" ? (
                          <span className="text-green-600 font-semibold">
                            Completed
                          </span>
                        ) : (
                          <span className="text-red-500">Unknown</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-gray-500">
                      No Jobs Available
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

export default DeliveryJobs;
