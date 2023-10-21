import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import '../../css/RecipeInfo.css';

function RecipeInfo() {
  const { id } = useParams();
  const [recipeInfo, setRecipeInfo] = useState(null);
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

        response.data.summary = response.data.summary.replace(/<a[^>]+>([^<]+)<\/a>/g, '$1');

        setRecipeInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nella chiamata API:', error);
        setLoading(false);
        navigate('/error');
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <div className="recipe-container-info">
      {loading ? (
        <ClipLoader />
      ) : (
        recipeInfo && (
          <div>
            <h2 className="recipe-title">{recipeInfo.title}</h2>
            <img
              src={recipeInfo.image || '../img/no-image.png'}
              alt={recipeInfo.title}
              className="recipe-image"
            />
            <div className="description-box">
              <p className="recipe-description" dangerouslySetInnerHTML={{ __html: recipeInfo.summary }}></p>
            </div>
            <div className="sections">
              <Ingredients ingredients={recipeInfo.extendedIngredients} />
              <RecipeSteps steps={recipeInfo.analyzedInstructions[0]?.steps} />
            </div>
            <div className="footer-link" onClick={() => navigate('/')}>
              <FaArrowLeft className="back-icon" />
            </div>
          </div>
        )
      )}
    </div>
  );
}

function Ingredients({ ingredients }) {
  return (
    ingredients && ingredients.length > 0 && (
      <div className="section">
        <h3 className="section-title">Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index} className="list-item">
              {ingredient.image && (
                <img
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                  alt={ingredient.name}
                  className="ingredient-image"
                />
              )}
              {`${ingredient.name}: ${ingredient.amount} ${ingredient.unit}`}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

function RecipeSteps({ steps }) {
  return (
    steps && steps.length > 0 && (
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
    )
  );
}

export default RecipeInfo;
