import React from 'react'
import SearchIcon from '../assets/searchIcon.png'

const SearchBar = ({onSearch}) => {
    const [text, setText] = React.useState(''); // state to store current input value

    const handleChange = (e) => {
        setText(e.target.value); // update state with current input value
    }

  return (
    <div className='searchContainer placeholder:text-gray-400 focus-within:placeholder:text-gray-200 place-items-center gap-2 border-6 border-transparent bg-white/50 backdrop-blur-xs bg-clip-padding rounded-3xl p-2 w-full max-w-md flex items-center'>
        <input type="text" placeholder="Search recipes by ingredients..."
            value= {text} onChange={handleChange} className="searchInput outline-none p-1 w-full"
            onKeyDown={(e) => { // onKeyDown event handler to listen for the "Enter" key press. When the user presses "Enter", it triggers the onSearch function with the current text as an argument, allowing for a quick search without needing to click the search button.
                if (e.key === "Enter"){
                onSearch(text)
                }
        }} />
        <button onClick={() => onSearch(text)} className="cursor-pointer">
            <img src={SearchIcon} alt="Search" className="w-6 h-6" />
        </button>
    </div>
  )
}

export default SearchBar