import React from 'react'

const Home = () => {
    React.useEffect(() => {
        fetch('https://api.spoonacular.com/recipes/findByIngredients?ingredients=eggs,cheese&number=5&apiKey=ef8cd867a22541cf8424f6b4c4cd361b')
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home