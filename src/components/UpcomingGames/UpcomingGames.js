import React, { useContext } from 'react';
import { IconContext } from "react-icons";
import { FaRegQuestionCircle } from 'react-icons/fa';
import GameFixture from '../GameFixture/GameFixture';
import moment from 'moment';
import GameDate from '../GameDate/GameDate';
import Filter from '../Filter/Filter';

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";


import './UpcomingGames.scss';
const UpcomingGames = observer(({numberOfGames, data, matchesView, ...props}) => {
  const store = useContext(StoreContext).AppStore;

  const gamesSortedByDay = [];
  let count = 0;

  //Sort the data by date
  data.forEach(element => {
    let date = `${store.weekArray[moment(element.scheduled).day()]} ${moment(element.scheduled).date()} ${store.monthArray[moment(element.scheduled).month()]}`;
    let pool;
    let image = [];
    
    //If the game has passed, get rid of it.. But give it a couple of hours first..
    const scheduled = moment(element.scheduled).add(4, 'hours');
    if (matchesView && moment() > scheduled) {
      return;
    }


    for (let i = 0; i < store.aPoolOfCountries.length; i++) {
      if (store.aPoolOfCountries[i].country === element.competitors[0].name) {
        if(!pool) pool = `Pool ${store.aPoolOfCountries[i].pool}`;
        image.unshift(store.aPoolOfCountries[i].image);
      }
      if (store.aPoolOfCountries[i].country === element.competitors[1].name) {
        if (!pool) pool = `Pool ${store.aPoolOfCountries[i].pool}`;
        image.push(store.aPoolOfCountries[i].image);
      }
    }
    
    gamesSortedByDay.push({date, element, pool, image});
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
          <GameFixture matchesView={matchesView} gameData={game.element} pool={game.pool} image={game.image} />
        </>
      )
    } else {
      return (
        <GameFixture matchesView={matchesView} gameData={game.element} pool={game.pool} image={game.image}/>
      )
    }
    
  })


  
  let result = gamesSortedByDay.reduce(function(h, obj) {
    h[obj.date] = (h[obj.date] || []).concat(obj);
    return h; 
  }, {});

  
  if (numberOfGames === false) numberOfGames = data.length;

  

  return (
    <div className="UpcomingGames">
        {/* <div className="upcoming-container">
            <p>Upcoming Games...</p>
            <div className="personalize-container">Personalize? <IconContext.Provider value={{className: "info-icon" }}><FaRegQuestionCircle /></IconContext.Provider></div>
        </div> */}
        <div className="UpcomingGames-container">
          <div className="filter-container">
            <Filter />
            {store.filterValue !== '' &&
            <img onClick={store.clearFilterData} id="remove-filter-logo" src="/images/redcross.png" />
            }
          </div>
          {upcomingGames}

        </div>
        
    </div>
  )
});


export default UpcomingGames;
