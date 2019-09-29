import React, { useState, useContext, useEffect, useRef } from "react";
import "./Pools.scss";
import GameFixture from "../GameFixture/GameFixture";
import UpcomingGames from "../UpcomingGames/UpcomingGames";
import Button from "../Button/Button";

import { withRouter } from "react-router-dom";
import { toJS } from "mobx";

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";

const Pools = withRouter(
  observer(({ ...props }) => {
    const [currentPool, changeCurrentPool] = useState("A");
    const [poolData, addPoolData] = useState("");
    const [currentPoolData, changeCurrentPoolData] = useState([]);

    const store = useContext(StoreContext).AppStore;
    const myRef = useRef();

    const executeScroll = () => scrollToRef(myRef);
    const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

    const handleClick = ref => {
      // console.log(myRef.current);
      // window.scrollTo({
      //   behavior: "smooth",
      //   top: myRef.current
      // });
      console.log("yo", ref);
      // window.scrollTo(0, ref.current.offsetTop);
      // window.scrollTo({
      //   behavior: "smooth",
      //   top: ref.current.offsetTop
      // });
      setTimeout(() => {
        window.scrollTo(0, ref.current.offsetTop);
      }, 2000);
    };

    const applyFilters = country => {
      store.changeFilterValue(country);
      handleClick(myRef);
    };

    // useEffect(() => {
    //   console.log("Inside effect", myRef);
    //   if (myRef.current) {
    //     handleClick(myRef);
    //   }
    // }, [store.filterValue]);

    const showPool = store.worldCupPools[currentPool].map(country => {
      let image;
      for (let i = 0; i < store.aPoolOfCountries.length; i++) {
        if (country === store.aPoolOfCountries[i].country)
          image = `/images/country/${store.aPoolOfCountries[i].image}`;
      }
      return (
        <li
          onClick={() => {
            applyFilters(country);
          }}
          className="pool-country-container"
        >
          <img src={image} className="pool-country-icons" />
          <span>{country}</span>
        </li>
      );
    });

    useEffect(() => {
      let newData = store.getPoolData();
      addPoolData(newData);
    }, []);

    useEffect(() => {
      let arr = poolData[currentPool];
      if (arr) {
        let sortedData = arr.sort((a, b) => b["points"] - a["points"]);
        changeCurrentPoolData(sortedData);
      }
    }, [currentPool, poolData]);

    const showNewPool = currentPoolData.map(country => {
      let image;
      let nickname;
      for (let i = 0; i < store.aPoolOfCountries.length; i++) {
        if (country.teamName === store.aPoolOfCountries[i].country) {
          image = `/images/country/${store.aPoolOfCountries[i].image}`;
          nickname = store.aPoolOfCountries[i].nickname;
        }
      }
      return (
        <tr className="pools__row">
          <td
            className="cell pools__cell-team"
            onClick={() => {
              applyFilters(country.teamName);
            }}
          >
            <img src={image} />
            <span className="pools__cell-team-long">{country.teamName}</span>
            <span className="pools__cell-team-short">{nickname}</span>
          </td>
          <td className="cell">{country.gamesPlayed}</td>
          <td className="cell">{country.pointsDiff}</td>
          <td className="cell">{country.bonusPoints}</td>
          <td className="cell">{country.points}</td>
        </tr>
      );
    });

    return (
      <div className="Pools">
        <ul className="pool-picker">
          {currentPool === "A" ? (
            <li id="pool-a-picker-active">Pool A</li>
          ) : (
            <li id="pool-a-picker" onClick={() => changeCurrentPool("A")}>
              Pool A
            </li>
          )}
          {currentPool === "B" ? (
            <li id="pool-b-picker-active">Pool B</li>
          ) : (
            <li id="pool-b-picker" onClick={() => changeCurrentPool("B")}>
              Pool B
            </li>
          )}
          {currentPool === "C" ? (
            <li id="pool-c-picker-active">Pool C</li>
          ) : (
            <li id="pool-c-picker" onClick={() => changeCurrentPool("C")}>
              Pool C
            </li>
          )}
          {currentPool === "D" ? (
            <li id="pool-d-picker-active">Pool D</li>
          ) : (
            <li id="pool-d-picker" onClick={() => changeCurrentPool("D")}>
              Pool D
            </li>
          )}
        </ul>
        <div className="pool-container">
          {currentPool === "A" && (
            <h1
              onClick={() => {
                applyFilters("Pool A");
              }}
            >
              Pool A
            </h1>
          )}
          {currentPool === "B" && (
            <h1
              onClick={() => {
                applyFilters("Pool B");
              }}
            >
              Pool B
            </h1>
          )}
          {currentPool === "C" && (
            <h1
              onClick={() => {
                applyFilters("Pool C");
              }}
            >
              Pool C
            </h1>
          )}
          {currentPool === "D" && (
            <h1
              onClick={() => {
                applyFilters("Pool D");
              }}
            >
              {" "}
              Pool D
            </h1>
          )}

          <table>
            <tbody>
              <tr>
                <th className="cell pools__header-team">Team</th>
                <th className="cell pools__header-played-long">Played</th>
                <th className="cell pools__header-played-short">Pl</th>
                <th className="cell">+/-</th>
                <th className="cell pools__header-bonus-long">Bonus Points</th>
                <th className="cell pools__header-played-short">BP</th>
                <th className="cell">Points</th>
              </tr>

              {showNewPool}
            </tbody>
          </table>
        </div>
        <div
          ref={myRef}
          style={store.filterValue ? { display: "block" } : { display: "none" }}
          className="pools-fixtures"
        >
          <div className="clear-filter-container">
            <Button content={"Clear Filters"} onClick={store.clearFilterData} />
          </div>
          <UpcomingGames
            data={store.data}
            notice={false}
            filterDropdown={false}
            matchesView={true}
          />
        </div>
      </div>
    );
  })
);
export default withRouter(Pools);
