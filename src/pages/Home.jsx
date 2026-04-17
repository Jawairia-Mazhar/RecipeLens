import React from 'react'
import SearchBar from '../components/SearchBar'
import RecipeCard from '../components/RecipeCard'
import backgroundImage from '../assets/bg-img.png'

const Home = ({favorites, addToFav, removeFromFav}) => {
  const [searchedText, setSearchedText] = React.useState('');
  const [recipes, setRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [shouldFetch, setShouldFetch] = React.useState(false);

  React.useEffect(() => {
    const storedText = localStorage.getItem('lastSearchText');
    const storedRecipes = localStorage.getItem('lastResults');

    if (storedText && storedRecipes) {
      setSearchedText(storedText);
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  React.useEffect(() => {
    if (!searchedText || !shouldFetch) return;
    setLoading(true);
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchedText}&apiKey=ef8cd867a22541cf8424f6b4c4cd361b`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecipes(data);
          localStorage.setItem('lastResults', JSON.stringify(data));
          localStorage.setItem('lastSearchText', searchedText);
          setError(null);
        } else {
          setRecipes([]);
          setError(data.message || 'No recipes found.');
        }
        setLoading(false);
        setShouldFetch(false);
      })
      .catch(err => {
        setRecipes([]);
        setError('Something went wrong. Please try again.');
        setLoading(false);        
        setShouldFetch(false);
      });
    }, [searchedText, shouldFetch])

    const onSearch = (text) => {
      setSearchedText(text);
      setShouldFetch(true);
    }

    const recipesRef = React.useRef(null); // create a ref to the recipes container
 
    React.useEffect(() => {
      if (recipes.length > 0){
        recipesRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to the recipes container smoothly when new recipes are loaded
      }
    })
    
    const suggestions = ['Chickpeas', 'Pasta', 'Oats', 'Lentils', 'Eggs', 'Cheese']

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
{/* suggested search buttons */}
        <div className='flex flex-wrap gap-2 justify-center'>
          {suggestions.map(item => (
            <button 
              key={item}
              onClick={() => onSearch(item)}
              className='bg-white bg-opacity-80 text-gray-800 px-4 py-1 rounded-full text-sm hover:bg-opacity-100 transition'>
              {item}
            </button>
          ))}
        </div>

        <SearchBar onSearch={onSearch} initialValue={searchedText} className="w-full"/>
      </main>
    {loading ? <p>Loading...</p> :  
      <div className='flex flex-wrap gap-4 w-full justify-center py-8' id = "recipesContainer" ref={recipesRef}> {/* Assign the ref to the container */}
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