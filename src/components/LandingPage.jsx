import React from 'react';
import landingImage from '../Images/landing.jpeg'; // Importing the background image
import { Link } from 'react-router-dom'; // Import Link for navigation
import { API_BASE_URL } from '../App';


function LandingPage() {
  return (
    <div 
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center relative"
      style={{ backgroundImage: `url(${landingImage})` }} // Using the imported image
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 bg-white bg-opacity-80 shadow-lg p-4 flex justify-between items-center">
        <div className="text-[#003180ff] font-bold text-xl">Quiet Library Tracker</div>
        <div className="space-x-4">
          <Link to="/contact" className="text-[#003180ff] hover:underline">Contact Us</Link>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 bg-white bg-opacity-90 p-12 rounded-lg shadow-2xl text-center max-w-lg mt-20"> {/* Added margin-top to avoid overlap with navbar */}
        <h1 className="text-4xl font-extrabold text-[#003180ff] mb-8">Quiet Library Tracker</h1>
        
        <p className="text-gray-600 mb-8">
          A simple and effective way to manage your library. Log in to get started!
        </p>

        {/* Only User Login button remains */}
        <div className="flex justify-center space-x-3"> {/* Further reduced space between buttons */}
          <button
            className="bg-[#804F00] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-[#663D00] transition duration-300 transform hover:scale-105" // Added font-bold and increased padding
            onClick={() => window.location.href='/login'} // Redirecting to user login page
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
