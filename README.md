# 🍸 Sipify - Random Cocktail Generator

A beautiful and interactive web application that helps you discover amazing cocktails from around the world. Built with Node.js, Express, and powered by TheCocktailDB API.

## ✨ Features

- 🎲 **Random Cocktail Discovery** - Get a surprise cocktail with every click
- 🍺 **Smart Filtering** - Filter by alcoholic or non-alcoholic drinks
- 📱 **Responsive Design** - Perfect experience on all devices
- 🖼️ **Beautiful Images** - High-quality cocktail photos
- 📝 **Detailed Recipes** - Complete ingredient lists and instructions
- 🥃 **Glass Information** - Know the perfect glass for each cocktail
- ⚡ **Fast Loading** - Optimized performance with smooth animations

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript Templates)
- **Styling:** CSS3 with modern gradients and animations
- **API:** TheCocktailDB API
- **HTTP Client:** Axios
- **Package Manager:** npm

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A modern web browser

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/RiteshKrChauhan/Sipify.git
   cd Sipify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:3000` to see the application in action!

## 📁 Project Structure

```
Sipify/
├── 📄 index.js              # Main server file
├── 📄 package.json          # Project dependencies and scripts
├── 📁 public/               # Static files
│   └── 📁 styles/
│       └── 📄 style.css     # Main stylesheet
├── 📁 views/                # EJS templates
│   ├── 📄 index.ejs         # Home page template
│   └── 📄 error.ejs         # Error page template
└── 📄 README.md             # Project documentation
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page with random cocktail |
| POST | `/new-cocktail` | Get another cocktail with current filter |
| POST | `/filter-cocktail` | Filter cocktails by type |

## 🔗 External APIs

This project uses [TheCocktailDB API](https://www.thecocktaildb.com/api.php):

- **Random Cocktail:** `https://www.thecocktaildb.com/api/json/v1/1/random.php`
- **Alcoholic Cocktails:** `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
- **Non-Alcoholic Cocktails:** `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
- **Cocktail Details:** `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id}`

## 🎨 Key Features Explained

### Filter System
- **Random:** Displays any cocktail from the database
- **Alcoholic:** Shows only cocktails containing alcohol
- **Non-Alcoholic:** Shows only mocktails and virgin drinks

### Smart Cocktail Selection
The application intelligently handles different API responses:
- For filtered results, it randomly selects from the returned list
- Fetches complete cocktail details including ingredients and instructions
- Maintains filter state across interactions

### Responsive Design
- Mobile-first approach with breakpoints at 768px and 480px
- Adaptive grid layout for cocktail cards
- Touch-friendly interface elements

---

<div align="center">
  <p>🍸 **Happy Mixing!** 🍸</p>
  <p>© 2025 Sipify. All rights reserved.</p>
</div>

---