import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import FavoriteIcon from '../assets/filled_heart.png'

const Navbar = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 transition-colors duration-300 ${
        isHome
          ? 'bg-transparent'
          : 'border-b border-stone-200 bg-white/85 shadow-sm backdrop-blur-md'
      }`}
    >
      <Link
        to="/"
        className={`text-3xl transition hover:opacity-80 ${
          isHome ? 'text-white' : 'text-stone-800'
        }`}
        style={{ fontFamily: 'Pacifico, cursive' }}
      >
        RecipeLens
      </Link>

      <Link
        to="/favorites"
        aria-label="Favorites"
        className="rounded-full p-2 transition hover:scale-110 hover:bg-black/5"
      >
        <img src={FavoriteIcon} alt="" className="h-6 w-6" />
      </Link>
    </nav>
  )
}

export default Navbar