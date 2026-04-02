import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import RecipeDetail from './pages/RecipeDetail'
import { Routes, Route } from 'react-router-dom'


const App = () => {
  const [favorites, setFavorites] = React.useState([])

  React.useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites)) // Whenever the favorites state changes, we update the local storage with the new favorites list. We convert the favorites array to a JSON string before storing it, because local storage can only store strings.
    
  }, [favorites])

  React.useEffect(() => {
    const stored = localStorage.getItem('favorites') // The if (stored) guard is important — if nothing is saved yet, getItem returns null and JSON.parse(null) would crash.
    if (stored) {
      setFavorites(JSON.parse(stored))
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
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={ <RecipeDetail addToFav={addToFav} /> } />
      </Routes>
    </>
  )
}

export default App