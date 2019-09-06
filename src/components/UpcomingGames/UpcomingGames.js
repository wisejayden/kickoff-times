import React, { useContext } from 'react';
import { IconContext } from "react-icons";
import { FaRegQuestionCircle } from 'react-icons/fa';
import GameFixture from '../GameFixture/GameFixture';
import moment from 'moment';
import GameDate from '../GameDate/GameDate';

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";


import './UpcomingGames.scss';
const UpcomingGames = observer(({numberOfGames, data, ...props}) => {
  const store = useContext(StoreContext).AppStore;
  console.log(store.worldCupPools);

  const gamesSortedByDay = [];
  let count = 0;

  //Sort the data by date
  data.forEach(element => {
    let date = `${store.weekArray[moment(element.scheduled).day()]} ${moment(element.scheduled).date()} ${store.monthArray[moment(element.scheduled).month()]}`;
    let pool;
    for (let i = 0; i < store.aPoolOfCountries.length; i++) {
      console.log('YAY');
      if (store.aPoolOfCountries[i].country === element.competitors[0].name) {
        pool = `Pool ${store.aPoolOfCountries[i].pool}`
      }
    }
    
      
    gamesSortedByDay.push({date, element, pool});
  });
  //Pull out the unique dates out of the array
  const unique = [...new Set(gamesSortedByDay.map(item => item.date))];


  const upcomingGames = gamesSortedByDay.map((game, i) => {
    if (game.date === unique[count]) {
      count ++;
      //Add a GameDate component for the first instance of each date.
      return (
        <>
          <GameDate date={game.date}/>
          <GameFixture gameData={game.element} pool={game.pool} />
        </>
      )
    } else {
      return (
        <GameFixture gameData={game.element} pool={game.pool}/>
      )
    }
    
  })


  
  let result = gamesSortedByDay.reduce(function(h, obj) {
    h[obj.date] = (h[obj.date] || []).concat(obj);
    return h; 
  }, {});

  console.log("result", result);

  // var newArray = Object.keys(result).map(function(key) {
  //   return [Number(key), result[key]];
  // });

  // console.log("newArray", newArray);




  // let hello = result.sort((a,b)=>a.element.scheduled.getTime()-b.element.scheduled.getTime());
  // console.log("hello", hello);


  // console.log("result", result);

  
  if (numberOfGames === false) numberOfGames = data.length;

  
  // const upcomingGames = data.slice(0, numberOfGames).map((game, i) => {
  //   return(
  //     <GameFixture gameData={game} />
  //   )
  // });

  return (
    <div className="UpcomingGames">
        <div className="upcoming-container">
            <p>Upcoming Games...</p>
            <div className="personalize-container">Personalize? <IconContext.Provider value={{className: "info-icon" }}><FaRegQuestionCircle /></IconContext.Provider></div>
        </div>
       {upcomingGames}
    </div>
  )
});


export default UpcomingGames;
