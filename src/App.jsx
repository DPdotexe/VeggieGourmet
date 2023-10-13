import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import RandomRecipes from './components/RandomRecipes';
import SearchBar from './components/SearchBar';
import RecipeInfo from './components/RecipeInfo';
import Footer from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={`App ${searchQuery ? 'search-mode' : 'random-mode'}`}>
      <Router>
        <Navbar />
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              searchQuery ? (
                <Recipes query={searchQuery} />
              ) : (
                <RandomRecipes />
              )
            }
          />
          <Route path="/recipe/:id" element={<RecipeInfo onSearch={handleSearch} />} />
          <Route path="*" element={<Recipes query={searchQuery} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
