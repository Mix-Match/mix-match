import { getDrinksByLiquor, getInstructionsById } from './controllers/drinksController';
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');

// const apiRouter = require('./routes/api');
// const Item = require('./models/itemModel.js');


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

// Route for fetching to cocktail API, return array of objects with cocktails
app.get('/api/getdrinks/:liquor', getDrinksByLiquor);


// Route for fetching to cocktail API with the cocktail ID, returns recipe and more information on that specific cocktail
app.get('/api/getinstructions/:id', getInstructionsById);



// Catch-all error handler IF WE HAD ONE!


// Global error handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown router error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});