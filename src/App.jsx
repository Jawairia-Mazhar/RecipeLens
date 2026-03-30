import React from 'react'
import Home from './pages/Home'
import SearchBar from './components/SearchBar'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />   
      <SearchBar />
      <Home />
    </>
  )
}

export default App