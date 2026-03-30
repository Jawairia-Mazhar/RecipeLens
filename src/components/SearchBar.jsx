import React from 'react'

const SearchBar = () => {
    const [text, setText] = React.useState(''); // state to store current input value

    const handleChange = (e) => {
        setText(e.target.value); // update state with current input value
    }

  return (
    <div className='searchContainer'>
        <input type="text" placeholder="Search recipes..." 
        value= {text} onChange={handleChange}/>
        <button>Search</button>

        <p>Current input: {text}</p> 

    </div>
  )
}

export default SearchBar