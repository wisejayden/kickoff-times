import React, { useState, useContext } from 'react';
import './Pools.scss';
import { withRouter} from "react-router-dom";

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";



const Pools = withRouter(observer(({...props}) => {
  const [currentPool, changeCurrentPool] = useState('A');

  const store = useContext(StoreContext).AppStore;
  const applyFilters = (country) => {
    props.history.push("matches");
    store.changeFilterValue(country);
  }

  const showPool = store.worldCupPools[currentPool].map(country => {
    let image;
    for (let i = 0; i < store.aPoolOfCountries.length; i++) {
      if (country === store.aPoolOfCountries[i].country) image = `/images/country/${store.aPoolOfCountries[i].image}`;
    }
    return (
      <li onClick ={() => {applyFilters(country)}} className="pool-country-container">
        <img src={image } className="pool-country-icons"/>
        <span>{country}</span>
      </li>
    )
  })

  return (
    <div className="Pools">
      <ul className="pool-picker">
          {currentPool === "A" ? <li id="pool-a-picker-active">Pool A</li> : <li id="pool-a-picker" onClick={() => changeCurrentPool('A')}>Pool A</li> }
          {currentPool === "B" ? <li id="pool-b-picker-active">Pool B</li> : <li id="pool-b-picker" onClick={() => changeCurrentPool('B')}>Pool B</li> }
          {currentPool === "C" ? <li id="pool-c-picker-active">Pool C</li> : <li id="pool-c-picker" onClick={() => changeCurrentPool('C')}>Pool C</li> }
          {currentPool === "D" ? <li id="pool-d-picker-active">Pool D</li> : <li id="pool-d-picker" onClick={() => changeCurrentPool('D')}>Pool D</li> }
      </ul>
      <div className="pool-container">

        {currentPool === "A" && <h1 onClick ={() => {applyFilters("Pool A")}}>Pool A</h1> }
        {currentPool === "B" && <h1 onClick ={() => {applyFilters("Pool B")}}>Pool B</h1> }
        {currentPool === "C"&& <h1 onClick ={() => {applyFilters("Pool C")}}>Pool C</h1> }
        {currentPool === "D" && <h1 onClick ={() => {applyFilters("Pool D")}}> Pool D</h1> }


        <ul>
          {showPool}
        </ul>
      </div>

      
    </div>
  )
}));
export default withRouter(Pools);


