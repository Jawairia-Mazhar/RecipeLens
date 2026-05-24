import React, { useState } from 'react'
import { GoogleGenAI } from "@google/genai"

const RecipeChat = ({ recipe }) => {
  const [messages, setMessages] = useState([]) // store the msg history -user % Ai
  const [input, setInput] = useState('') // store current user input
  const [loading, setLoading] = useState(false) // handles the loading state while Ai responds
  const [error, setError] = useState('') // store any error msgs may occur during the API call

  const sendMessage = async () => { // main function to send user message and get AI response
    //async because API call requires waiting for response, so the other code can continue running without blocking the UI.
    if (!input.trim()) return // prevent sending empty messages, trim removes whitespaces

    const userMsg = { role: "user", text: input } // create a message object for the user's input, role helps to differentiate between user and AI messages in the chat history
    setMessages(prev => [...prev, userMsg]) // add user msgs to chat history
    setInput('') // clear the input field after sending the message
    setLoading(true) // set loading state to true while waiting for AI response
    setError('') // clear any previous errors before making a new API call

    try { // make API call to Google Gemini AI to get a response, try catch block is used to handle any potential errors that may occur during the API call
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY }) // create an instance of the GoogleGenAI client using the API key stored in environment variables for security reasons, so the key is not exposed in the codebase. This allows us to authenticate our requests to the Gemini API and access its features.

      const prompt = ` //todo Ai will follow this format to answer user questions about the recipe:
        You are a helpful cooking assistant.
        The user is viewing this recipe: "${recipe.title}".
        Ingredients: ${recipe.extendedIngredients?.map(i => i.name).join(", ")}
        Answer this question briefly: ${input}
      `

      const result = await ai.models.generateContent({ // we call the generateContent method on the AI client to get a response based on the prompt we created. We specify the model to use (gemini-3.5-flash) and pass the prompt as the content for the AI to generate a response from. The await keyword is used to wait for the API response before proceeding with the rest of the code.
        model: "gemini-3.5-flash",
        contents: prompt,
      })

      const aiMsg = { role: "ai", text: result.text } // create a message object for the AI's response, we can then add this to our chat history so it appears in the UI as a response to the user's question.
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // allows user to press Enter key to send message instead of clicking the button
        />
        <button onClick={sendMessage} className="bg-orange-500 text-white px-4 rounded-xl hover:bg-orange-600">
          Send
        </button>
      </div>
    </div>
  )
}

export default RecipeChat