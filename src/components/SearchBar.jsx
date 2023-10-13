import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isButtonPushed, setIsButtonPushed] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const searchBarStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '60px 0',
  };

  const searchInputStyle = {
    border: 'none',
    background: 'lightgreen',
    borderRadius: '10px',
    padding: '10px 20px',
    fontSize: '16px',
  };

  const searchButtonStyle = {
    border: 'none',
    background: 'green',
    color: 'white',
    borderRadius: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    marginLeft: '5px',
    cursor: 'pointer',
    transform: isButtonPushed ? 'scale(0.95)' : 'scale(1)',
    transition: 'transform 0.2s',
  };

  const handleButtonClick = () => {
    setIsButtonPushed(true);
    onSearch(query);
  };

  return (
    <div style={searchBarStyle} className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your recipes...."
          value={query}
          onChange={handleInputChange}
          style={searchInputStyle}
        />
        <button
          type="submit"
          style={searchButtonStyle}
          onClick={handleButtonClick}
          onMouseUp={() => setIsButtonPushed(false)}
        >
          <FaSearch /> {/* Usa l'icona di ricerca */}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
