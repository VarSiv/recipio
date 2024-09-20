const axios = require('axios');
require('dotenv').config();  // Load environment variables
const fs = require('fs');

try {
  const envContents = fs.readFileSync('.env', 'utf8');
  console.log('Contents of .env file:', envContents);
} catch (error) {
  console.error('Error reading .env file:', error);
}
// console.log('Loaded environment variables');
// console.log('Process env:', process.env);
// const app_id = process.env.APP_ID;
// const app_key = process.env.APP_KEY;
// console.log('APP_ID:', process.env.APP_ID);
// console.log('APP_KEY:', process.env.APP_KEY);

// console.log(app_id, app_key);
// Function to get recipes by dietary restrictions
async function getRecipesByDiet(restrictions) {
  
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
  // Join the restrictions array into a single string
  const healthQuery = restrictions.join(',');

  // Make the HTTP request to the Edamam API
  try {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&health=${healthQuery}`
    );
    
    // Extract relevant data from the response
    const recipes = response.data.hits.map((hit) => {
      return {
        title: hit.recipe.label,      // Recipe title
        image: hit.recipe.image,      // Cover image URL
      };
    });

    return recipes; // Return the array of recipe objects

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; // Return an empty array if there's an error
  }
}

// Example usage
const restrictions = ['vegan', 'gluten-free'];
getRecipesByDiet(restrictions).then((recipes) => {
  console.log(recipes); // Display the recipes with title and image in the console
});
