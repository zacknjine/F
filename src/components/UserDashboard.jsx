import React, { useState } from 'react';
import { FaClipboardList, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import { API_BASE_URL } from '../App';


function UserDashboard() {
  const [selectedOption, setSelectedOption] = useState(''); 

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-[#003180ff] text-white p-4 shadow-lg flex justify-around">
        <Link
          to="/books" 
          className="cursor-pointer hover:bg-blue-600 p-2 rounded transition duration-200"
        >
          <FaClipboardList className="inline-block mr-1" /> Books
        </Link>

        <Link
          to="/notifications" 
          className="cursor-pointer hover:bg-blue-600 p-2 rounded transition duration-200"
        >
          <FaBell className="inline-block mr-1" /> Notifications
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {/* Welcome Message */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome to Our User Dashboard!</h1>
            <p className="text-gray-600">Explore your options and enjoy our services.</p>
          </div>

          {/* Content for selected options can be handled by routes */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#003180ff] text-white p-4 text-center">
        <p>&copy; 2024 Quiet Library Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default UserDashboard;
