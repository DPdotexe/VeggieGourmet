import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaClock, FaUtensils } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet'; 
import './Recipes.css';
import NoResults from '../NoResults/NoResults';

// Recipes setup

function Recipes({ query }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // API Call with Axios
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
        setLoading(false);
      })
      .catch((error) => {
        console.error('API Error:', error);
        navigate('/error');
      });
  }, [query, navigate]);

  return (
    <div>
      <Helmet>
        <title>{query ? `Recipes for "${query}" - VG` : 'Recipes - VG'}</title>
      </Helmet>
      {loading ? (
        <ClipLoader />
      ) : recipes.length === 0 ? (
        <NoResults />
      ) : (
        <div className="recipe-container">
          {recipes.map((recipe) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;
