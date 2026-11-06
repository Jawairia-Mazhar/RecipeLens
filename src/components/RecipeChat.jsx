import React, { useState } from 'react'
import send from '../assets/send.png'

const RecipeChat = ({ recipe }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sendMessage = async () => {
    const question = input.trim()
    if (!question || loading) return

    setMessages(prev => [...prev, { role: 'user', text: question }])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          recipe: {
            title: recipe.title,
            ingredients: recipe.extendedIngredients?.map(ingredient => ingredient.name) ?? [],
          },
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'The chat service could not respond. Please try again.')
      }

      setMessages(prev => [...prev, { role: 'ai', text: result.answer }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The chat service could not respond. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

return (
  <div
    id="chat-section"
    className="
      fixed z-50 flex flex-col bg-white border border-black/10 shadow-xl
      inset-x-3 bottom-20 h-[70vh] rounded-3xl p-4
      sm:inset-x-auto sm:right-6 sm:bottom-16 sm:w-[min(90vw,24rem)] sm:h-36 sm:p-5
      lg:w-[40%] lg:max-w-md
    "
  >
    <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
      Ask about this recipe
    </h2>

    <div className="flex flex-col gap-3 mb-4 flex-1 min-h-0 overflow-y-auto pr-1">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[85%] px-3 py-2 rounded-xl text-sm break-words ${
            msg.role === "user"
              ? "bg-gray-100 text-amber-600 self-end"
              : "bg-amber-600 text-white self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}
      {loading && <p className="text-gray-400 text-sm">Thinking...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>

    <div className="flex items-center gap-2 mt-auto bg-amber-700/10 rounded-xl p-1">
      <input
        className="flex-1 min-w-0 rounded-xl bg-white/10 px-3 py-2 text-base sm:text-sm text-black placeholder-gray-400 outline-none"
        placeholder="e.g. Can I replace eggs here?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        aria-label="Send message"
        className="shrink-0 p-2 rounded-full hover:bg-amber-700/10 transition disabled:opacity-50"
      >
        <img src={send} alt="" className="w-5 h-5" />
      </button>
    </div>
  </div>
);
}
export default RecipeChat
