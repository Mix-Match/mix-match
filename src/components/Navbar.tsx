import React, { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [liquor, setLiquor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      liquor,
    };
    navigate("/main", { state: { ...formData } });
  };

  const handleLiquorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLiquor(event.target.value);
  };

  return (
    <div className="Navbar">
      <div>
        
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Liquor"
            value={liquor}
            onChange={handleLiquorChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <button onClick={() => navigate("/login")}>Login or Sign Up</button>
      </div>
    </div>
  );
}