import React from 'react';
import './SportTile.scss';
import { Link } from 'react-router-dom'

const SportTile = ({image, sportName, backgroundPosition, link, ...props}) => {
  return (
    <Link to={link}>
      <div id="SportTile">
        <div className="sport-tile-container">
          <h1>{sportName}</h1>
          <div className="sport-tile-image" style={{backgroundImage: `url(${image})`, backgroundPosition: backgroundPosition}}></div>
        </div>
      </div>
    </Link>
  )
}

export default SportTile;
