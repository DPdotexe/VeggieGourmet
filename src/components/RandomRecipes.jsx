import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


function RandomRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
          params: {
            apiKey: process.env.REACT_APP_API_KEY,
            number: 36,
            tags: 'vegetarian',
          },
        });

        setRecipes(response.data.recipes);
        setLoading(false);
      } catch (error) {
        console.error('Errore nella chiamata API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="recipe-container">
      {loading ? (
        <ClipLoader />
      ) : (
        recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card-link">
            <div className="recipe-card">
              <h2 className="recipe-title">{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <div className="recipe-details">
                <p><strong>Cooking Time:</strong> {recipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> {recipe.servings} servings</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default RandomRecipes;
