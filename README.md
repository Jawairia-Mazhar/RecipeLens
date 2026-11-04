🍽️ RecipeLens
Find recipes from what's already in your kitchen.

📸 Screenshots:
<img width="1904" height="912" alt="image" src="https://github.com/user-attachments/assets/1020c06b-0e35-4f13-a4fb-28afb612863c" />

🔍 About
RecipeLens is a recipe discovery web app that lets users search for recipes based on ingredients they already have at home. Built with React.js and powered by the Spoonacular API.

✨ Features
🔎 Ingredient-based search — type ingredients you have, get matching recipes instantly
📄 Recipe detail pages — full instructions, images, and nutritional info
❤️ Favorites — save recipes and persist them across sessions with localStorage
💡 Quick suggestions — one-click ingredient chips for fast discovery
⚡ Loading & error states — production-like UX with feedback at every step
📱 Responsive design — works on desktop and mobile
🔁 Session persistence — search results persist when navigating between pages


🛠️ Tech Stack
TechnologyUsageReact.js UI & component architectureReact RouterMulti-page navigationTailwind CSSStyling & responsive layoutSpoonacular APIRecipe datalocalStorageFavorites persistencesessionStorageSearch result persistenceViteBuild tool

🚀 Getting Started
Prerequisites

Node.js installed
Free Spoonacular API key from spoonacular.com

Installation
bash# Clone the repository
git clone https://github.com/Jawairia-Mazhar/recipelens.git

# Navigate into the project
cd recipelens

# Install dependencies
npm install

# Start the development server
npm run dev
API Key Setup
In src/pages/Home.jsx and src/pages/RecipeDetail.jsx, replace YOUR_API_KEY with your Spoonacular API key:
jsfetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchedText}&apiKey=YOUR_API_KEY`)

⚠️ The free tier allows 150 requests/day. Use mock data during heavy styling sessions to conserve your quota.

Chat API Setup
The recipe chat uses a Netlify Function so the Gemini API key is not exposed in the browser. In your Netlify site settings, add `GEMINI_API_KEY` as an environment variable with access to Functions, then redeploy the site. Do not use a `VITE_` prefix for this secret.


📁 Project Structure
src/
├── assets/          # Images and icons
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   └── RecipeCard.jsx
│   └── RecipeChat.jsx
├── pages/
│   ├── Home.jsx
│   ├── RecipeDetail.jsx
│   └── Favorites.jsx
├── App.jsx
└── main.jsx

🧠 Concepts Practiced

useState, useEffect, useRef hooks
Lifting state up & prop drilling
API calls with fetch and .then()
React Router with dynamic routes & useParams
localStorage vs sessionStorage
Conditional rendering & loading/error states
Component architecture (pages vs components)
Tailwind CSS responsive design & hover effects


🔗 Live Demo
👉 https://recipelens.netlify.app/

👩‍💻 Author
Jawairia Mazhar
GitHub • Email
