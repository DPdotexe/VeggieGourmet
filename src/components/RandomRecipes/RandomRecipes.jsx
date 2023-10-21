import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaClock, FaUtensils } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import '../../css/Recipes.css'; 


// Random recipes setup

function RandomRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

//API Call with Axios

  useEffect(() => {
    axios
      .get('https://api.spoonacular.com/recipes/random', {
        params: {
          apiKey: process.env.REACT_APP_API_KEY,
          number: 36,
          tags: 'vegetarian',
        },
      })
      .then((response) => {
        setRecipes(response.data.recipes);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error API:', error);
        navigate('/error');
      });
  }, [navigate]);

  return (
    <div className="recipe-container">
      {loading ? (
        <ClipLoader />
      ) : recipes.length === 0 ? (
        navigate('/error') 
      ) : (
        recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card-link">
            <div className="recipe-card">
              <h2 className="recipe-title">{recipe.title}</h2>
              <img
                 src={recipe.image || '../img/no-image.png'} 
                alt={recipe.title}
                className="recipe-image"
                />
              <div className="recipe-details">
                <p><FaClock /> {recipe.readyInMinutes} minutes</p>
                <p><FaUtensils /> {recipe.servings} servings</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default RandomRecipes;
