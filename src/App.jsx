import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import RecipeCard from './components/RecipeCard'
import Favorites from './pages/Favorites'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [favorites, setFavorites] = React.useState([])

  React.useEffect(() => {
    if (favorites.length === 0) return; // We only want to update local storage when there are changes to the favorites list, so we check if the length of favorites is 0. If it is, we return early and do not update local storage. This prevents unnecessary updates to local storage when the favorites list is empty.
    localStorage.setItem('favorites', JSON.stringify(favorites)) // Whenever the favorites state changes, we update the local storage with the new favorites list. We convert the favorites array to a JSON string before storing it, because local storage can only store strings.
  }, [favorites])

  React.useEffect(() => {
    const stored = localStorage.getItem('favorites') // The if (stored) guard is important — if nothing is saved yet, getItem returns null and JSON.parse(null) would crash.
    if (stored) {
      setFavorites(JSON.parse(stored)) // When the App component mounts, we check if there are any favorites saved in local storage. If there are, we parse the JSON string back into an array and set it as the initial state for favorites. This way, the user's favorite recipes persist across page reloads.
    }
  }, []) 

  const addToFav = (recipe) => { // needs a complete a recipe to add to favorites. so took the recipe as an argument.
    setFavorites(prevFavs => [...prevFavs, recipe])
    console.log('Added to favorites:', recipe); // Log the added recipe to the console for debugging purposes.
  }
  const removeFromFav = (recipeId) => { // need only id to remove from favorites, not the entire recipe object.
    setFavorites(prevFavs => prevFavs.filter(r => r.id !== recipeId)) // filter out the recipe with the given id from the favorites list. It creates a new array that includes all recipes except the one with the specified id, effectively removing it from the favorites.
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home  addToFav={addToFav} removeFromFav={removeFromFav} favorites={favorites}/>} />
        <Route path="/recipe/:id" element={ <RecipeDetail favorites={favorites} addToFav={addToFav} removeFromFav={removeFromFav} /> } />
        <Route path="/recipe/:id" element={ <RecipeCard favorites={favorites} addToFav={addToFav} removeFromFav={removeFromFav}/> } /> {/* This route is added to ensure that when a user clicks on a recipe card, they are navigated to the recipe detail page where they can see more information about the recipe and have the option to add it to their favorites. */}
        <Route path="/favorites" element={<Favorites favorites={favorites} addToFav={addToFav} removeFromFav={removeFromFav}/>} />

      </Routes>
    </>
  )
}

export default App