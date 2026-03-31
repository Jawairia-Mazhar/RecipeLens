import React from 'react'
import SearchBar from '../components/SearchBar'

const Home = () => {
    const [searchedText, setSearchedText] = React.useState(''); // state to store fetched recipes, stores a string
    const [recipes, setRecipes] = React.useState([]);


    React.useEffect(() => { //fetching the API
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchedText}&number=5&apiKey=ef8cd867a22541cf8424f6b4c4cd361b`)
        .then(res => res.json())
        .then(data => setRecipes(data))
    }, [searchedText])

    const onSearch = (text) => {
      setSearchedText(text); // update state with search text
    }

  return (
    <div>
      <p>Home</p>
      <SearchBar onSearch={onSearch} />
      {recipes.map(recipe => (
    <div key={recipe.id}>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
    </div>
))}
    </div>
  )
}

export default Home