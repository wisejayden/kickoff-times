import React, { useContext, useState } from "react";
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
      const apiStore = useContext(StoreContext).ApiStore;
      const [hasFixtures, changeHasFixtures] = useState(false);

      const gamesSortedByDay = [];
      let count = 0;

      //Sort the data by date
      data.forEach(element => {
        // Saturday 19 October
        const elementMoment = store.createMoment(element);
        const formattedDate = elementMoment.format('LL').replace(",", "");
        // let date = `${store.weekArray[moment(element.scheduled).day()]} ${moment(element.scheduled).date()} ${store.monthArray[moment(element.scheduled).month()]}`;
        // let image = ['https://upload.wikimedia.org/wikipedia/en/thumb/7/78/SupeRugby_Logo.svg/1048px-SupeRugby_Logo.svg.png', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/78/SupeRugby_Logo.svg/1048px-SupeRugby_Logo.svg.png'];
        //If the game has passed, get rid of it.. But give it a couple of hours first..



        gamesSortedByDay.push({ formattedDate, element, elementMoment });
      });

      //Pull out the unique dates out of the array
      const unique = [...new Set(gamesSortedByDay.map(item => item.formattedDate))];
      let temp = [];
      temp.push(gamesSortedByDay[0]);
      const hello = [];



      const upcomingGames = gamesSortedByDay.map((game, i) => {

        const teamDetails = store.getTeamDetails(game.element);
        console.log("homedetails", toJS(teamDetails.homeTeam));
        const image = [`${teamDetails.homeTeam.strTeamBadge}`, `${teamDetails.awayTeam.strTeamBadge}`];
        if (game.formattedDate === unique[count]) {
          count++;
          //Add a GameDate component for the first instance of each date.
          return(
            <>
              <GameDate date={game.formattedDate} />
                <GameFixture
                  matchesView={matchesView}
                  gameData={game.element}
                  image={image}
                  elementMoment={game.elementMoment}
                  teamDetails={teamDetails}

                />
            </>
          );
        } else {
          return(
            <GameFixture
              key={i}
              matchesView={matchesView}
              gameData={game.element}
              image={image}
              elementMoment={game.elementMoment}
              teamDetails={teamDetails}
            />
          );
        }

        // apiStore.getTeamDetails([game.element.idHomeTeam, game.element.idAwayTeam])
        //   .then(teamDetails => {
        //     let image;
        //     if(teamDetails.length === 2) {
        //       image = [teamDetails[0].strTeamBadge, teamDetails[1].strTeamBadge];
        //     } else {
        //       console.log("still not working...")
        //     }
        //
        //
        //   })
        //   .then(() => {
        //     changeHasFixtures(true);
        //     console.log("hello inside then", hello)
        //   })
        //   .catch(err => {
        //     console.log("ERR", err);
        //   })
      });



      // let result = gamesSortedByDay.reduce(function(h, obj) {
      //   h[obj.date] = (h[obj.date] || []).concat(obj);
      //   return h;
      // }, {});
      const clickNotice = () => {
        store.noticeClicked = true;
      };

      if (numberOfGames === false) numberOfGames = data.length;
      return (
        <div className="UpcomingGames">
          {/* <div className="upcoming-container">
            <p>Upcoming Games...</p>
            <div className="personalize-container">Personalize? <IconContext.Provider value={{className: "info-icon" }}><FaRegQuestionCircle /></IconContext.Provider></div>
        </div> */}
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
