🍽️ RecipeLens
Find recipes from what's already in your kitchen.

📸 Screenshots:
<img width="1515" height="732" alt="image" src="https://github.com/user-attachments/assets/6db595c8-c776-48c9-b4e1-f95cb0c5f98e" />
<img width="1528" height="731" alt="image" src="https://github.com/user-attachments/assets/432de38f-bb33-4996-b578-b2b102ac84a5" />
<img width="1525" height="730" alt="image" src="https://github.com/user-attachments/assets/39d215c6-0757-40a3-ac5b-2d87e229c93d" />

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
