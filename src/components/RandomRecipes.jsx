import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Recipes.css';

function RandomRecipes() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.spoonacular.com/recipes/random', {
        params: {
          apiKey: process.env.REACT_APP_API_KEY,
          number: 9,
        },
      })
      .then((response) => {
        setRandomRecipes(response.data.recipes);
      })
      .catch((error) => {
        console.error('Errore nella chiamata API:', error);
      });
  }, []);

  return (
    <div className="recipe-container">
      {randomRecipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card-link">
          <div className="recipe-card">
            <h2 className="recipe-title">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RandomRecipes;
