import React from 'react'
import { Link } from 'react-router-dom'
import EmptyFav from '../assets/favorite.png'
import FilledFav from '../assets/filled_heart.png'

const RecipeCard = ({ recipe, favorites, addToFav, removeFromFav }) => {
  const isFavorite = favorites.some(fav => fav.id === recipe.id)

  const toggleFavorite = (e) => {
    e.preventDefault()
    if (isFavorite) removeFromFav(recipe.id)
    else addToFav(recipe)
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/recipe/${recipe.id}`} className="flex flex-1 flex-col">
        <div className="aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <h2
          className="line-clamp-2 px-5 pb-5 pt-4 text-lg font-semibold leading-snug text-stone-800"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          {recipe.title}
        </h2>
      </Link>

      {/* Always visible so phone users can save without hovering */}
      <button
        onClick={toggleFavorite}
        aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition hover:scale-110"
      >
        <img
          src={isFavorite ? FilledFav : EmptyFav}
          alt=""
          className="h-5 w-5"
        />
      </button>
    </article>
  )
}

export default RecipeCard