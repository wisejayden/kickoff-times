import React, { useState, useContext } from 'react';
import './Pools.scss';

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";



const Pools = observer(({...props}) => {
  const [currentPool, changeCurrentPool] = useState('A');

  const store = useContext(StoreContext).AppStore;


  const showPool = store.worldCupPools[currentPool].map(country => {
    let image;
    for (let i = 0; i < store.aPoolOfCountries.length; i++) {
      if (country === store.aPoolOfCountries[i].country) image = `/images/country/${store.aPoolOfCountries[i].image}`;
    }
    return (
      <li className="pool-country-container">
        <img src={image } className="pool-country-icons"/>
        <span>{country}</span>
      </li>
    )
  })

  return (
    <div className="Pools">
      <ul className="pool-picker">
          <li onClick={() => changeCurrentPool('A')}>Pool A</li>
          <li  onClick={() => changeCurrentPool('B')}>Pool B</li>
          <li  onClick={() => changeCurrentPool('C')}>Pool C</li>
          <li  onClick={() => changeCurrentPool('D')}>Pool D</li>
      </ul>
      <ul className="pool-container">
        {showPool}
      </ul>
      
    </div>
  )
});
export default Pools;


