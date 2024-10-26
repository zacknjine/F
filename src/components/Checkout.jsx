import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../App';

function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { book } = location.state || {};

  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!book) {
    return <div>Error: No book information provided.</div>;
  }

  const handlePayment = async () => {
    if (!phoneNumber) {
      alert("Please enter your phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/checkout/${book.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the PaymentStatus component with sale_id, message, and book details
        navigate('/payment-status', {
          state: { 
            sale_id: data.sale_id, 
            message: "Checkout initiated",
            book: {
              title: book.title,
              author: book.author,
              price: book.price,
            }
          },
        });
      } else {
        setError(data.message || "Payment initiation failed.");
      }
    } catch (err) {
      setError("An error occurred while initiating the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#003180ff]">Checkout for {book.title}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img 
          src={`${API_BASE_URL}/static/uploads/${book.photo}`} 
          alt={book.title} 
          className="w-full h-64 object-cover mb-4"
        />
        <p className="text-gray-600"><strong>Author:</strong> {book.author}</p>
        <p className="text-gray-600"><strong>Category:</strong> {book.category}</p>
        <p className="text-gray-600"><strong>Release Date:</strong> {new Date(book.release_date).toLocaleDateString()}</p>
        <p className="text-gray-600"><strong>Price:</strong> ${book.price.toFixed(2)}</p>
        
        <div className="mt-4">
          <label htmlFor="phone-number" className="block text-gray-700 font-bold mb-2">
            Phone Number (M-Pesa):
          </label>
          <input
            id="phone-number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-lg mb-4"
            placeholder="Enter your phone number"
          />
          
          {loading ? (
            <p className="text-blue-600">Initiating payment...</p>
          ) : (
            <button 
              onClick={handlePayment}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-green-600 transition duration-300"
            >
              Proceed to Payment
            </button>
          )}

          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
