import { Request, Response, NextFunction } from 'express';
import { pool } from '../server';
import jwt from 'jsonwebtoken';

const getUserIdFromToken = (req: Request): number | null => {
  const token = req.cookies.token;
  console.log(token);
  // const authorizationHeader = req.headers.authorization;
  if (token) {
    // const token = authorizationHeader?.split(' ')[1];
    const decodedToken = jwt.decode(token) as { userId: number } | null;
    return decodedToken?.userId || null;
  } else {
    return null;
  }
};

// Middleware for fetching to cocktail API, return array of objects with cocktails
export const getDrinksByLiquor = async (req: Request, res: Response, next: NextFunction) => {
  const { liquor } = req.params; // Get the chosen liquor from the request parameters
  console.log("🚀 ~ file: drinksController.ts:8 ~ getDrinksByLiquor ~ liquor:", liquor)
  const url = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAILDB_APIKEY}/filter.php?i=${liquor}`
  
  const payload = {
    method: 'GET'
  }

  try {

    // Make a request to the API using the chosen liquor
    const apiResponse = await fetch(url, payload);
    // const cocktailDB = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAILDB_APIKEY}/list.php?`;
    const data = await apiResponse.json();

    // Process the response and send it back to the frontend
    // const drinks = data.drinks.map((drink: any) => ({
    //   strDrink: drink.strDrink,
    //   strDrinkThumb: drink.strDrinkThumb,
    //   idDrink: drink.idDrink,
    // }));

    // res.json({ drinks });
    res.locals.drinks = data.drinks;
    return next();

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Middleware for fetching to cocktail API with the cocktail ID, returns recipe and more information on that specific cocktail
export const getInstructionsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the cocktail id from the request parameters

    // Make a request to the API using the cocktail id
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAILDB_APIKEY}/lookup.php?i=${id}`
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

//Middleware for user to save cocktail in DB
export const addSavedDrink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, image, drinkid } = req.body;
  console.log(req.body)

  const userId = getUserIdFromToken(req);
  // const { userId } = req.body;

  if (!userId) {
    return res.redirect('/auth/login');
  }

  // TODO: wrap next part in a conditions to check if decodedToken.userId exists:
  // TODO: modularize JWT/userId functionality to use in the delete drink middleware.

  try {
    const checkQuery = `
      SELECT *
      FROM favorites
      WHERE drinkid = $1 AND userid = $2
    `;
    const checkValues = [drinkid, userId];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rowCount > 0) {
      // Drink already exists, do nothing
      return next();
    }

    const values = [name, image, userId, drinkid];
    const text = `
      INSERT INTO
        favorites (name, image, userid, drinkid)
      VALUES
        ($1,$2,$3,$4)
      RETURNING *
    `;

    const result = await pool.query(text, values);
    console.log('INSERTED', result.rows);
    return next();
  } catch (err) {
    return next({
      log: 'drinksController.addSavedDrink: ERROR: Database error',
    });
  }
};

//Middleware for user to remove cocktail from DB

export const deleteSavedDrink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  console.log('file: drinksController.ts:108 | name:', name)

  const userId = getUserIdFromToken(req);
  // const { userId } = req.body;

  if (!userId) {
    return res.redirect('/auth/login');
  }

  const values = [name, userId];
  console.log('file: drinksController.ts:118 | values:', values)

  const text = `
    DELETE FROM favorites
    WHERE name = $1 AND userid = $2 
    `;

  try {
    const result = await pool.query(text, values);
    console.log('DELETED', result.rows);
    return next();
  } catch (err) {
    return next({
      log: 'drinksController.deleteSavedDrink: ERROR: Database error',
    });
  }
};

//Middleware for getting all user favorites from DB

export const getSavedDrinks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserIdFromToken(req);
  // const { userId } = req.body;

  const values = [userId];

  const text = `
    SELECT *
    FROM favorites
    WHERE userid = $1
    `;

  try {
    const result = await pool.query(text, values);
    console.log(result);
    const { rows } = result;
    // res.json(rows);
    return res.status(200).json(rows)
  } catch (err) {
    return next({
      log: `${err} in drinksController.getSavedDrinks: ERROR: Database error`,
    });
  }
};
