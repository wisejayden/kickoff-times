import React from 'react';
import { IconContext } from "react-icons";
import { FaRegQuestionCircle } from 'react-icons/fa';
import GameFixture from '../GameFixture/GameFixture';

import './UpcomingGames.scss';
const UpcomingGames = ({numberOfGames, data, ...props}) => {
 
  if (numberOfGames === false) numberOfGames = data.length;
  
  const upcomingGames = data.slice(0, numberOfGames).map((game, i) => {
    return(
      <GameFixture gameData={game} />
    )
  })
  return (
    <div className="UpcomingGames">
        <div className="upcoming-container">
            <p>Upcoming Games...</p>
            <div className="personalize-container">Personalize? <IconContext.Provider value={{className: "info-icon" }}><FaRegQuestionCircle /></IconContext.Provider></div>
        </div>
       {upcomingGames}
    </div>
  )
}


export default UpcomingGames;
