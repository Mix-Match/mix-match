import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('/api/signup', {
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
  }


  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <div className="signup">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}