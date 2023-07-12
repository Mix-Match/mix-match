import { response } from 'express';
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface DrinkCardProps {
  name: string;
  imgUrl: string;
  id: string;
}

interface DrinkDetails {
  quantity?: string | number;
  ingredient: string;
}

const DrinkCard: React.FC<DrinkCardProps> = ({ name, imgUrl, id }) => {
  // handleSubmit: send fetch request to backend with drinkId
  const [showModal, setShowModal] = useState(false);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [favorited, setFavorited] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`);
      const data = await response.json();
      const drink = data.drinks[0];
      
      const details: DrinkDetails[] = [];
      // while loop to pull ingredients + quantity
      let ingNum = 1;
      
      while (drink[`strIngredient${ingNum}`]) {
        details.push({
          quantity: drink[`strMeasure${ingNum}`],
          ingredient: drink[`strIngredient${ingNum}`]
        })
        ingNum++
      }

      console.log(data.drinks);
      console.log(details);

      setInstructions(details.map((detail) => drink.strInstructions + 
      detail.quantity + detail.ingredient));

      setShowModal(true);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const favSubmit = async () => {
    const favoriteRoute = favorited ? '/save' : '/delete';
    await fetch(favoriteRoute, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        drinkId: id,
        image: imgUrl
      })
    })
    setFavorited(true);
  }

  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className='card'>  
      <h1>{name}</h1>
      <img src={imgUrl} alt={`${name}`}/>
      <button
      onClick={() => handleSubmit()}
      >Instructions</button>
      <button id='heart' onClick={() => favSubmit()}>
        {favorited ? <FaHeart className='favorite'/> : <FaHeart className='notFavorite'/>}
      </button>

      {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <h2>{name} Instructions</h2>
                  <ul>
                    {instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
    </div>
  )
}

export default DrinkCard;
