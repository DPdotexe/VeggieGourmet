import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import CustomLoader from './Loader';
import '../css/RecipeInfo.css';

function RecipeInfo() {
  const { id } = useParams();
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: process.env.REACT_APP_API_KEY,
              includeNutrition: true,
            },
          }
        );

        setRecipeInfo(response.data);

        const stepsResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/analyzedInstructions`,
          {
            params: {
              apiKey: process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (stepsResponse.data.length > 0) {
          const analyzedInstructions = stepsResponse.data[0].steps;
          setSteps(analyzedInstructions);
        }

        setLoading(false);
      } catch (error) {
        console.error('Errore nella chiamata API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, searchQuery]);

  useEffect(() => {
    if (recipeInfo) {
      const recipeIngredients = recipeInfo.extendedIngredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        image: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
      }));
      setIngredients(recipeIngredients);
    }
  }, [recipeInfo]);

  return (
    <div className="recipe-container-info">
      {loading ? (
        <CustomLoader />
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <h2 className="recipe-title">{recipeInfo.title}</h2>
          {recipeInfo.image && (
            <img
              src={recipeInfo.image}
              alt={recipeInfo.title}
              className="recipe-image"
            />
          )}

          {/* Resto del codice per visualizzare le informazioni sulla ricetta */}
          
          <Link to="/" className="footer-link">
            <FaArrowLeft className="back-icon" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default RecipeInfo;
