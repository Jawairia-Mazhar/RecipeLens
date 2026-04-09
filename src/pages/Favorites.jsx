import React from 'react'
import RecipeCard from '../components/RecipeCard'

const Favorites = ({ favorites }) => {

  return (
    <>
        <h2 className='text-2xl text-center'>Favorites</h2>
        {favorites.length === 0 ? (
            <p>No favorite recipes yet.</p>)
            :
            <div className='flex flex-wrap gap-4 justify-center p-4'>
                {favorites.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        }     
    </>
)
};

export default Favorites