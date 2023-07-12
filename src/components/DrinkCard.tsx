import React from 'react';

interface DrinkCardProps {
  name: string;
  imgUrl: string;
  id: string;
}

const DrinkCard: React.FC<DrinkCardProps> = () => {

  return (
    <div className='card'>  
      {/* <h1>{this.props.name}</h1>
      <img url={this.props.imgURl}/> */}
    </div>

  )
}

export default DrinkCard;
