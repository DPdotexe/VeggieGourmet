import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Recipes from './components/Recipes/Recipes';
import RandomRecipes from './components/RandomRecipes/RandomRecipes';
import RecipeInfo from './components/RecipeInfo/RecipeInfo';
import Footer from './components/Footer/Footer';
import ErrorPage from './components/Error/ErrorPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // react router
  return (
    <div className={`App ${searchQuery ? 'search-mode' : 'random-mode'}`}>
      <Router>
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={searchQuery ? <Recipes query={searchQuery} /> : <RandomRecipes />} />
          <Route path="/recipe/:id" element={<RecipeInfo onSearch={handleSearch} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Recipes query={searchQuery} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
