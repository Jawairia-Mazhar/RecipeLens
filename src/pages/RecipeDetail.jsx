import React from 'react'
import { useParams } from 'react-router-dom'
import EmptyFav from '../assets/favorite.png'
import FilledFav from '../assets/filled_heart.png'

const RecipeDetail = ({favorites, addToFav, removeFromFav}) => {
    const { id } = useParams() //access dynamic parameters from the current URL
    const [recipe, setRecipe] = React.useState(null); // returns a single recipe object, not an array, so we initialize it as null instead of an empty array
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      setLoading(true);
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=ef8cd867a22541cf8424f6b4c4cd361b`)
        .then(res => res.json())
        .then(data => {
            setRecipe(data)
            setLoading(false);
        })
        .catch(err => {
            setError('Something went wrong. Please try again.');
            setLoading(false);
        })
    }, [id])

const isFavorite = recipe ? favorites.some((fav) => fav.id === recipe.id) : false // Checking if the recipe has data, If yes then check favorites if the recipe is in favorites, otherwise just return false.      
  return (
    <>
        {loading ? <p>Loading...</p> :  
        recipe && (
            <div className="w-full mx-auto p-4 mt-12 sm:p-6">

              <div className="flex flex-col gap-8 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-[#d3873f]/40 backdrop-blur-md md:flex-row md:items-start">

                <div className="flex flex-1 flex-col gap-4 text-white">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
                      <p className="mt-2 text-sm text-slate-300 sm:text-base">
                        {recipe.readyInMinutes && `${recipe.readyInMinutes} min · `}
                        {recipe.servings && `${recipe.servings} servings`}
                      </p>
                    </div>

                    <button
                      onClick={() => isFavorite ? removeFromFav(recipe.id) : addToFav(recipe)}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                      aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    >
                      <img
                        src={isFavorite ? FilledFav : EmptyFav}
                        alt={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        className='w-6 h-6'
                      />
                    </button>
                  </div>
                  <div className='flex items-center justify-center'>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full rounded-3xl object-cover shadow-xl border border-white/10 md:w-1/2 "
                    />
                  </div>

                  <div className="recipe-instructions rounded-3xl border border-white/10 bg-cream-90/80 p-5 text-left text-sm leading-7 text-gray-800 shadow-inner shadow-slate-900/20 md:text-base">
                    {recipe.instructions ? (
                      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

                    ) : (
                      'No instructions available yet.'
                    )}
                  </div>
                </div>
              </div>
            </div>
        )}
        {error && <p>{error}</p>} {/*  If error is not null, show it. */}

    </>
  )
}

export default RecipeDetail