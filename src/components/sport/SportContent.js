import React from 'react';
import RugbySchedule from './RugbySchedule';
import { Route, Switch } from "react-router-dom";
import UpcomingGames from '../UpcomingGames/UpcomingGames';
import CompetitionTile from '../CompetitionTile/CompetitionTile';
import rwcSchedule from '../../rwc-schedule.json';
import Axios from 'axios';


const SportContent = ({match, ...props}) => {
  const sport = match.params;
  

  return (
    <>
      <UpcomingGames data={rwcSchedule.sport_events} numberOfGames={3}/>
      <CompetitionTile sport={sport} />
    </>
  )
}
export default SportContent;


