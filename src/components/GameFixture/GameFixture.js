import React, { useContext, useState } from 'react';
import './GameFixture.scss';
import Ratings from '../Ratings/Ratings';
import cityTimezones from 'city-timezones';
import moment from 'moment';
import tz from 'moment-timezone';


import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import {toJS} from 'mobx';




const GameFixture = observer(({gameData, pool, image, matchesView, ...props}) => {
  const [lineupState, changeLineupState] = useState(false);


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

  const matchPassed = moment() > scheduled ? true : false;

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


  const determineStadiumName = () => {

    
    for(let i = 0; i < store.checkStadiumName.length; i++) {
      if (gameData.venue.city_name === store.checkStadiumName[i][0]) {
        return store.checkStadiumName[i][1];
      }
    }



  }
  let gameFixtureClickable;
  store.lineup.sport_event.id === gameData.id ? gameFixtureClickable = {cursor: 'pointer'} : gameFixtureClickable = {};
  // console.log("id", gameData.id, "Game: ", gameData.competitors[0].name, " vs ", gameData.competitors[1].name);

  return (
    <div className="GameFixture" style={gameFixtureClickable}>
      {matchesView &&
        <div onClick={() => changeLineupState(!lineupState)} className="game-fixture-time-container">

        <span>{shortenedWeekday} {scheduled.date()} {store.monthArray[scheduled.month()]}</span>
        <span className="your-time">{userTime} Your Time</span>

       </div>
      
      }
             

       <div className="game-fixture-playing" onClick={() => changeLineupState(!lineupState)} style={matchesView === false ? {height: '100%', marginTop: '1.3rem'} : {}}>
            <img className="country-circle" src={imageUrlArray[0]} alt={gameData.competitors[0].name + " country flag"}/>
            <div className="match-information">
              {!matchesView && matchPassed &&
                <Ratings id={gameData.id} gameData={gameData}/>
              }
              {
                !matchesView && !matchPassed &&
                <div className="space-saver"></div>
              }
              <p className="competitors">{gameData.competitors[0].name} v {gameData.competitors[1].name}</p>
              <span style={determinePoolColour()}>{pool} </span>
              <span>{determineStadiumName()}</span>
              {matchesView &&
                <p>{localTime} Local Time</p>
              }
              {store.lineup.sport_event.id === gameData.id && 
                <p className="lineup-available">Lineups available! Click to show..</p>
              }

            </div>

            <img className="country-circle" src={imageUrlArray[1]} alt={gameData.competitors[1].name + " country flag"}/>
       </div>
       {store.lineup.sport_event.id === gameData.id && lineupState &&
              <div className="lineups-container" >
                <ul>
                  {store.lineup.lineups[0].starting_lineup.map(pos=> {
                    return (
                      <li>{pos.player.jersey_number}. {pos.player.name.split(',').reverse().join(" ")}</li>
                    )
                  })}
                  <br></br>
                   {store.lineup.lineups[0].substitutes.map(pos=> {
                    return (
                      <li>{pos.player.jersey_number}. {pos.player.name.split(',').reverse().join(" ")}</li>
                    )
                  })}
                </ul>
                <ul>
                  {store.lineup.lineups[1].starting_lineup.map(pos=> {
                    return (
                      <li>{pos.player.jersey_number}. {pos.player.name.split(',').reverse().join(" ")}</li>
                    )
                  })}
                  <br></br>
                   {store.lineup.lineups[1].substitutes.map(pos=> {
                    return (
                      <li>{pos.player.jersey_number}. {pos.player.name.split(',').reverse().join(" ")}</li>
                    )
                  })}
                </ul>
              </div>
            }
    </div>
  )
});


export default GameFixture;
