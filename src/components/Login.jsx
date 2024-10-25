import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.access_token);

      const redirectUrl = response.data.redirect;
      console.log('Login successful!', response.data);

      navigate(`/${redirectUrl}`);

    } catch (err) {
      const errorMessage = err.response && err.response.data.message 
        ? err.response.data.message 
        : 'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-[#804F00] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
