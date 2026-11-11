import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function DashboardPage() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <div className="min-h-screen bg-gray-100 p-5">

      <nav className="bg-white shadow rounded-xl p-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-blue-600">
          My Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </nav>

      <div className="max-w-lg mx-auto mt-12">

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <img
            src={user.avatar}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
          />

          <h2 className="text-2xl font-bold">
            {user.fullName}
          </h2>

          <p className="text-gray-500">
            @{user.username}
          </p>

          <div className="text-left mt-8 space-y-4">

            <div className="border-b pb-3">
              <p className="text-gray-400 text-sm">Full Name</p>
              <p className="font-semibold">{user.fullName}</p>
            </div>

            <div className="border-b pb-3">
              <p className="text-gray-400 text-sm">Username</p>
              <p className="font-semibold">{user.username}</p>
            </div>

            <div className="border-b pb-3">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>

            <div className="border-b pb-3">
              <p className="text-gray-400 text-sm">Account Created</p>
              <p className="font-semibold">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>

          <p className="text-green-600 font-semibold mt-6">
            Welcome to your dashboard!
          </p>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;