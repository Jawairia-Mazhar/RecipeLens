import React from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyFav from '../assets/favorite.png'
import FilledFav from '../assets/filled_heart.png'

const RecipeCard = ({ recipe, favorites, addToFav, removeFromFav }) => {
  const navigate = useNavigate()
  const isFavorite = recipe ? favorites.some((fav) => fav.id === recipe.id) : false;

  return (
    <div 
      onClick={() => navigate(`/recipe/${recipe.id}`)} 
      className='cursor-pointer overflow-hidden flex flex-col gap-2 items-center border border-gray-300 rounded-md p-2 w-70'>

      <div className='relative group'>
        <img src={recipe.image} alt={recipe.title}
            className="w-58 h-58 rounded-full object-cover border-4 border-white shadow-lg"/>
      
        <div className='flex justify-center items-center w-58 h-58 rounded-full absolute inset-0 bg-transparent backdrop-blur-xs bg-opacity-50 opacity-0 group-hover:opacity-90 transition-opacity duration-200'>
          <button 
            onClick={(e) => {            
              e.stopPropagation(); // This prevents the click event from bubbling up to the parent div, which would trigger the navigation to the recipe detail page. By calling e.stopPropagation(), we ensure that when the user clicks on the favorite button, it only toggles the favorite status without navigating away from the current page.
              isFavorite ? removeFromFav(recipe.id) : addToFav(recipe)}}
            className = "absolute w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center items-center">
            <img src={isFavorite ? FilledFav : EmptyFav} alt={isFavorite ? "Remove from Favorites" : "Add to Favorites"} className='w-8 h-8'/>
          </button>
        </div>
      <h2 className='text-center pt-2'>{recipe.title}</h2>
      </div>
    </div>
  )
}

export default RecipeCard