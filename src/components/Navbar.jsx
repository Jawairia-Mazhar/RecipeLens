import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <h1>RecipeLens</h1>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
  )
}

export default Navbar