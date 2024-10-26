import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../App';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borrowError, setBorrowError] = useState(null);
  const [borrowSuccess, setBorrowSuccess] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksResponse = await fetch(`${API_BASE_URL}/all_books`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!booksResponse.ok) {
          throw new Error('Failed to fetch books');
        }

        const booksData = await booksResponse.json();
        setBooks(booksData);

        const userResponse = await fetch(`${API_BASE_URL}/borrowed_books`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user borrows');
        }

        const borrowedData = await userResponse.json();
        setBorrowedBooks(borrowedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBorrowBook = async (bookId) => {
    const confirmBorrow = window.confirm('Are you sure you want to borrow this book?');
    if (!confirmBorrow) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/borrow_book/${bookId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setBorrowError(errorData.message);
        setBorrowSuccess(null);
        return;
      }

      const data = await response.json();
      setBorrowSuccess(data.message);
      setBorrowError(null);
    } catch (error) {
      setBorrowError(error.message);
      setBorrowSuccess(null);
    }
  };

  const handleBuyBook = (book) => {
    // Navigate to the checkout page, passing the book details
    navigate(`/checkout/${book.id}`, { state: { book } });
  };

  const checkStatus = (bookId) => {
    const borrowedBook = borrowedBooks.find(borrow => borrow.book_id === bookId);
    if (borrowedBook) {
      // Display status and instructions
      alert(`Borrow status: ${borrowedBook.status}\nInstructions: ${borrowedBook.instructions || 'No instructions provided.'}`);
    } else {
      alert('No borrow request found for this book.');
    }
  };

  const handleCancelBorrow = async (borrowId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this borrow request?');
    if (!confirmCancel) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cancel_borrow/${borrowId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setBorrowError(errorData.message);
        setBorrowSuccess(null);
        return;
      }

      const data = await response.json();
      setBorrowSuccess(data.message);
      setBorrowError(null);
      setBorrowedBooks(borrowedBooks.filter(borrow => borrow.id !== borrowId));
    } catch (error) {
      setBorrowError(error.message);
      setBorrowSuccess(null);
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
      <h1 className="text-3xl font-bold mb-6 text-[#003180ff]">Available Books</h1>
      {borrowError && <div className="text-red-500 mb-4">{borrowError}</div>}
      {borrowSuccess && <div className="text-green-500 mb-4">{borrowSuccess}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => {
          const isBorrowed = borrowedBooks.some(borrow => borrow.book_id === book.id);
          const borrowRequest = borrowedBooks.find(borrow => borrow.book_id === book.id);

          return (
            <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={`${API_BASE_URL}/static/uploads/${book.photo}`} alt={book.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600"><strong>Author:</strong> {book.author}</p>
                <p className="text-gray-600"><strong>Category:</strong> {book.category}</p>
                <p className="text-gray-600"><strong>Release Date:</strong> {new Date(book.release_date).toLocaleDateString()}</p>
                <p className="text-gray-600"><strong>Price:</strong> ${book.price.toFixed(2)}</p>
                <p className="text-gray-700 mt-2">{book.description}</p>
                <div className="flex justify-between mt-4">
                  {!borrowRequest ? (
                    <>
                      <button 
                        onClick={() => handleBuyBook(book)} 
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-green-600 transition duration-300"
                      >
                        Buy
                      </button>
                      <button 
                        onClick={() => handleBorrowBook(book.id)} 
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300"
                      >
                        Borrow
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => checkStatus(book.id)} 
                        className="bg-yellow-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-yellow-600 transition duration-300"
                      >
                        Check Status
                      </button>
                      {borrowRequest.status === 'pending' && (
                        <button 
                          onClick={() => handleCancelBorrow(borrowRequest.id)} 
                          className="bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-red-600 transition duration-300"
                        >
                          Cancel Borrow
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Books;
