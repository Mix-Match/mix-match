import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Main() {
  const formData = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://www.thecocktaildb.com/api/json/v2/${9973533}/filter.php?i=${formData.liquor}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCardsData(data.drinks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [formData]);

  return (
    <div>
      {/* {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {cardsData.map((card) => (
            <div key={card.idDrink}>
              <h2>{card.strDrink}</h2>
              <img src={card.strDrinkThumb} alt={card.strDrink} />
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}