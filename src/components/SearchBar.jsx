import React from 'react'
import SearchIcon from '../assets/searchIcon.png'

const SearchBar = ({onSearch}) => {
    const [text, setText] = React.useState(''); // state to store current input value

    const handleChange = (e) => {
        setText(e.target.value); // update state with current input value
    }

  return (
    <div className='searchContainer placeholder:text-gray-400 focus-within:placeholder:text-gray-200 place-items-center gap-2 border border-gray-300 rounded-md p-2 w-full max-w-md flex items-center'>
        <input type="text" placeholder="Search recipes by ingredients..." 
        value= {text} onChange={handleChange} className="searchInput outline-none p-1 w-full"/>
        <button onClick={() => onSearch(text)} className="cursor-pointer">
            <img src={SearchIcon} alt="Search" className="w-6 h-6" />
        </button>
    </div>
  )
}

export default SearchBar