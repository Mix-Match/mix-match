import { Request, Response } from 'express';



// Middleware for fetching to cocktail API, return array of objects with cocktails
export const getDrinksByLiquor = async (req: Request, res: Response) => {
  try {
    const { liquor } = req.params; // Get the chosen liquor from the request parameters

    // Make a request to the API using the chosen liquor
    const apiResponse = await fetch(
      `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAILDB_APIKEY}/filter.php?i=${liquor}`
    );
    // const cocktailDB = `https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAILDB_APIKEY}/list.php?`;
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

// Middleware for user to save cocktail in DB
// export const addSavedDrink = async (req, res, next) => {
//     const obj = req.body;
//     const { application_date, company_name, position_title } = obj;
//     const values = [application_date, company_name, position_title];
//     const text = `
//     INSERT INTO
//       job_apps (application_date, company_name, position_title)
//     VALUES
//       ($1,$2,$3)
//     RETURNING *
//     `;
  
//     try {
//       const result = await db.query(text, values);
//       console.log('INSERTED', result.rows);
//       return next();
//     } catch (err) {
//       return next({
//         log: 'jobAppController.addJobApp: ERROR: Database error',
//       });
//     }
//   };

// Middleware for user to remove cocktail from DB


