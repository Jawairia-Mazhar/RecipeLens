import React from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyFav from '../assets/favorite.png'
import FilledFav from '../assets/filled_heart.png'

const RecipeCard = ({ recipe, favorites, addToFav, removeFromFav }) => {
  const navigate = useNavigate()
  const isFavorite = recipe ? favorites.some((fav) => fav.id === recipe.id) : false;
  return (
    <div onClick={() => navigate(`/recipe/${recipe.id}`)} className='cursor-pointer overflow-hidden flex flex-col gap-2 items-center border border-gray-300 rounded-md p-2 w-78'> 
      <img src={recipe.image} alt={recipe.title} />

      <div className='flex justify-between items-center w-full'>
        <h2>{recipe.title}</h2>
        <button 
        onClick={() => isFavorite ? removeFromFav(recipe.id) : addToFav(recipe)} 
        className = "w-5 h-5">
          <img src={isFavorite ? FilledFav : EmptyFav} alt={isFavorite ? "Remove from Favorites" : "Add to Favorites"} />
        </button>

      </div>
    </div>
  )
}

export default RecipeCard