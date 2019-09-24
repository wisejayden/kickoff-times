import React, { useState, useEffect, useContext } from 'react';
import './Ratings.scss';
import axios from 'axios';
import {toJS } from 'mobx';
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import { Socket } from 'dgram';

const Ratings = observer(({id, gameData, ...props}) => {
  const [currentRating, changeCurrentRating] = useState('');
  const [ratingsReceived, changeRatingsReceived] = useState(false);
  const [circleOpen, toggleCircleOpen] = useState(false);
  const [counter, changeCounter] = useState(0);
  const [mouseOverText, addMouseOverText] = useState('');
  const allRatingsArray = [];

  const store = useContext(StoreContext).AppStore;


  let rateText;
  if (mouseOverText) {
    store.alreadyRated === true ? rateText = "Done" : rateText = mouseOverText;
  } else {
    if(store.unratedGame)  {
      rateText = "Unrated.." 
    } else if (store.ratingError) {
      rateText = store.ratingError
    } else {
      store.ratingsObject ? rateText = store.averageRating(id)  : rateText = 'Loading..'
    }
  }

  return (
   <div className="Ratings">
       <div className="rating-container" onMouseOver={() => addMouseOverText("Rate")} onMouseOut={() => addMouseOverText('')}>
       <span>{rateText}</span>

        {store.alreadyRated === false &&
        <select onChange={(event) => store.postRating(event.target.value, id)}>
        <option value="Rating" disabled selected>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>

        </select>
        
        }
           

           {/* <div className="circular-menu">
            <div className={circleOpen ? "circle open" : "circle"}>
            <span className="fa fa-home fa-2x numberContainer" style={{left: '50%', top: '15%'}}>1</span>
            <span className="fa fa-facebook fa-2x numberContainer"  style={{left: '74.75%', top: '25.25%'}}></span>
            <span className="fa fa-twitter fa-2x numberContainer" style={{left: '85%', top: '50%'}}></span>
            <span className="fa fa-linkedin fa-2x numberContainer" ></span>
            <span className="fa fa-github fa-2x numberContainer"></span>
            <span className="fa fa-rss fa-2x numberContainer"></span>
            <span className="fa fa-pinterest fa-2x numberContainer"></span>
            <span className="fa fa-asterisk fa-2x numberContainer"></span>
           </div>
           <div onClick={() => toggleCircleOpen(!circleOpen)} class="menu-button fa fa-bars fa-2x">{currentRating}</div> */}

{/* </div> */}
       </div>

   </div>
  )
});
export default Ratings;


