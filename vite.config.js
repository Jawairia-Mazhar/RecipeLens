import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handler as chatHandler } from './netlify/functions/chat.js'
import { loadEnv } from 'vite'

const localChatFunction = {
  name: 'local-chat-function',
  configureServer(server) {
    const env = loadEnv(server.config.mode, process.cwd(), '')
    const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY
    if (!process.env.GEMINI_API_KEY && apiKey) {
      process.env.GEMINI_API_KEY = apiKey
    }

    server.middlewares.use('/.netlify/functions/chat', async (request, response) => {
      try {
        const chunks = []
        for await (const chunk of request) chunks.push(chunk)

        const result = await chatHandler({
          httpMethod: request.method,
          body: Buffer.concat(chunks).toString(),
        })

        response.writeHead(result.statusCode, result.headers)
        response.end(result.body)
      } catch (error) {
        server.config.logger.error('Local chat function failed.', { error })
        response.writeHead(500, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: 'The chat service could not respond. Please try again.' }))
      }
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localChatFunction],
})
