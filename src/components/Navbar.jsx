import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import FavoriteIcon from '../assets/filled_heart.png'

const Navbar = () => {
  const location = useLocation() // Get the current location object
  const isHome = location.pathname === '/' // Check if the current path is the home page

  return (
    <nav className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between w-full px-4 py-3 
      ${isHome ? 'bg-transparent shadow-none' : 
      'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'
    }`}>
      <h1><Link to="/" className={`text-3xl
          ${isHome ? 'text-white text-shadow-2xs' : 'text-gray-800'}`} style={{ fontFamily: "Pacifico", fontSize: "32px"}}>RecipeLens</Link></h1>
      
      <Link to="/favorites">
        <img src={FavoriteIcon} alt="Favorites" className='w-6 h-6 '/>
      </Link>
    </nav>
  )
}

export default Navbar