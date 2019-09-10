import React, { useContext } from 'react';
import './GameFixture.scss';
import cityTimezones from 'city-timezones';
import moment from 'moment';
import tz from 'moment-timezone';

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";




const GameFixture = observer(({gameData, pool, image, ...props}) => {
  // console.log(gameData, pool, image);
  const store = useContext(StoreContext).AppStore;

  // iso-8601 date format
  // console.log("gameData", gameData);
  const scheduled = moment(gameData.scheduled);

  //const userTimeIn12HourTime = scheduled.format('h:mm a')
  const userTime = scheduled.format('H:mm');

  //Need to find a better solution in case the city is not found. Large country may screw with the timezone.
  const cityLookup = cityTimezones.lookupViaCity(gameData.venue.city_name).length > 0 ? cityTimezones.lookupViaCity(gameData.venue.city_name)[0] : cityTimezones.findFromCityStateProvince(gameData.venue.country_name)[0];
  const localTime = scheduled.tz(cityLookup.timezone).format('H:mm');

  const shortenedWeekday = store.weekArray[scheduled.day()].substring(0,3);
  const imageUrlArray = [`/images/country/${image[0]}`, `/images/country/${image[1]}`]

  const determinePoolColour = () => {
    if(pool === "Pool A") {
      return {color: '#4F817F'};
    }
    if(pool === "Pool B") {
      return {color: '#EB6E52'};
    }
    if(pool === "Pool C") {
      return {color: '#76C6FB'};
    }
    if(pool === "Pool D") {
      return {color: '#984363'};
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
            <img className="country-circle" src={imageUrlArray[0]} />
            <div>
              <p>{gameData.competitors[0].name} v {gameData.competitors[1].name}</p>
              <span style={determinePoolColour()}>{pool} </span>
              <span>{gameData.venue.city_name}</span>
              <p>{localTime} Local Time</p>
            </div>
            <img className="country-circle" src={imageUrlArray[1]} />
          

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
