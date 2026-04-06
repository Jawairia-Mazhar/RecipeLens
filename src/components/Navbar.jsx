import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 sticky top-0 bg-white z-10">
      <h1><Link to="/" className='text-2xl'>RecipeLens</Link></h1>
      
      <Link to="/favorites">Favorites</Link>
    </nav>
  )
}

export default Navbar