import React from 'react'

const RecipeCard = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
    </div>
  )
}

export default RecipeCard