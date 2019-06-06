import React from 'react';
import './GameFixture.scss';
import cityTimezones from 'city-timezones';


const GameFixture = ({gameData, ...props}) => {

  // iso-8601 date format
  console.log("gameData", gameData);
  const weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(gameData.scheduled);
  console.log("yooo", date.toLocaleTimeString());
  const cityLookup = cityTimezones.lookupViaCity(gameData.venue.city_name);
  console.log("cityLookup", cityLookup);
  
  // const localTime =   new Date( date.getTime() + ( date.getTimezoneOffset() * 60000 ) );
  // console.log("localTime", localTime);


  return (
    <div className="GameFixture">
       <div className="game-fixture-team-color-block"></div>
       <div className="game-fixture-time-container">
           <div className="game-fixture-day">
            <span>{weekArray[date.getDay()]}</span>
            <span>{date.getDate()} {monthArray[date.getMonth()]}</span>
           </div>
           <div className="game-fixture-time">
            <span>{date.getHours()}:{date.getMinutes()} Your Time</span>
            <span>19:45 Local Time</span>
           </div>
       </div>
       <div className="game-fixture-playing">
           <span>{gameData.competitors[0].name} v {gameData.competitors[1].name}</span>
           <span>{gameData.venue.city_name}</span>
       </div>
       <div className="game-fixture-sport">
          <div className="game-fixture-sport-container">
           <span>{gameData.sport_event_context.category.name}</span>
           <img src="https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-rugby.png&w=288&h=288&transparent=true" alt="Rugby Ball" />
          </div>
           <span>{gameData.sport_event_context.competition.name}</span>
       </div>
       <div className="game-fixture-team-color-block"></div>
    </div>
  )
}


export default GameFixture;
