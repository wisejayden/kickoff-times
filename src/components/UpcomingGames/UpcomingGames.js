import React from 'react';
import { IconContext } from "react-icons";
import { FaRegQuestionCircle } from 'react-icons/fa';
import GameFixture from '../GameFixture/GameFixture';
import moment from 'moment';
import GameDate from '../GameDate/GameDate';


import './UpcomingGames.scss';
const UpcomingGames = ({numberOfGames, data, ...props}) => {

  const weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const gamesSortedByDay = [];
  let count = 0;

  data.forEach(element => {
    let date = `${weekArray[moment(element.scheduled).day()]} ${moment(element.scheduled).date()} ${monthArray[moment(element.scheduled).month()]}`;
    gamesSortedByDay.push({date, element});
  });

  const unique = [...new Set(gamesSortedByDay.map(item => item.date))];


const upcomingGames = gamesSortedByDay.map((game, i) => {
  if (game.date === unique[count]) {
    count ++;
    return (
      <>
        <GameDate date={game.date}/>
        <GameFixture gameData={game.element} />
      </>
    )
  } else {
    return (
      <GameFixture gameData={game.element} />
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
}


export default UpcomingGames;
