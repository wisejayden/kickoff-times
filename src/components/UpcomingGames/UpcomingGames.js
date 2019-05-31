import React from 'react';
import { IconContext } from "react-icons";
import { FaRegQuestionCircle } from 'react-icons/fa';
import GameFixture from '../GameFixture/GameFixture';

import './UpcomingGames.scss';
const UpcomingGames = () => {
  return (
    <div className="UpcomingGames">
        <div className="upcoming-container">
            <p>Upcoming Games...</p>
            <div className="personalize-container">Personalize? <IconContext.Provider value={{className: "info-icon" }}><FaRegQuestionCircle /></IconContext.Provider></div>
        </div>
        <GameFixture />
        <GameFixture />
        <GameFixture />
    </div>
  )
}


export default UpcomingGames;
