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

  const handleSearchInputValidation = () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      if (query.trim() === '') {
        searchInput.setCustomValidity('Please enter a valid query.');
        searchInput.classList.add('search-error');
      } else {
        searchInput.setCustomValidity('');
        searchInput.classList.remove('search-error');
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchInputValidation();
    const searchInput = document.getElementById('search-input');
    if (!searchInput.validity.customError) {
      const formattedQuery = query.toLowerCase().replace(/\s/g, '');
      onSearch(formattedQuery);
      navigate('/');
    }
  };

  const handleSearchButtonClick = () => {
    const searchInput = document.getElementById('search-input');
    handleSearchInputValidation(); // Esegue la validazione prima della ricerca.

    if (!searchInput.validity.customError) {
      const formattedQuery = query.toLowerCase().replace(/\s/g, '');
      onSearch(formattedQuery);
      navigate('/');
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="search-input"
          placeholder="Type your recipes...."
          value={query}
          onChange={handleInputChange}
          onBlur={handleSearchInputValidation}
          className="search-input"
        />
        <button
          type="submit"
          onClick={handleSearchButtonClick}
          className="search-button"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
