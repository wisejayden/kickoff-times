import React, { useContext, useEffect } from "react";
import UpcomingGames from "../UpcomingGames/UpcomingGames";
import "./Main.scss";
import Tab from "../Tab/Tab";
import Pools from "../Pools/Pools";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";

const FrontPage = observer(props => {
  const store = useContext(StoreContext).AppStore;

  useEffect(() => {
    store.getAllRatings();
  });

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
        <UpcomingGames data={store.data} matchesView={true} notice={false} />
      )}
      {props.location.pathname === "/pools" && <Pools />}
      {props.location.pathname === "/ratings" && (
        <UpcomingGames data={store.data} matchesView={false} />
      )}
    </div>
  );
});

export default FrontPage;