import React from 'react';
import './SportTile.scss';

const rugbyImage = '/images/rugby.jpg';

const SportTile = () => {
  return (
    <div id="SportTile">
      <div className="sport-tile-container">
        <h1>Rugby</h1>
        <img src={rugbyImage} />
      </div>
    </div>
  )
}

export default SportTile;
