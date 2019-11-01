import React, { useContext, useEffect } from 'react';
import SportTile from '../SportTile/SportTile';

import { StoreContext } from "../../index";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";


import { withRouter } from "react-router-dom";


const SelectTournament = withRouter(observer(({...props}) => {
  const apiStore = useContext(StoreContext).ApiStore;

    useEffect(() => {
      console.log("call function");
      apiStore.getTournamentsBySport(props.match.params.sport);
    }, [apiStore.allSportsArray]);
    let content;

console.log(toJS("ehh", apiStore.currentSportTournaments));
  if(apiStore.currentSportTournaments) {
  content = apiStore.currentSportTournaments.map((tournament, i) => {
     const {strLeague, strLogo, idLeague, strUrl} = tournament;
        return(
          <SportTile image={strLogo} sportName={strLeague} id={idLeague} url={strUrl} key={i}/>
        )
      })
  }
  return (
    <div className="SelectTournament">
      {content}
    </div>
  )

}));

export default SelectTournament;
