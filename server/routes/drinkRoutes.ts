/* ------------------------- import required modules ------------------------ */

import express from 'express';
// import {
//   getDrinksByLiquor,
//   getInstructionsById,
// } from '../controllers/drinksController';
import {
  addSavedDrink,
  deleteSavedDrink,
  getSavedDrinks,
} from '../controllers/drinksController';

const router = express.Router();

// Route for fetching to cocktail API, return array of objects with cocktails
//router.get('/api/getdrinks/:liquor', getDrinksByLiquor);

// Route for fetching to cocktail API with the cocktail ID, returns recipe and more information on that specific cocktail
//router.get('/api/getinstructions/:id', getInstructionsById);

// Route for user to save cocktail in DB
router.post('/', addSavedDrink, (req, res) => res.status(200).send('cocktail added to favorites'));

// Route for user to delete cocktail from DB
router.delete('/', deleteSavedDrink, (req, res) => res.status(200).json({}));

// Route for getting drinks from database
router.get('/', getSavedDrinks, (req, res) => res.status(200).json({}));

export default router;
