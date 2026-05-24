import React, { useState } from 'react'
import { GoogleGenAI } from "@google/genai"

const RecipeChat = ({ recipe }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { role: "user", text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

      const prompt = `
        You are a helpful cooking assistant.
        The user is viewing this recipe: "${recipe.title}".
        Ingredients: ${recipe.extendedIngredients?.map(i => i.name).join(", ")}
        Answer this question briefly: ${input}
      `

      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      })

      const aiMsg = { role: "ai", text: result.text }
      setMessages(prev => [...prev, aiMsg])

    } catch (err) {
      setError('Something went wrong. Try again!')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 rounded-3xl border border-white/10 p-5">
      <h2 className="text-xl font-bold text-white mb-4">Ask about this recipe</h2>

      <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 rounded-xl text-sm ${msg.role === "user" ? "bg-orange-500/20 text-white self-end" : "bg-white/10 text-gray-200 self-start"}`}>
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm">Thinking...</p>}
        {error && <p className="text-red-300 text-sm">{error}</p>}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl border border-white/10 bg-white/10 p-2 text-black placeholder-gray-400"
          placeholder="e.g. Can I replace eggs here?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-orange-500 text-white px-4 rounded-xl hover:bg-orange-600">
          Send
        </button>
      </div>
    </div>
  )
}

export default RecipeChat