import React from 'react'
import SearchIcon from '../assets/searchIcon.png'

const SearchBar = ({ onSearch, initialValue = '', className = '' }) => {
  const [text, setText] = React.useState(initialValue)

  // Keep the input in sync when the parent restores a previous search
  React.useEffect(() => {
    setText(initialValue)
  }, [initialValue])

  const submit = () => {
    const query = text.trim()
    if (!query) return // ignore empty or whitespace-only searches
    onSearch(query)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <form
      role="search"
      onSubmit={(e) => { e.preventDefault(); submit() }}
      className={`flex w-full items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-lg ring-1 ring-black/5 transition focus-within:ring-2 focus-within:ring-orange-400 ${className}`}
    >
      <label htmlFor="recipe-search" className="sr-only">
        Search recipes by ingredients
      </label>
      <input
        id="recipe-search"
        type="search"
        placeholder="Try “chickpeas, tomato, onion”"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent py-2 text-base text-stone-800 placeholder:text-stone-400 outline-none"
      />
      <button
        type="submit"
        className="flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
        disabled={!text.trim()}
      >
        <img src={SearchIcon} alt="" className="h-4 w-4 brightness-0 invert" />
        Search
      </button>
    </form>
  )
}

export default SearchBar