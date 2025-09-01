import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// TheCocktailDB API endpoint for random cocktails
const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

// Helper function to fetch random cocktail
async function fetchRandomCocktail() {
  try {
    const response = await axios.get(COCKTAIL_API_URL);
    return response.data.drinks[0];
  } catch (error) {
    console.error('Error fetching cocktail:', error);
    throw error;
  }
}

// Helper function to format ingredients and measurements
function formatIngredients(cocktail) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measurement = cocktail[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measurement: measurement ? measurement.trim() : ''
      });
    }
  }
  return ingredients;
}

// Routes
app.get('/', async (req, res) => {
  try {
    const cocktail = await fetchRandomCocktail();
    const ingredients = formatIngredients(cocktail);
    
    res.render('index', {
      title: 'Sipify - Discover Amazing Cocktails',
      cocktail: cocktail,
      ingredients: ingredients
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('error', {
      title: 'Sipify - Error',
      error: 'Failed to fetch cocktail. Please try again.',
      message: 'Unable to connect to the cocktail database.'
    });
  }
});

// Route for getting a new random cocktail
app.post('/new-cocktail', async (req, res) => {
  try {
    const cocktail = await fetchRandomCocktail();
    const ingredients = formatIngredients(cocktail);
    
    res.render('index', {
      title: 'Sipify - Discover Amazing Cocktails',
      cocktail: cocktail,
      ingredients: ingredients
    });
  } catch (error) {
    console.error('Error:', error);
    res.render('error', {
      title: 'Sipify - Error',
      error: 'Failed to fetch cocktail. Please try again.',
      message: 'Unable to connect to the cocktail database.'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Sipify - Page Not Found',
    error: '404 - Page Not Found',
    message: 'The page you are looking for does not exist.'
  });
});

app.listen(port, () => {
  console.log(`Sipify is running on http://localhost:${port}`);
});