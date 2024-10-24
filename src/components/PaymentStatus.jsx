import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sale_id, message, book } = location.state || {};

  const [paymentStatus, setPaymentStatus] = useState(message || "Checking payment status...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/payment_status/${sale_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setPaymentStatus(data.message);
        } else {
          setPaymentStatus("Failed to retrieve payment status.");
        }
      } catch (error) {
        setPaymentStatus("Error fetching payment status.");
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchPaymentStatus, 5000);
    return () => clearInterval(intervalId);
  }, [sale_id]);

  const handleRetryCheckout = () => {
    if (book) {
        navigate(`/checkout/${book.id}`, { state: { book } });
    }
    };
  

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#003180ff]">Payment Status</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {loading ? (
          <p className="text-blue-600">Checking payment status...</p>
        ) : (
          <div>
            <p className={`text-lg font-semibold ${paymentStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {paymentStatus}
            </p>
            {book && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Book Details:</h2>
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
              </div>
            )}
           {(paymentStatus.includes('failed') || paymentStatus.includes('pending')) && (
            <button 
                onClick={handleRetryCheckout} 
                className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300"
            >
                Retry Checkout
            </button>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentStatus;
