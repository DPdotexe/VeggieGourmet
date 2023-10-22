import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';

//Navbar setup

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate(); 

  const handleLogoClick = () => {
    navigate('/'); 
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        <img
          src={process.env.PUBLIC_URL + '/img/veggiegourmetlogo.png'}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
        />
        <div className="text-container">
          <span style={{ fontWeight: 'bold' }}>VeggieGourmet</span>
        </div>
      </div>
      <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Navbar;
