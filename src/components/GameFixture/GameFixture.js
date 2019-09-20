import React, { useContext } from 'react';
import './GameFixture.scss';
import cityTimezones from 'city-timezones';
import moment from 'moment';
import tz from 'moment-timezone';

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";




const GameFixture = observer(({gameData, pool, image, ...props}) => {
  const store = useContext(StoreContext).AppStore;

  // iso-8601 date format
  const scheduled = moment(gameData.scheduled);

  //const userTimeIn12HourTime = scheduled.format('h:mm a')
  const userTime = scheduled.format('HH:mm');

  //Need to find a better solution in case the city is not found. Large country may screw with the timezone.
  const cityLookup = cityTimezones.lookupViaCity(gameData.venue.city_name).length > 0 ? cityTimezones.lookupViaCity(gameData.venue.city_name)[0] : cityTimezones.findFromCityStateProvince(gameData.venue.country_name)[0];
  const localTime = scheduled.tz(cityLookup.timezone).format('HH:mm');

  const shortenedWeekday = store.weekArray[scheduled.day()].substring(0,3);
  const imageUrlArray = [`/images/country/${image[0]}`, `/images/country/${image[1]}`]

  const determinePoolColour = () => {
    if(pool === "Pool A") {
      return {color: '#54c8e8', fontWeight: "bold"};
    }
    if(pool === "Pool B") {
      return {color: '#f4436c', fontWeight: "bold"};
    }
    if(pool === "Pool C") {
      return {color: '#2ed9c3', fontWeight: "bold"};
    }
    if(pool === "Pool D") {
      return {color: '#993dbb', fontWeight: "bold"};
    }
  }


  const determineSatdiumName = () => {

    
    for(let i = 0; i < store.checkStadiumName.length; i++) {
      if (gameData.venue.city_name === store.checkStadiumName[i][0]) {
        return store.checkStadiumName[i][1];
      }
    }



  }



  return (
    <div className="GameFixture">
      
       {/* <div className="game-fixture-team-color-block"></div> */}
       <div className="game-fixture-time-container">
        <span>{shortenedWeekday} {scheduled.date()} {store.monthArray[scheduled.month()]}</span>

           {/*div className="game-fixture-day">
            <span>{scheduled.date()} {monthArray[scheduled.month()]}</span>
           </div>
  */}
        <span className="your-time">{userTime} Your Time</span>

       </div>

       <div className="game-fixture-playing">
            <img className="country-circle" src={imageUrlArray[0]} alt={gameData.competitors[0].name + " country flag"}/>
            <div className="match-information">
              <p>{gameData.competitors[0].name} v {gameData.competitors[1].name}</p>
              <span style={determinePoolColour()}>{pool} </span>
              <span>{determineSatdiumName()}</span>
              <p>{localTime} Local Time</p>
            </div>
            <img className="country-circle" src={imageUrlArray[1]} alt={gameData.competitors[1].name + " country flag"}/>
          

       </div>
       {/* <div className="game-fixture-sport">
          <div className="game-fixture-sport-container">
           <img src="https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-rugby.png&w=288&h=288&transparent=true" alt="Rugby Ball" />
          </div>
           <span>{gameData.sport_event_context.competition.name}</span>
       </div> */}
       {/* <div className="game-fixture-team-color-block"></div> */}
    </div>
  )
});


export default GameFixture;
