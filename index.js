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
const COCKTAIL_API_URL_ALCOHOLIC= 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
const COCKTAIL_API_URL_NON_ALCOHOLIC= 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';

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

// Helper function to fetch filtered cocktails
async function fetchFilteredCocktails(filter) {
  try {
    let apiUrl = COCKTAIL_API_URL;
    
    if (filter === 'alcoholic') {
      apiUrl = COCKTAIL_API_URL_ALCOHOLIC;
    } else if (filter === 'non-alcoholic') {
      apiUrl = COCKTAIL_API_URL_NON_ALCOHOLIC;
    }
    
    const response = await axios.get(apiUrl);
    
    // If it's a filter request, we get a list of cocktails, so pick a random one
    if (filter !== 'random' && response.data.drinks && response.data.drinks.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.data.drinks.length);
      const cocktailId = response.data.drinks[randomIndex].idDrink;
      
      // Fetch full details for the selected cocktail
      const detailResponse = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
      return detailResponse.data.drinks[0];
    }
    
    // For random cocktails, return the first (and only) result
    return response.data.drinks[0];
  } catch (error) {
    console.error('Error fetching filtered cocktail:', error);
    throw error;
  }
}

// Helper function to get cocktail details by ID
async function fetchCocktailById(id) {
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    return response.data.drinks[0];
  } catch (error) {
    console.error('Error fetching cocktail details:', error);
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
    const filter = req.query.filter || 'random';
    const cocktail = await fetchFilteredCocktails(filter);
    const ingredients = formatIngredients(cocktail);
    
    res.render('index', {
      title: 'Sipify - Discover Amazing Cocktails',
      cocktail: cocktail,
      ingredients: ingredients,
      currentFilter: filter
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
    const filter = req.body.filter || 'random';
    const cocktail = await fetchFilteredCocktails(filter);
    const ingredients = formatIngredients(cocktail);
    
    res.render('index', {
      title: 'Sipify - Discover Amazing Cocktails',
      cocktail: cocktail,
      ingredients: ingredients,
      currentFilter: filter
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

// Route for filter change
app.post('/filter-cocktail', async (req, res) => {
  try {
    const filter = req.body.filter || 'random';
    const cocktail = await fetchFilteredCocktails(filter);
    const ingredients = formatIngredients(cocktail);
    
    res.render('index', {
      title: 'Sipify - Discover Amazing Cocktails',
      cocktail: cocktail,
      ingredients: ingredients,
      currentFilter: filter
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