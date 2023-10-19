import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../css/SearchBar.css';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedQuery = query.toLowerCase().replace(/\s/g, '');
    onSearch(formattedQuery);
    navigate('/');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your recipes...."
          value={query}
          onChange={handleInputChange}
          className="search-input"
          required
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
