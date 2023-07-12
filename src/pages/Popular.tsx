import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
  const [userFavorites, setUserFavorites] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);

    fetch("/drinks", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ', data)
        setUserFavorites(data.map((favorite) => favorite.drinkid)) })
      .catch((error) => {
        console.error("Error:", error)
      });

    fetch(`https://www.thecocktaildb.com/api/json/v2/${9973533}/popular.php`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setCardsData(data.drinks || []);
        setIsLoading(false);   
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [formData]);

  const updateFavorites = (drinkid: string, isFavorite: boolean) => {
    setUserFavorites((prevFavorites) => {
      if (isFavorite) return [...prevFavorites, drinkid];
      else return prevFavorites.filter((id) => id !== drinkid);
    });
  };

  return (
    <div className="cardDisplay">
      {!isLoading && cardsData.length > 0 ? (
        cardsData.map((drink, index) => (
          <div key={index} className="card">
            <DrinkCard
              name={drink.strDrink}
              imgUrl={drink.strDrinkThumb}
              id={drink.idDrink}
              favorite={userFavorites.includes(drink.idDrink)}
              updateFavorites={updateFavorites}
            />
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}