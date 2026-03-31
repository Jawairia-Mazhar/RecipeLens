import React from 'react'

const SearchBar = ({onSearch}) => {
    const [text, setText] = React.useState(''); // state to store current input value

    const handleChange = (e) => {
        setText(e.target.value); // update state with current input value
    }

  return (
    <div className='searchContainer'>
        <input type="text" placeholder="Search recipes..." 
        value= {text} onChange={handleChange} className="searchInput"/>
        <button onClick={() => onSearch(text)}>
            Search
        </button>

    </div>
  )
}

export default SearchBar