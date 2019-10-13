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
  ({ gameData, pool, image, matchesView, ...props }) => {
    const [lineupState, changeLineupState] = useState(false);
    const [mouseOverText, addMouseOverText] = useState("");
    const [lineupVersion, setLineupVersion] = useState("");
    const [gameId, setGameId] = useState("");
    const [fixtureHasCurrentLineup, setFixtureHasCurrentLineup] = useState(
      false
    );

    const store = useContext(StoreContext).AppStore;

    // iso-8601 date format
    const scheduled = moment(gameData.scheduled);

    //const userTimeIn12HourTime = scheduled.format('h:mm a')
    const userTime = scheduled.format("HH:mm");

    //Need to find a better solution in case the city is not found. Large country may screw with the timezone.
    const cityLookup =
      cityTimezones.lookupViaCity(gameData.venue.city_name).length > 0
        ? cityTimezones.lookupViaCity(gameData.venue.city_name)[0]
        : cityTimezones.findFromCityStateProvince(
            gameData.venue.country_name
          )[0];
    const localTime = scheduled.tz(cityLookup.timezone).format("HH:mm");

    const shortenedWeekday = store.weekArray[scheduled.day()].substring(0, 3);
    const imageUrlArray = [
      `/images/country/${image[0]}`,
      `/images/country/${image[1]}`
    ];

    const matchPassed = moment() > scheduled ? true : false;

    const determinePoolColour = () => {
      if (pool === "Pool A")
        return {
          color: "#54c8e8",
          fontWeight: "bold"
        };

      if (pool === "Pool B")
        return {
          color: "#f4436c",
          fontWeight: "bold"
        };

      if (pool === "Pool C")
        return {
          color: "#2ed9c3",
          fontWeight: "bold"
        };

      if (pool === "Pool D")
        return {
          color: "#993dbb",
          fontWeight: "bold"
        };

      if (pool === "Quarter-Finals")
        return {
          color: "#024a7a",
          fontWeight: "bold"
        };

      if (pool === "Semi-Finals")
        return {
          color: "#f5a800",
          fontWeight: "bold"
        };

      if (pool === "Bronze Final")
        return {
          color: "#a46628",
          fontWeight: "bold"
        };

      if (pool === "Final")
        return {
          color: "#f5a800",
          fontWeight: "bold"
        };
    };

    const determineStadiumName = () => {
      for (let i = 0; i < store.checkStadiumName.length; i++) {
        if (gameData.venue.city_name === store.checkStadiumName[i][0]) {
          return store.checkStadiumName[i][1];
        }
      }
    };

    const toggleLineup = () => {
      if (matchesView && gameFixtureClickable) {
        changeLineupState(!lineupState);
      }
    };
    let gameFixtureClickable;
    let gameFixtureHeight;

    const lineupAvailableMatchId = store.checkForLineup(gameData.id);
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

    let homeTeam = gameData.competitors[0].name;
    let awayTeam;

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
              {shortenedWeekday} {scheduled.date()}{" "}
              {store.monthArray[scheduled.month()]}{" "}
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
              src={imageUrlArray[0]}
              alt={gameData.competitors[0].name + " country flag"}
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
              {gameData.competitors[0].name} v {gameData.competitors[1].name}{" "}
            </p>{" "}
            <span style={determinePoolColour()}> {pool} </span>{" "}
            <span> {determineStadiumName()} </span>{" "}
            {matchesView && <p>{localTime} Local Time </p>}{" "}
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
              src={imageUrlArray[1]}
              alt={gameData.competitors[1].name + " country flag"}
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
