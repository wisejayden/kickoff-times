import React, { useState, useEffect, useContext } from 'react';
import './Ratings.scss';
import axios from 'axios';
import {toJS } from 'mobx';
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";

const Ratings = observer(({id, ...props}) => {
  const [currentRating, changeCurrentRating] = useState('');
  const [ratingsReceived, changeRatingsReceived] = useState(false);
  const allRatingsArray = [];

  const store = useContext(StoreContext).AppStore;


  if(store.ratingsObject && ratingsReceived === false) {
    changeRatingsReceived(true);
    let value =  toJS(store.ratingsObject[id]);
    let count = value.length;
    let newValue = value.reduce((previous, current) => current += previous);
    newValue /= count;
    changeCurrentRating(newValue);
  }




  const postRequest = () => {
    axios({
      method: 'post',
      async: true,
      crossDomain: true,
      url: 'https://kickofftimes-7771.restdb.io/rest/ratings',
      headers: {
       "content-type": "application/json",
       "x-apikey": "5d84bbdbfd86cb75861e24f4",
       "cache-control": "no-cache"
     },
      data: {
        "user_rating": 5
      }
   })
    .then(res => {
      console.log(res);
    })
  };




  
  

  return (
   <div className="Ratings">
       <div className="rating-container">
           <span>{currentRating}</span>
       </div>

   </div>
  )
});
export default Ratings;


