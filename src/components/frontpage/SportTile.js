import React from 'react';
import './SportTile.scss';

const rugbyImage = '/images/mackenzie.jpg';




const SportTile = ({image, sportName, backgroundPosition, link, ...props}) => {
  
  return (
    <div id="SportTile">
      <div className="sport-tile-container">
        <h1>{sportName}</h1>
        <div className="sport-tile-image" style={{backgroundImage: `url(${image})`, backgroundPosition: backgroundPosition}}></div>
      </div>
    </div>
  )
}

export default SportTile;
