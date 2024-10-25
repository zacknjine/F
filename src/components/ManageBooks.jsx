import React, { useState } from 'react';
import axios from 'axios';

function ManageBooks() {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    release_date: '', 
    price: '',
    stock: '',
    photo: null, 
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleImageChange = (e) => {
    setBookData({ ...bookData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

   
    const formData = new FormData();
    for (const key in bookData) {
      formData.append(key, bookData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/add_book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data);
      alert('Book added successfully!');

      setBookData({
        title: '',
        author: '',
        category: '',
        description: '',
        release_date: '',
        price: '',
        stock: '',
        photo: null,
      });
    } catch (error) {
      setError('Failed to add the book. ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Books</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={bookData.title}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />

        <select
          name="category"
          value={bookData.category}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        >
          <option value="">Select Category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Children's">Children's</option>
          <option value="Mystery">Mystery</option>
          <option value="History">History</option>
          <option value="Education">Education</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={bookData.description}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        ></textarea>
        <input
          type="date"
          name="release_date" 
          value={bookData.release_date}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={bookData.price}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={bookData.stock}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
        <input
          type="file"
          name="photo"
          onChange={handleImageChange}
          required
          className="w-full mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded transition hover:bg-blue-700 w-full"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default ManageBooks;
