import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import DrinkCard from "../components/DrinkCard";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export default function Favorites() {
  const formData = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);
  const [cardsData, setCardsData] = useState<Drink[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `/api/drinks`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCardsData([]);

      //   {
      //     "id": 5,
      //     "name": "Bijou",
      //     "image": "https://www.thecocktaildb.com/images/media/drink/vaukir1606772580.jpg",
      //     "userid": 2,
      //     "drinkid": "17254"
      // }
        
        setCardsData(data.drinks);

        setIsLoading(false);   
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [formData]);

  return (
    <div className="cardDisplay">
      {cardsData.map((drink, index) => (
        <div key={index} className="card">
          <DrinkCard
            name={drink.strDrink}
            imgUrl={drink.strDrinkThumb}
            id={drink.idDrink}
          />
        </div>
      ))}
    </div>
  );
}