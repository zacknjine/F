import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState('');

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the JWT token
        },
      });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  // Handle form submission for adding/editing users
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = {
        username,
        password,
        role,
      };

      if (editingUserId) {
        // Edit existing user
        await axios.put(`http://localhost:5000/edit_user/${editingUserId}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT token for authentication
          },
        });
      } else {
        // Add new user
        await axios.post('http://localhost:5000/register', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT token for authentication
          },
        });
      }

      fetchUsers();  // Refresh users after the action
      resetForm();   // Reset form fields
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to save user');
    }
  };

  // Handle editing a user (populate form with existing user data)
  const handleEdit = (user) => {
    setUsername(user.username);
    setRole(user.role);
    setEditingUserId(user.id);
    setPassword(''); // Password will be reset for security
  };

  // Handle deleting a user
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/delete_user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT token for authentication
          },
        });
        fetchUsers();  // Refresh users after deletion
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  // Reset the form
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setRole('user'); // Default role to 'user'
    setEditingUserId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Form for adding/editing users */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required={!editingUserId}  // Password required only for new user
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mb-4 w-full"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
          {editingUserId ? 'Update User' : 'Add User'}
        </button>
        <button type="button" onClick={resetForm} className="bg-gray-500 text-white p-2 w-full mt-2 rounded">
          Cancel
        </button>
      </form>

      {/* Display the list of users */}
      <h3 className="text-xl font-bold mb-2">User List</h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border p-2 mb-2 flex justify-between items-center">
              <p>
                <strong>Username:</strong> {user.username} | <strong>Role:</strong> {user.role}
              </p>
              <div>
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageUsers;
