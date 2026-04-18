import React from 'react'
import RecipeCard from '../components/RecipeCard'

const Favorites = ({ favorites, addToFav, removeFromFav }) => {

  return (
    <section className='w-full min-h-screen relative flex flex-col items-center gap-4 pt-12 bg-transparent mt-6'>
        <h2 className='text-2xl text-center font-semibold'>Favorites</h2>
        {favorites.length === 0 ? (
            <p>No favorite recipes yet.</p>)
            :
            <div className='flex flex-wrap gap-4 justify-center p-4'>
                {favorites.map(recipe => (
                        <RecipeCard 
                            key={recipe.id} 
                            recipe={recipe}
                            favorites={favorites}
                            addToFav={addToFav}
                            removeFromFav={removeFromFav}/>
                ))}
            </div>
        }     
    </section>
)
};

export default Favorites