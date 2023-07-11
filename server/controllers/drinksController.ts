import { Request, Response } from 'express';
//import fetch from 'node-fetch';

export const getDrinksByLiquor = async (req: Request, res: Response) => {
  try {
    const { liquor } = req.params; // Get the chosen liquor from the request parameters

    // Make a request to the API using the chosen liquor
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${liquor}`
    );
    const data = await apiResponse.json();

    // Process the response and send it back to the frontend
    const drinks = data.drinks.map((drink: any) => ({
      strDrink: drink.strDrink,
      strDrinkThumb: drink.strDrinkThumb,
      idDrink: drink.idDrink,
    }));

    res.json({ drinks });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getInstructionsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the cocktail id from the request parameters

    // Make a request to the API using the cocktail id
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await apiResponse.json();

    // Extract the instructions from the response
    const instructions = data.drinks[0].strInstructions;

    res.json({ instructions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// export default getDrinksByLiquor;
