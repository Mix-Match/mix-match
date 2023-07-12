import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import DrinkCard from "../components/DrinkCard";

// WIP; logic to help generate 10 random drinks
// const randomTen = (r: number, c: number): number[] => {
//   let nums = new Set();
//   while (nums.size < c) {
//     nums.add(Math.floor(Math.random() * (r - 1 + 1) + 1));
//   }
//   return [...nums];
// }

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export default function Main() {
  const formData = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);
  const [cardsData, setCardsData] = useState<Drink[]>([]);
  // pointer to load next 10 drinks
  // const pointer = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://www.thecocktaildb.com/api/json/v2/${9973533}/filter.php?i=${formData.liquor}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCardsData([]);
        
        // // console.log(data.drinks)
        // // pointer.current = pointer.current += 10;

        // // logic to generate 10 random numbers between 0 and data.drinks.length - 1
        // const randomDrinks = [];
        // const arr = randomTen(data.drinks.length - 1, 10);
        // arr.forEach((e) => randomDrinks.push(data.drinks[e]));

        // setCardsData(randomDrinks)

        // temp: return first 10 results
        // const testDrinks = data.drinks.slice(0, 10);
        const testDrinks = data.drinks
        setCardsData(testDrinks);


        // setCardsData(data.drinks);
        setIsLoading(false);
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [formData]);

  return (
    <div className="cardDisplay">
      <div className="card">
          {cardsData.map((drink, index) => (
            <DrinkCard
              key={index}
              name={drink.strDrink}
              imgUrl={drink.strDrinkThumb}
              id={drink.idDrink}
            />
          ))}
        </div>
      {/* {formData.liquor ? (
        <div>Input a liquor to see Results</div>
      ) : (
        <div className="card">
          {cardsData.map((drink, index) => (
            <DrinkCard
              key={index}
              name={drink.strDrink}
              imgUrl={drink.strDrinkThumb}
              id={drink.idDrink}
            />
          ))}
        </div>
      )} */}
    </div>
  );
}