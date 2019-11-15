import React, { useContext, useEffect, useState } from "react";
import UpcomingGames from "../UpcomingGames/UpcomingGames";
import "./Main.scss";
import rwcSchedule from "../../rwc-schedule.json";
import Tab from "../Tab/Tab";
import Pools from "../Pools/Pools";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import { toJS } from "mobx";
import { withRouter } from "react-router-dom";


const FrontPage = withRouter(observer(({...props}) => {
  const store = useContext(StoreContext).AppStore;
  const apiStore = useContext(StoreContext).ApiStore;
  const [receivedTournament, updateReceivedTournament] = useState(false);

  useEffect(() => {
    if(apiStore.fetchedTournamentsBySport === false) {
      apiStore.getTournamentsBySport(props.match.params.sport).then(x => {
        apiStore.getTournamentFixtures(props.match.params.sport,props.match.params.tournament);
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      apiStore.getTournamentFixtures(props.match.params.sport,props.match.params.tournament);
    }
  }, [apiStore.fetchedIntialSportsData]);
  console.log("?", apiStore.tournamentTeams);
  return (
    <div className="Main">
      <div className="rugby-header">
        <h1>Rugby World Cup</h1>
        <div className="logo-container">
          <img
            id="rwc-logo"
            src="images/rwc-logo-white-compress.png"
            alt="Rugby World Cup Logo"
          />
        </div>
      </div>

      <Tab />
      {props.location.pathname === `/${apiStore.currentSport}/${apiStore.currentTournament}` && (
        <UpcomingGames data={apiStore.tournamentFixtures} matchesView={true} notice={false} />
      )}
      {props.location.pathname === "/pools" && <Pools />}
      {props.location.pathname === "/ratings" && (
        <UpcomingGames data={apiStore.tournamentFixtures} matchesView={false} />
      )}
    </div>
  );
}));

export default FrontPage;
