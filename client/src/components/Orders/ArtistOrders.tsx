import React, { useEffect, useState } from "react";
import ArtisanNavbar from "../navigation/ArtisanNavbar";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../BaseApi/baseurl";

function ArtistOrdrers({ url }) {
  const artistid = localStorage.getItem("artisanid");
  console.log(artistid);

  const [order, setOrder] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`viewOrderByArtist/${artistid}`)
      .then((res) => {
        console.log(res);
        setOrder(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="artistorders">
        <ArtisanNavbar />

        <div className="col-10 orders">
          <div className="orders-table">
            <h1 className="mt-5 ms-3  ">Orders</h1>

            <Table
              striped
              bordered
              hover
              className="mt-5 ms-3"
              style={{ width: "100%" }}
            >
              <thead style={{ height: "50px" }}>
                <tr>
                  <th>No</th>
                  <th>Work</th>
                  <th>User</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Delivery</th>
                </tr>
              </thead>
              <tbody>
                {order && order.length ? (
                  order.map((a, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td id="workorders">
                          <img src={`${url}/${a?.artid?.file?.filename}`} />
                          <p>{a?.artid?.name} </p>
                        </td>
                        <td>{a?.userid?.firstname}</td>
                        <td>{a?.artid?.price}</td>
                        <td>{a?.deliveryStatus}</td>
                        <td>
                          {" "}
                          {a.deliveryId
                            ? `${a.deliveryId.firstname}, ${a.deliveryId.contact}`
                            : "Order not picked up"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>No Works Available</div>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistOrdrers;