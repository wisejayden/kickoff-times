import React, { useContext } from "react";
import { IconContext } from "react-icons";
import { FaRegQuestionCircle } from "react-icons/fa";
import GameFixture from "../GameFixture/GameFixture";
import moment from "moment";
import GameDate from "../GameDate/GameDate";
import Filter from "../Filter/Filter";
import Notice from "../Notice/Notice";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import { toJS } from "mobx";

import "./UpcomingGames.scss";
const UpcomingGames = withRouter(
  observer(
    ({
      numberOfGames,
      data,
      matchesView,
      notice,
      filterDropdown = true,
      ...props
    }) => {
      const store = useContext(StoreContext).AppStore;

      const gamesSortedByDay = [];
      let count = 0;

      //Sort the data by date
      data.forEach(element => {
        let date = `${
          store.weekArray[moment(element.scheduled).day()]
        } ${moment(element.scheduled).date()} ${
          store.monthArray[moment(element.scheduled).month()]
        }`;
        let pool;
        let image = [];
        if (element.knockout) pool = element.knockout;
        //If the game has passed, get rid of it.. But give it a couple of hours first..
        //Removed for now to allow website to function as tournament is now over...
        // const scheduled = moment(element.scheduled).add(4, "hours");
        // if (matchesView && moment() > scheduled) {
        //   return;
        // }

        let countryNameImageCheck = [];

        for (let i = 0; i < store.aPoolOfCountries.length; i++) {
          //Add country logo to competitors object
          if (store.aPoolOfCountries[i].country === element.competitors[0].name) {
            if (!pool) pool = `Pool ${store.aPoolOfCountries[i].pool}`;
            image.unshift(store.aPoolOfCountries[i].image);
            countryNameImageCheck.unshift(element.competitors[0].name);
          }
          if (store.aPoolOfCountries[i].country === element.competitors[1].name) {
            if (!pool) pool = `Pool ${store.aPoolOfCountries[i].pool}`;
            image.push(store.aPoolOfCountries[i].image);
            countryNameImageCheck.push(element.competitors[1].name);
          }
        }

        //Check if two team images have been added, if not check if the first or second image has been set.
        //Add false to either the beginning or end of the array depending.
        if (image.length !== 2) {
          if (element.competitors[0].name === countryNameImageCheck[0]) {
            image.push(false);
          } else {
            image.unshift(false);
          }
        }
        gamesSortedByDay.push({ date, element, pool, image });
      });

      //Pull out the unique dates out of the array
      const unique = [...new Set(gamesSortedByDay.map(item => item.date))];

      const upcomingGames = gamesSortedByDay.map((game, i) => {
        if (game.date === unique[count]) {
          count++;
          //Add a GameDate component for the first instance of each date.
          return (
            <>
              <GameDate date={game.date} />
              <GameFixture
                matchesView={matchesView}
                gameData={game.element}
                pool={game.pool}
                image={game.image}
              />
            </>
          );
        } else {
          return (
            <GameFixture
              matchesView={matchesView}
              gameData={game.element}
              pool={game.pool}
              image={game.image}
            />
          );
        }
      });

      if (numberOfGames === false) numberOfGames = data.length;
      
      return (
        <div className="UpcomingGames">
          <div className="UpcomingGames-container">
            {store.noticeClicked === false && notice === true && (
              <Notice
                clickNotice={clickNotice}
                message={
                  "Group standings have been added, check out the Pools tab"
                }
              />
            )}
            {filterDropdown === true && (
              <div className="filter-container">
                <Filter />
                {store.filterValue !== "" && (
                  <img
                    onClick={store.clearFilterData}
                    id="remove-filter-logo"
                    src="/images/redcross.png"
                  />
                )}
              </div>
            )}
            {upcomingGames}
          </div>
        </div>
      );
    }
  )
);

export default UpcomingGames;
