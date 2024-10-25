import React, { useEffect, useState } from 'react';

function ManageBorrowRequests() {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchBorrowRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/manage_borrow_requests', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch borrow requests');
        }

        const data = await response.json();
        setBorrowRequests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowRequests();
  }, []);

  const handleApprove = async (borrowId) => {
    const returnDate = prompt('Enter return date (YYYY-MM-DD):');
    const instructions = prompt('Enter any instructions:');

    if (!returnDate) {
      alert('Return date is required.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/approve_borrow/${borrowId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ return_date: returnDate, instructions }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setMessage(data.message);
      setBorrowRequests(borrowRequests.map(request => 
        request.id === borrowId ? { ...request, status: 'awaiting_pickup' } : request
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleMarkPickedUp = async (borrowId) => {
    try {
      const response = await fetch(`http://localhost:5000/mark_picked_up/${borrowId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setMessage(data.message);
      setBorrowRequests(borrowRequests.map(request => 
        request.id === borrowId ? { ...request, status: 'picked up' } : request
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleMarkReturned = async (borrowId) => {
    try {
      const response = await fetch(`http://localhost:5000/mark_returned/${borrowId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setMessage(data.message);
      setBorrowRequests(borrowRequests.map(request => 
        request.id === borrowId ? { ...request, status: 'returned' } : request
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Borrow Requests</h1>
      {message && <div className="text-green-500 mb-4">{message}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">User ID</th>
            <th className="py-2">Book ID</th>
            <th className="py-2">Borrow Date</th>
            <th className="py-2">Return Date</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowRequests.map((request) => (
            <tr key={request.id}>
              <td className="border px-4 py-2">{request.user_id}</td>
              <td className="border px-4 py-2">{request.book_id}</td>
              <td className="border px-4 py-2">{new Date(request.borrow_date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{request.return_date ? new Date(request.return_date).toLocaleDateString() : 'N/A'}</td>
              <td className="border px-4 py-2">{request.status}</td>
              <td className="border px-4 py-2">
                {request.status === 'pending' && (
                  <button onClick={() => handleApprove(request.id)} className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600">Approve</button>
                )}
                {request.status === 'awaiting_pickup' && (
                  <button onClick={() => handleMarkPickedUp(request.id)} className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Mark Picked Up</button>
                )}
                {request.status === 'picked up' && (
                  <button onClick={() => handleMarkReturned(request.id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Mark Returned</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBorrowRequests;
