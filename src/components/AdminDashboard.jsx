import React from 'react';
import { FaUser, FaBook } from 'react-icons/fa';  
import { Link, Route, Routes } from 'react-router-dom'; 
import ManageUsers from './ManageUsers'; 
import ManageBooks from './ManageBooks'; 

function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/4 bg-[#003180ff] text-white p-4 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-center">Admin Dashboard</h2>
        <ul>
          <li className="flex items-center mb-4 cursor-pointer hover:bg-blue-600 p-2 rounded transition">
            <Link to="/manage-users" className="flex items-center">
              <FaUser className="mr-2 text-xl" /> Manage Users
            </Link>
          </li>
          
          <li className="flex items-center mb-4 cursor-pointer hover:bg-blue-600 p-2 rounded transition">
            <Link to="/borrow-requests" className="flex items-center">
              <FaUser className="mr-2 text-xl" /> Borrow Requests
            </Link>
          </li>


          <li className="flex items-center mb-4 cursor-pointer hover:bg-blue-600 p-2 rounded transition">
            <Link to="/manage-books" className="flex items-center">
              <FaBook className="mr-2 text-xl" /> Manage Books
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          
          <Routes>
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-books" element={<ManageBooks />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
