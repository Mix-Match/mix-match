import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';
import { BiSolidDrink } from 'react-icons/bi';


export default function Navbar() {
  const [liquor, setLiquor] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [localStorage.getItem('user')]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = { liquor };
    navigate("/main", { state: { ...formData } });
  };

  const handleLiquorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLiquor(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="Navbar">
      <div className="logoContainer">
        <a href='/main' className="mixMatchLink">
          {/* <h1>MixMatch</h1> */}
          <img
            src="https://gcdnb.pbrd.co/images/4lVNPWUjg0ye.png?o=1"
            alt="MixMatch"
            className="logo"
          />
        </a>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Liquor"
            value={liquor}
            onChange={handleLiquorChange}
            required
            className="customInput"
          />
          <button type="submit" className="navButton">Submit</button>
        </form>
      </div>
      <div>
        <button onClick={() => navigate("/favorites")} className="navButton"><FaHeart style={{ color: '#FFB1A5', fontSize: '25px', verticalAlign: 'middle', marginRight: '8px' }}/> <span className="buttonText" style={{verticalAlign: 'middle' }}>Favorites</span></button>
      </div>
      <div>
        <button onClick={() => navigate("/popular")} className="navButton">< BiSolidDrink style={{ fontSize: '25px', verticalAlign: 'middle', marginRight: '8px' }}/><span className="buttonText" style={{verticalAlign: 'middle' }}>Popular Cocktails</span></button>
      </div>
      <div>
      {isLoggedIn ? (
          <button onClick={handleLogout} className="navButton">
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/")} className="navButton">
            Login or Sign Up
          </button>
        )}
      </div>
    </div>
  );
}

{/* <button onClick={() => navigate("/")} className="navButton">Login or Sign Up</button> */}