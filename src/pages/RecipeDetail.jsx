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
            <div className="flex flex-col items-center gap-4 p-6 md:flex-row top-4">
                <img src={recipe.image} alt={recipe.title} />
                <div className="gap-2 flex flex-col items-center md:items-start">
                    <h1 className="text-2xl font-bold"> {recipe.title}</h1>
                    <p className="text-left">{recipe.instructions}</p>
                </div>
                <button 
                onClick={() => isFavorite ? removeFromFav(recipe.id) : addToFav(recipe)}>
                    <img 
                    src={isFavorite ? FilledFav : EmptyFav} 
                    alt={isFavorite ? "Remove from Favorites" : "Add to Favorites"} className='w-6 h-6'/>
                </button>
            </div>
        )}
        {error && <p>{error}</p>} {/*  If error is not null, show it. */}

    </>
  )
}

export default RecipeDetail