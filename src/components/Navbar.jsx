import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '../assets/favorite.png'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 sticky top-0 bg-white z-10">
      <h1><Link to="/" className='text-2xl'>RecipeLens</Link></h1>
      
      <Link to="/favorites">
        <img src={FavoriteIcon} alt="Favorites" className='w-6 h-6'/>
      </Link>
    </nav>
  )
}

export default Navbar