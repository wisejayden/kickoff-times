import React, { useContext } from 'react';
import './GameFixture.scss';
import cityTimezones from 'city-timezones';
import moment from 'moment';
import tz from 'moment-timezone';

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";




const GameFixture = observer(({gameData, pool,...props}) => {
  const store = useContext(StoreContext).AppStore;

  // iso-8601 date format
  // console.log("gameData", gameData);
  const scheduled = moment(gameData.scheduled);

  //const userTimeIn12HourTime = scheduled.format('h:mm a')
  const userTime = scheduled.format('H:mm');

  //Need to find a better solution in case the city is not found. Large country may screw with the timezone.
  const cityLookup = cityTimezones.lookupViaCity(gameData.venue.city_name).length > 0 ? cityTimezones.lookupViaCity(gameData.venue.city_name)[0] : cityTimezones.findFromCityStateProvince(gameData.venue.country_name)[0];
  const localTime = scheduled.tz(cityLookup.timezone).format('H:mm');



  console.log("HELLLO", pool);
  return (
    <div className="GameFixture">
      
       <div className="game-fixture-team-color-block"></div>
       <div className="game-fixture-time-container">
       <span>{store.weekArray[scheduled.day()]} {scheduled.date()} {store.monthArray[scheduled.month()]}</span>

           {/*div className="game-fixture-day">
            <span>{scheduled.date()} {monthArray[scheduled.month()]}</span>
           </div>
  */}
           <div className="game-fixture-time">
            
            <span>{localTime} Local Time</span>
            <span>{pool}</span>
           </div>
       </div>
       <div className="game-fixture-playing">
           <span>{gameData.competitors[0].name} v {gameData.competitors[1].name}</span>
           <span>{gameData.venue.city_name}</span>
       </div>
       <div className="game-fixture-sport">
          <div className="game-fixture-sport-container">
          <span>{userTime} Your Time</span>
           <img src="https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-rugby.png&w=288&h=288&transparent=true" alt="Rugby Ball" />
          </div>
           <span>{gameData.sport_event_context.competition.name}</span>
       </div>
       <div className="game-fixture-team-color-block"></div>
    </div>
  )
});


export default GameFixture;
