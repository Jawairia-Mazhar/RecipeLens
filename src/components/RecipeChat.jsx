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
      className="w-[40%] flex flex-col h-96 rounded-3xl border border-black/10 p-5 bg-white fixed bottom-16 right-6 z-50 mt-20"
      id="chat-section"
    >
      <h2 className="text-xl font-bold text-black mb-4">Ask about this recipe</h2>

      <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-gray-100 text-amber-600 self-end' : 'bg-amber-600 text-white self-start'}`}>
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm">Thinking...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="flex gap-2 mt-auto bg-amber-700/10 rounded-xl">
        <input
          className="flex-1 rounded-xl bg-white/10 p-2 text-black placeholder-gray-400 outline-none"
          placeholder="e.g. Can I replace eggs here?"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading} className="p-2 rounded-4xl disabled:opacity-50">
          <img src={send} alt="Send" className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default RecipeChat
