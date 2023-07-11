import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password: password }),
    })
      .then((response) => response.json())
      .then((userData) => {
        navigate('/', { state: { user: userData, isLogged: true } });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="flex items-center justify-center h-screen">
      <div className="w-64">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md">
          Login
        </button>
      </div>
    </div>
    </div>
  );
}
