import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Recipes.css';

function Recipes({ query }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: process.env.REACT_APP_API_KEY,
          query: query,
          number: 36,
          diet: 'vegetarian',
          addRecipeInformation: true, 
        },
      })
      .then((response) => {
        setRecipes(response.data.results);
      })
      .catch((error) => {
        console.error('Errore nella chiamata API:', error);
      });
  }, [query]);

  return (
    <div className="recipe-container">
      {recipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card-link">
          <div className="recipe-card">
            <h2 className="recipe-title">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <div className="recipe-details">
              <p><strong>Cooking Time:</strong> {recipe.readyInMinutes} minutes</p>
              <p><strong>Servings:</strong> {recipe.servings}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Recipes;
