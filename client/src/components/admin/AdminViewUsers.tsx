import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseApi/Baseurl";

function AdminViewUsers() {
  const [viewuser, setViewuser] = useState([]);
  const adminid = localStorage.getItem("adminid");
  const navigate = useNavigate();

  if (adminid === null) {
    navigate("/admin/login");
  }

  useEffect(() => {
    axiosInstance
      .post("/viewUsers")
      .then((res) => {
        if (res.data.msg === "No Data obtained ") {
          setViewuser([]);
        } else if (res.data.status === 200) {
          setViewuser(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/5 border-r bg-white shadow-md">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Registered Users
        </h1>

        {viewuser.length === 0 ? (
          <p className="text-center text-lg text-gray-500 mt-10">
            No Users Found
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    SL
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Age
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Place
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Contact
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {viewuser.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.firstname}</td>
                    <td className="py-3 px-4">{calculateAge(user.dob)}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      {user.city}, {user.district}
                    </td>
                    <td className="py-3 px-4">{user.contact}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/Admin_viewuserindividual/${user._id}`}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        View More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminViewUsers;
