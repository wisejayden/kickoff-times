import React from 'react';
import RugbySchedule from './RugbySchedule';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UpcomingGames from '../UpcomingGames/UpcomingGames';
import CompetitionTile from '../CompetitionTile/CompetitionTile';

const RugbyContent = (props) => {
  return (
    <>
      <UpcomingGames />
      <CompetitionTile sport="rugby" />
    </>
  )
}
export default RugbyContent;


