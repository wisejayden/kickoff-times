import React, { useContext, useEffect } from "react";
import UpcomingGames from "../UpcomingGames/UpcomingGames";
import SportTile from "./SportTile";
import "./Main.scss";
import rwcSchedule from "../../rwc-schedule.json";
import Tab from "../Tab/Tab";
import Pools from "../Pools/Pools";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import { toJS } from "mobx";
import { ScrollTo } from "react-scroll-to";

const FrontPage = observer(props => {
  const store = useContext(StoreContext).AppStore;

  useEffect(() => {
    store.getAllRatings();
  });
  // console.log(toJS(store.poolData));
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
      {props.location.pathname === "/matches" && (
        <UpcomingGames data={store.data} matchesView={true} notice={true} />
      )}
      {props.location.pathname === "/pools" && <Pools />}
      {props.location.pathname === "/ratings" && (
        <UpcomingGames data={store.data} matchesView={false} />
      )}
    </div>
  );
});

export default FrontPage;
