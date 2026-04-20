import React from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyFav from '../assets/favorite.png'
import FilledFav from '../assets/filled_heart.png'

const RecipeCard = ({ recipe, favorites, addToFav, removeFromFav }) => {
  const navigate = useNavigate()
  const isFavorite = recipe ? favorites.some((fav) => fav.id === recipe.id) : false;

  return (
    <div className='card cursor-pointer overflow-hidden flex flex-col gap-2 items-center border border-gray-300 rounded-md w-70'>
      <div className='card__shine' />
      <div className='card__glow' />

      <div onClick={() => navigate(`/recipe/${recipe.id}`)}
        className='card__content p-1'>
{/* image div */}
        <div className='relative group item-center'>
          <div className='card__image w-58 h-58 rounded-full overflow-hidden'>
            <img src={recipe.image} alt={recipe.title}
                className="w-full h-full rounded-full object-cover object-center border-4 border-white shadow-lg"
                onError={(e) => e.target.style.display = 'none'}/>
          </div>
{/* shadow div for hover effect on recipe image        */}
          <div className='flex justify-center items-center w-58 h-58 rounded-full absolute inset-0 bg-transparent backdrop-blur-xs bg-opacity-50 opacity-0 group-hover:opacity-90 transition-opacity duration-200'>
            <button 
              onClick={(e) => {            
                e.stopPropagation();
                isFavorite ? removeFromFav(recipe.id) : addToFav(recipe)}}
              className = "absolute w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center items-center">
              <img src={isFavorite ? FilledFav : EmptyFav} alt={isFavorite ? "Remove from Favorites" : "Add to Favorites"} className={`w-8 h-8 hover:transform-none ${!isFavorite ? 'brightness-0 invert' : ''}`}/>
            </button>
          </div>
        </div>
{/* recipe title */}
        <div className='card__text w-full pb-4 px-1'>
          <h2 className='card__title text-center line-clamp-2 w-full'>{recipe.title}</h2>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard