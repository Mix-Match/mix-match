import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import DrinkCard from "../components/DrinkCard";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export default function Popular() {
  const formData = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);
  const [cardsData, setCardsData] = useState<Drink[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://www.thecocktaildb.com/api/json/v2/${9973533}/popular.php`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCardsData([]);
        
        setCardsData(data.drinks);

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
    </div>
  );
}