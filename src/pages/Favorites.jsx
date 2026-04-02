import React from 'react'
import RecipeCard from '../components/RecipeCard'

const Favorites = ({ favorites }) => {
  return (
    <>
        <h2>Favorites</h2>
        {favorites.length === 0 ? (
            <p>No favorite recipes yet.</p>)
            : 
            favorites.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
        ))};
    
    </>
)
};

export default Favorites