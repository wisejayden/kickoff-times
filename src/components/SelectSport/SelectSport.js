import React, { useContext, useEffect } from 'react';
import { StoreContext } from "../../index";
import { observer } from "mobx-react-lite";
import SportTile from '../SportTile/SportTile';
import './SelectSport.scss';
import { withRouter } from "react-router-dom";


import { toJS } from "mobx";



const SelectSport = withRouter(observer(({view, ...props}) => {
  const apiStore = useContext(StoreContext).ApiStore;


  let content;
  content = apiStore.allSportsArray.map((sport, i) => {
     const {strSportThumb, strSport, idSport, strUrl} = sport;
        return(
          <SportTile image={strSportThumb} sportName={strSport} id={idSport} url={strUrl} key={i}/>
        )
      })

  return(
    <div className="SelectSport">
      {content}
    </div>
  )
}));

export default SelectSport;
