/* ------------------------- import required modules ------------------------ */

import express from 'express';
import {
  getDrinksByLiquor,
  getInstructionsById,
} from '../controllers/drinksController';

const router = express.Router();

// Route for fetching to cocktail API, return array of objects with cocktails
router.get('/api/getdrinks/:liquor', getDrinksByLiquor);

// Route for fetching to cocktail API with the cocktail ID, returns recipe and more information on that specific cocktail
router.get('/api/getinstructions/:id', getInstructionsById);

// Route for user to save cocktail in DB
// router.post('/save/:id', drinksController.addSavedDrink, (req, res) =>
//   res.status(200).json({})
// );

// Route for user to remove cocktail from DB
// router.delete('/delete/:id', drinksController.deleteSavedDrink, (req, res) =>
//   res.status(200).json({})
// );

// Route for user signup, session authentication

// Route for user login, session authentication

export default router;
