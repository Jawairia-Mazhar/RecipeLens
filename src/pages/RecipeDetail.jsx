import React from 'react'
import { useParams } from 'react-router-dom'
import EmptyFav from '../assets/favorite.png'
import FilledFav from '../assets/filled_heart.png'
import RecipeChat from '../components/RecipeChat'
import ChatBot from '../assets/chat-bot.png'

const RecipeDetail = ({ favorites, addToFav, removeFromFav }) => {
  const { id } = useParams()
  const [recipe, setRecipe] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [showChatBot, setShowChatBot] = React.useState(false)

  React.useEffect(() => {
    let ignore = false // prevents a slow response from overwriting a newer recipe
    setLoading(true)
    setError(null)

    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=ef8cd867a22541cf8424f6b4c4cd361b`)
      .then(res => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (!ignore) setRecipe(data)
      })
      .catch(() => {
        if (!ignore) setError('Something went wrong. Please try again.')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => { ignore = true }
  }, [id])

  const isFavorite = recipe ? favorites.some(fav => fav.id === recipe.id) : false

  const toggleFavorite = () => {
    if (isFavorite) removeFromFav(recipe.id)
    else addToFav(recipe)
  }

  if (loading) {
    return (
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 pt-28 md:grid-cols-2">
        <div className="aspect-[4/3] animate-pulse rounded-3xl bg-stone-200" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded bg-stone-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-stone-200" />
          <div className="h-64 animate-pulse rounded-3xl bg-stone-200" />
        </div>
      </div>
    )
  }

  if (error) {
    return <p className="mx-auto max-w-6xl px-6 pt-28 text-center text-stone-600">{error}</p>
  }

  if (!recipe) return null

  return (
    <div className="min-h-screen bg-stone-50">
      <article className="mx-auto grid max-w-6xl gap-10 px-6 pb-28 pt-28 md:grid-cols-2 md:items-start">

        {/* Left: photo stays in view while scrolling */}
        <div className="md:sticky md:top-28">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>

        {/* Right: the recipe itself */}
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-md sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1
                className="text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                {recipe.title}
              </h1>
              {(recipe.readyInMinutes || recipe.servings) && (
                <p className="text-sm text-stone-500">
                  {recipe.readyInMinutes && `${recipe.readyInMinutes} min`}
                  {recipe.readyInMinutes && recipe.servings && ' · '}
                  {recipe.servings && `${recipe.servings} servings`}
                </p>
              )}
            </div>

            <button
              onClick={toggleFavorite}
              aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-50 transition hover:scale-110 hover:bg-orange-50"
            >
              <img
                src={isFavorite ? FilledFav : EmptyFav}
                alt=""
                className="h-6 w-6"
              />
            </button>
          </div>

          <div className="border-t border-stone-200 pt-6">
            <h2
              className="mb-4 text-xl font-semibold text-stone-800"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              Method
            </h2>
            {recipe.instructions ? (
              <div
                className="space-y-3 text-base leading-7 text-stone-700 [&_li]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            ) : (
              <p className="text-stone-500">No instructions available yet.</p>
            )}
          </div>
        </div>
      </article>

      {/* Chatbot toggle, now a labeled pill so it's clear what it does */}
      <button
        onClick={() => setShowChatBot(prev => !prev)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-stone-900 py-2 pl-2 pr-4 text-sm text-white shadow-lg transition hover:bg-stone-800"
      >
        <img src={ChatBot} alt="" className="h-8 w-8 rounded-full bg-white p-1" />
        Ask about this recipe
      </button>

      {showChatBot && <RecipeChat recipe={recipe} />}
    </div>
  )
}

export default RecipeDetail