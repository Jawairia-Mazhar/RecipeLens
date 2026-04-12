import React from 'react'
import SearchBar from '../components/SearchBar'
import RecipeCard from '../components/RecipeCard'
import backgroundImage from '../assets/bg-img.png'

const Home = ({favorites, addToFav, removeFromFav}) => {
  const [searchedText, setSearchedText] = React.useState(''); // state to store fetched recipes, stores a string
  const [recipes, setRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => { // fetching the API
    if (!searchedText) return;
    setLoading(true); //it sets loading to true after the user has entered a search term, indicating that the app is in the process of fetching data.
      fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchedText}&apiKey=ef8cd867a22541cf8424f6b4c4cd361b`)
      .then(res => res.json())
      .then(data => { 
        setRecipes(data);
        setLoading(false); // ✅ runs only after data arrives
      })
      .catch(err => { //sits at the end of the chain and catches any of those failures — like a safety net. If anything goes wrong above it, .catch() runs instead.
        setError('Something went wrong. Please try again.');
        setLoading(false);        
      });
    }, [searchedText])

    const onSearch = (text) => {
      setSearchedText(text); // update state with search text
    }

    const recipesRef = React.useRef(null); // create a ref to the recipes container
 
    React.useEffect(() => {
      if (recipes.length > 0){
        recipesRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to the recipes container smoothly when new recipes are loaded
      }
    })

  return (
    <>
      <main className='w-full min-h-screen relative flex flex-col items-center gap-4 pt-16 bg-transparent'>
        <img src={backgroundImage} alt="Background"   
          className='w-full h-full object-cover absolute inset-0 -z-10'
          style={{ filter: 'blur(0px)' }}
        />
{/* curved text using svg */}
        <svg viewBox="0 0 900 180" className="w-full max-w-6xl h-60">
          <defs>
            <path id="curve" d="M 20 120 Q 450 20 880 120" fill="transparent" />
          </defs>

          <text fontSize="32" className="fill-white font-bold">
            <textPath href="#curve" startOffset="50%" textAnchor="middle" lengthAdjust="spacingAndGlyphs">
              Find Recipes from What’s Already in Your Kitchen.
            </textPath>
          </text>
        </svg>

        <SearchBar onSearch={onSearch} className="w-full p-10"/>
      </main>
    {loading ? <p>Loading...</p> :  
      <div className='flex flex-wrap gap-4' id = "recipesContainer" ref={recipesRef}> {/* Assign the ref to the container */}
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} addToFav={addToFav} removeFromFav={removeFromFav} favorites={favorites}/> //maps over recipes and renders a RecipeCard for each recipe, passing the recipe data as a prop
        ))}
      </div>
    }
      {error && <p>{error}</p>} {/*  If error is not null, show it. */}
    </>
  )
}

export default Home