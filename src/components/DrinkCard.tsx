import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface DrinkCardProps {
  name: string;
  imgUrl: string;
  id: string;
  favorite: boolean;
  updateFavorites?
}


interface DrinkDetails {
  quantity?: string | number;
  ingredients: string;
}

const DrinkCard: React.FC<DrinkCardProps> = ({ name, imgUrl, id, favorite, updateFavorites }) => {
  // handleSubmit: send fetch request to backend with drinkId
  const [showModal, setShowModal] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [favorited, setFavorited] = useState(favorite)

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`);
      const data = await response.json();
      const drink = data.drinks[0];
      
      const details: DrinkDetails[] = [];

      // while loop to pull ingredients + quantity
      let ingNum = 1;
      while (drink[`strIngredient${ingNum}`]) {
        const drinkObj: DrinkDetails = {
          ingredients: drink[`strIngredient${ingNum}`].trim()
        };
        // check if corresponding measurement !== null; if exists, add to obj
        if (drink[`strMeasure${ingNum}`]) drinkObj.quantity = drink[`strMeasure${ingNum}`].trim();
        details.push(drinkObj);
        ingNum++
      }

      setIngredients(details.map((detail) => detail.quantity ? `${detail.quantity} ${detail.ingredients}` : `${detail.ingredients}`));

      // TODO: refactor to account for edge cases: "Dr. Pepper", "Step (num)", (e.g./i.e./etc.) multiple trailing punctuation marks
      const convert: string[] = [];

      //  break instructions out into arr elements
      // fix inconsistent line breaks from returned instructions, inconsistent capitalization, numbering, punctuation
      const test = drink.strInstructions.replace(/(?:\r\n|\r|\n)/g, " ")

      test.split(/\d\./g).join('. ').split(". ").forEach((e: string) => {
        // don't push if string is empty
        if (![...e.matchAll(/\w+/g)].length) return;
        const first = e[0].toUpperCase();
        const last = e[e.length - 1];
        // delete last character if not alpha
        const output = !last.match(/^([a-z\(\)]+)$/i) ? first + e.slice(1, e.length - 1) : first + e.slice(1);
        convert.push(`${output}.`)
      })

      setInstructions(convert);

      setShowModal(!showModal);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const favSubmit = async () => {
    const favoriteMethod = favorite ? 'DELETE' : 'POST';
    await fetch('/drinks', {
      method: favoriteMethod,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        drinkid: id,
        image: imgUrl
      })
    })
    setFavorited(!favorited)
    updateFavorites(id, !favorited)
  }

  // const closeModal = () => {
  //   setShowModal(false);
  // };
  
  return (
    <>  
      <div className='cardheader'>
        <h1 className='cardName'>{name}</h1>
        <button id='heart' onClick={() => favSubmit()}>
          {favorited ? <FaHeart className='favorite heartIcon'/> : <FaHeart className='notFavorite heartIcon'/>}
        </button>
      </div>
      <img src={imgUrl} alt={`${name}`} />
      <button onClick={() => handleSubmit()} className="instructionButton">
        Instructions
        <span className='close'>{showModal ? ' ▲' : '▼' }</span>
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Ingredients:</h3>
            <ul>
              {ingredients.map((ingredients, index) => (<li key={index}>{ingredients}</li>))}
            </ul>
            <br></br>
            <h3>Instructions:</h3>
            <ol>
              {instructions.map((instructions, index) => (<li key={index}>{instructions}</li>))}
            </ol>
          </div>
        </div>
      )}
    </>
  )
}

export default DrinkCard;
