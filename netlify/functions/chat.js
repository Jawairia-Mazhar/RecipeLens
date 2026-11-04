import { GoogleGenAI } from '@google/genai'

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed.' })
  }

  let request
  try {
    request = JSON.parse(event.body || '')
  } catch {
    return jsonResponse(400, { error: 'Invalid request.' })
  }

  if (!request || typeof request !== 'object' || Array.isArray(request)) {
    return jsonResponse(400, { error: 'Invalid request.' })
  }

  const question = typeof request.question === 'string' ? request.question.trim() : ''
  const title = typeof request.recipe?.title === 'string' ? request.recipe.title.trim() : ''
  const ingredients = Array.isArray(request.recipe?.ingredients)
    ? request.recipe.ingredients.filter(ingredient => typeof ingredient === 'string').slice(0, 100)
    : []

  if (!question || question.length > 2000 || !title || title.length > 300) {
    return jsonResponse(400, { error: 'Enter a question about this recipe.' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured for the chat function.')
    return jsonResponse(503, { error: 'Chat is not configured yet. Please try again later.' })
  }

  const prompt = `You are a helpful cooking assistant. The user is viewing the recipe "${title}".
Ingredients: ${ingredients.join(', ') || 'Not provided'}
Answer this question briefly: ${question}`

  try {
    const ai = new GoogleGenAI({ apiKey })
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })
    const answer = result.text?.trim()

    if (!answer) {
      console.error('Gemini returned an empty chat response.')
      return jsonResponse(502, { error: 'The chat service returned an empty response. Please try again.' })
    }

    return jsonResponse(200, { answer })
  } catch (error) {
    console.error('Gemini chat request failed:', error)
    return jsonResponse(502, { error: 'The chat service could not respond. Please try again.' })
  }
}
