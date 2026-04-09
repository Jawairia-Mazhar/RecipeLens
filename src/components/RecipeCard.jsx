import React from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '../assets/favorite.png'

const RecipeCard = ({ recipe, addToFav, removeFromFav }) => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/recipe/${recipe.id}`)} className='cursor-pointer overflow-hidden flex flex-col gap-2 items-center border border-gray-300 rounded-md p-2 w-78'> 
      <img src={recipe.image} alt={recipe.title} />

      <div className='flex justify-between items-center w-full'>
        <h2>{recipe.title}</h2>
        <button onClick={() => addToFav(recipe)} className = "w-5 h-5">
          <img src={FavoriteIcon} alt="Add to Favorites" />
        </button>

      </div>
    </div>
  )
}

export default RecipeCard