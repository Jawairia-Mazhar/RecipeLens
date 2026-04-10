import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '../assets/favorite.png'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between w-full px-4 py-3 bg-transparent shadow-none">
      <h1><Link to="/" className='text-3xl font-semibold text-white'>RecipeLens</Link></h1>
      
      <Link to="/favorites">
        <img src={FavoriteIcon} alt="Favorites" className='w-6 h-6 brightness-0 invert'/>
      </Link>
    </nav>
  )
}

export default Navbar