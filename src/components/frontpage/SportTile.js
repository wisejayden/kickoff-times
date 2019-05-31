import React from 'react';
import './SportTile.scss';
const rugbyImage = '/images/mackenzie.jpg';




const SportTile = (image, ...props) => {
  console.log(image);
  return (
    <div id="SportTile">
      <div className="sport-tile-container">
        <h1>Rugby</h1>
        <div style={{backgroundImage: 'url(/images/mackenzie.jpg)'}}></div>
      </div>
    </div>
  )
}

export default SportTile;
