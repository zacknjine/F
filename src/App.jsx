import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ManageBooks from './components/ManageBooks';
import ManageUsers from './components/ManageUsers';
import UserDashboard from './components/UserDashboard';
import ContactUs from './components/ContactUs'; 
import Books from './components/Books';
import ManageBorrowRequests from './components/ManageBorrowRequests';
import PaymentStatus from './components/PaymentStatus';
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-books" element={<ManageBooks />} /> {}
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/contact" element={<ContactUs />} /> {}
        <Route path="/books" element={<Books />} /> {}
        <Route path="/borrow-requests" element={<ManageBorrowRequests />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
      </Routes>
    </Router>
  );
}

// App.jsx or config.js
export const API_BASE_URL = "https://f3bf9b83f211c75f8bcfa013df7fbaf0.serveo.net"; 

export default App;
