import React from 'react'
import SearchBar from '../components/SearchBar'
import RecipeCard from '../components/RecipeCard'
import backgroundImage from '../assets/bg-img.jpg'

const SUGGESTIONS = ['Chickpeas', 'Pasta', 'Oats', 'Lentils', 'Eggs', 'Cheese']

const Home = ({ favorites, addToFav, removeFromFav }) => {
  const [searchedText, setSearchedText] = React.useState('')
  const [recipes, setRecipes] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [shouldFetch, setShouldFetch] = React.useState(false)

  const justSearched = React.useRef(false)
  const recipesRef = React.useRef(null)

  // Restore the last search (text + results) when the page mounts
  React.useEffect(() => {
    const storedText = sessionStorage.getItem('lastSearchText')
    const storedRecipes = sessionStorage.getItem('lastResults')

    if (storedText) setSearchedText(storedText)
    if (storedRecipes) setRecipes(JSON.parse(storedRecipes))
  }, [])

  // Fetch recipes when a search is triggered
  React.useEffect(() => {
    if (!searchedText || !shouldFetch) return
    setLoading(true)

    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchedText}&apiKey=ef8cd867a22541cf8424f6b4c4cd361b`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecipes(data)
          sessionStorage.setItem('lastResults', JSON.stringify(data))
          sessionStorage.setItem('lastSearchText', searchedText)
          setError(null)
        } else {
          setRecipes([])
          setError(data.message || 'No recipes found.')
        }
        setLoading(false)
        setShouldFetch(false)
      })
      .catch(() => {
        setRecipes([])
        setError('Something went wrong. Please try again.')
        setLoading(false)
        setShouldFetch(false)
      })
  }, [searchedText, shouldFetch])

  // Scroll to results after a fresh search
  React.useEffect(() => {
    if (recipes.length > 0 && justSearched.current) {
      justSearched.current = false
      recipesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [recipes])

  const onSearch = (text) => {
    justSearched.current = true
    setSearchedText(text)
    setShouldFetch(true)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-50" />

        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pb-24 pt-32 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-orange-200">
            Cook with what you have
          </p>

          <h1
            className="text-4xl font-semibold leading-tight text-white sm:text-6xl"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Find recipes from what’s already in your{' '}
            <span className="text-orange-300">kitchen</span>.
          </h1>

          <p className="max-w-xl text-base text-white/80 sm:text-lg">
            Type a few ingredients and we’ll suggest dishes you can make tonight.
          </p>

          <div className="w-full max-w-2xl">
            <SearchBar onSearch={onSearch} initialValue={searchedText} />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map(item => (
              <button
                key={item}
                onClick={() => onSearch(item)}
                className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur transition hover:bg-white hover:text-stone-900"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section
        ref={recipesRef}
        id="recipesContainer"
        className="mx-auto max-w-6xl scroll-mt-20 px-6 py-12"
      >
        {(loading || recipes.length > 0) && (
          <h2
            className="mb-8 text-center text-3xl font-semibold text-stone-800"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            {loading ? 'Finding recipes…' : 'Suggested recipes'}
          </h2>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-stone-200" />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-stone-600">{error}</p>
        )}

        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                addToFav={addToFav}
                removeFromFav={removeFromFav}
                favorites={favorites}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home