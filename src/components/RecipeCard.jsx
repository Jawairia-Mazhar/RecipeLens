import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate()


  return (
    <div onClick={() => navigate(`/recipe/${recipe.id}`)} style={{ cursor: 'pointer' }}> 
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
    </div>
  )
}

export default RecipeCard