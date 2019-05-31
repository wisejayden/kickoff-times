import React from 'react';
import './GameFixture.scss';

const GameFixture = (props) => {
  return (
    <div className="GameFixture">
       <div className="game-fixture-team-color-block"></div>
       <div className="game-fixture-time-container">
           <div className="game-fixture-day">
            <span>Friday</span>
            <span>31 May</span>
           </div>
           <div className="game-fixture-time">
            <span>12:45 Your Time</span>
            <span>19:45 Local Time</span>
           </div>
       </div>
       <div className="game-fixture-playing">
           <span>Waratahs v Rebels</span>
           <span>Melbourne</span>
       </div>
       <div className="game-fixture-sport">
           <span>Rugby</span>
           <span>Super Rugby</span>
       </div>
       <div className="game-fixture-team-color-block"></div>
    </div>
  )
}


export default GameFixture;
