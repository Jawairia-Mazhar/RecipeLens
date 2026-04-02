import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import RecipeDetail from './pages/RecipeDetail'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </>
  )
}

export default App