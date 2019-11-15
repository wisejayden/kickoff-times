import React, { useContext, useState, useEffect } from "react";
import "./GameFixture.scss";
import Ratings from "../Ratings/Ratings";
import cityTimezones from "city-timezones";
import moment from "moment";
import tz from "moment-timezone";

import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import { toJS } from "mobx";

const GameFixture = observer(
  ({ gameData, pool, image, matchesView, teamDetails, elementMoment, ...props }) => {

    const [lineupState, changeLineupState] = useState(false);
    const [mouseOverText, addMouseOverText] = useState("");
    const [lineupVersion, setLineupVersion] = useState("");
    const [gameId, setGameId] = useState("");
    const [fixtureHasCurrentLineup, setFixtureHasCurrentLineup] = useState(
      false
    );
    console.log("teamn details blah", toJS(teamDetails.homeTeam));
    const store = useContext(StoreContext).AppStore;

    //const userTimeIn12HourTime = scheduled.format('h:mm a')
    const userTime = elementMoment.format("HH:mm");

    //Need to find a better solution in case the city is not found. Large country may screw with the timezone.
    // const cityLookup =
    //   cityTimezones.lookupViaCity(gameData.venue.city_name).length > 0
    //     ? cityTimezones.lookupViaCity(gameData.venue.city_name)[0]
    //     : cityTimezones.findFromCityStateProvince(
    //         gameData.venue.country_name
    //       )[0];
    // const localTime = scheduled.tz(cityLookup.timezone).format("HH:mm");

    const shortenedWeekday = store.weekArray[elementMoment.day()].substring(0, 3);
    // const imageUrlArray = [
    //   `/images/country/${image[0]}`,
    //   `/images/country/${image[1]}`
    // ];

    const matchPassed = moment() > elementMoment ? true : false;


    // const determineStadiumName = () => {
    //   for (let i = 0; i < store.checkStadiumName.length; i++) {
    //     if (gameData.venue.city_name === store.checkStadiumName[i][0]) {
    //       return store.checkStadiumName[i][1];
    //     }
    //   }
    // };

    const toggleLineup = () => {
      if (matchesView && gameFixtureClickable) {
        changeLineupState(!lineupState);
      }
    };
    let gameFixtureClickable;
    let gameFixtureHeight;
    const lineupAvailableMatchId = false;

    // const lineupAvailableMatchId = store.checkForLineup(gameData.id);
    useEffect(() => {
      if (lineupAvailableMatchId) {
        // fixtureHasCurrentLineup = true;
        setLineupVersion("backup");
        setGameId(lineupAvailableMatchId);
        setFixtureHasCurrentLineup(true);
      } else {
        setLineupVersion("");
        setGameId(gameData.Id);
        setFixtureHasCurrentLineup(false);
      }
    }, [lineupAvailableMatchId]);

    let homeTeam = teamDetails.homeTeam.strAlternate;


    let awayTeam = teamDetails.awayTeam.strAlternate;


    if (fixtureHasCurrentLineup && lineupState) {
      gameFixtureHeight = {
        height: "51rem"
      };
    } else if (fixtureHasCurrentLineup) {
      gameFixtureHeight = {
        height: "11rem"
      };
    } else {
      gameFixtureHeight = {
        height: "10rem"
      };
    }
    (fixtureHasCurrentLineup && matchesView) || !matchesView
      ? (gameFixtureClickable = {
          cursor: "pointer"
        })
      : (gameFixtureClickable = {});

    return (
      <div
        className="GameFixture"
        onMouseOver={() => addMouseOverText("Rate")}
        onMouseOut={() => addMouseOverText("")}
        style={Object.assign(gameFixtureClickable, gameFixtureHeight)}
      >
        {" "}
        {matchesView && (
          <div
            onClick={() => toggleLineup()}
            className="game-fixture-time-container"
          >
            <span>
              {" "}
              {shortenedWeekday} {elementMoment.date()}{" "}
              {store.monthArray[elementMoment.month()]}{" "}
            </span>{" "}
            <span className="your-time">{userTime} Your Time </span>{" "}
          </div>
        )}{" "}
        <div
          className="game-fixture-playing"
          onClick={() => toggleLineup()}
          style={
            matchesView === false
              ? {
                  height: "100%",
                  marginTop: "1.3rem"
                }
              : {}
          }
        >
          {" "}
          {image[0] ? (
            <img
              className="country-circle"
              src={image[0]}
              alt={homeTeam + " country flag"}
            />
          ) : (
            <div className="country-circle"> </div>
          )}{" "}
          <div className="match-information">
            {" "}
            {!matchesView && matchPassed && (
              <Ratings
                id={gameData.id}
                gameData={gameData}
                mouseOverText={mouseOverText}
              />
            )}{" "}
            {!matchesView && !matchPassed && (
              <div className="space-saver"> </div>
            )}{" "}
            <p className="competitors">
              {" "}
              {homeTeam} v {awayTeam}{" "}
            </p>{" "}
            {/*<span style={determinePoolColour()}> {pool} </span>{" "}
            <span> {determineStadiumName()} </span>{" "}
            {matchesView && <p>{localTime} Local Time </p>}{" "}*/}
            {fixtureHasCurrentLineup &&
              matchesView &&
              lineupState === false && (
                <p className="lineup-available">
                  Lineups available! Click to show..{" "}
                </p>
              )}{" "}
          </div>{" "}
          {image[1] ? (
            <img
              className="country-circle"
              src={image[1]}
              alt={awayTeam + " country flag"}
            />
          ) : (
            <div className="country-circle"> </div>
          )}{" "}
        </div>{" "}
        {fixtureHasCurrentLineup &&
          lineupState &&
          matchesView &&
          lineupVersion === "primary" && (
            <div className="lineups-container">
              <ul>
                {" "}
                {store.lineup.lineups[0].starting_lineup.map(pos => {
                  return (
                    <li>
                      {" "}
                      {pos.player.jersey_number}.{" "}
                      {pos.player.name
                        .split(",")
                        .reverse()
                        .join(" ")}{" "}
                    </li>
                  );
                })}{" "}
                <br> </br>{" "}
                {store.lineup.lineups[0].substitutes.map(pos => {
                  return (
                    <li>
                      {" "}
                      {pos.player.jersey_number}.{" "}
                      {pos.player.name
                        .split(",")
                        .reverse()
                        .join(" ")}{" "}
                    </li>
                  );
                })}{" "}
              </ul>{" "}
              <ul>
                {" "}
                {store.lineup.lineups[1].starting_lineup.map(pos => {
                  return (
                    <li>
                      {" "}
                      {pos.player.jersey_number}.{" "}
                      {pos.player.name
                        .split(",")
                        .reverse()
                        .join(" ")}{" "}
                    </li>
                  );
                })}{" "}
                <br> </br>{" "}
                {store.lineup.lineups[1].substitutes.map(pos => {
                  return (
                    <li>
                      {" "}
                      {pos.player.jersey_number}.{" "}
                      {pos.player.name
                        .split(",")
                        .reverse()
                        .join(" ")}{" "}
                    </li>
                  );
                })}{" "}
              </ul>{" "}
            </div>
          )}{" "}
        {fixtureHasCurrentLineup &&
          lineupState &&
          matchesView &&
          lineupVersion === "backup" && (
            <div className="lineups-container">
              <ul>
                {store.backup[gameId][0].starters.map(pos => {
                  return <li> {pos} </li>;
                })}
                <br />
                {store.backup[gameId][0].finishers.map(pos => {
                  return <li> {pos} </li>;
                })}
              </ul>
              <ul>
                {store.backup[gameId][1].starters.map(pos => {
                  return <li> {pos} </li>;
                })}
                <br />
                {store.backup[gameId][1].finishers.map(pos => {
                  return <li> {pos} </li>;
                })}
              </ul>
            </div>
          )}
      </div>
    );
  }
);

export default GameFixture;
