import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DrinkCard from "../components/DrinkCard";

interface Drink {
  drinkid: string;
  name: string;
  image: string;
}

export default function Favorites() {
  const formData = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);
  const [cardsData, setCardsData] = useState<Drink[]>([]);
  const [userFavorites, setUserFavorites] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/drinks`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ', data)
        setCardsData(data);
        setUserFavorites(data.map((favorite: Drink) => favorite.drinkid))
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
      {cardsData.map((drink, index) => (
        <div key={index} className="card">
          <DrinkCard
            name={drink.name}
            imgUrl={drink.image}
            id={drink.drinkid}
            favorite={userFavorites.includes(drink.drinkid)}
            updateFavorites={updateFavorites}
          />
        </div>
      ))}
    </div>
  );
}