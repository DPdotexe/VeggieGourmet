import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import '../css/RecipeInfo.css';

function RecipeInfo() {
  const { id } = useParams();
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        navigate('/error');
      }
    };

    fetchData();
  }, [id, navigate]);

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
        <ClipLoader />
      ) : (
        <div>
          <h2 className="recipe-title">{recipeInfo.title}</h2>
          <img
            src={recipeInfo.image || '../img/no-image.png'}
            alt={recipeInfo.title}
            className="recipe-image"
          />
          <div className="description-box">
            <p
              className="recipe-description"
              dangerouslySetInnerHTML={{ __html: recipeInfo.summary }}
            ></p>
          </div>
          <div className="sections">
            <div className="section">
              <h3 className="section-title">Ingredients</h3>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="list-item">
                    {ingredient.image && (
                      <img
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="ingredient-image"
                      />
                    )}
                    {ingredient.name}: {ingredient.amount} {ingredient.unit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="section">
              <h3 className="section-title">Recipe Steps</h3>
              <div>
                {steps.map((step, index) => (
                  <p key={index} className="list-item">
                    <span className="step-number">{index + 1}.</span> {step.step}
                  </p>
                ))}
              </div>
            </div>
            <div className="section">
              <h3 className="section-title">Recipe Similar</h3>
              <ul>
                {recipeInfo.recipeSimilar.map((similarRecipe, index) => (
                  <li key={index} className="list-item">
                    {similarRecipe}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/" className="footer-link">
            <FaArrowLeft className="back-icon" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default RecipeInfo;
