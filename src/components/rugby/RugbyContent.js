import React from 'react';
import CompetitionTile from './CompetitionTile';
import RugbySchedule from './RugbySchedule';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const RugbyContent = (props) => {
  return (
    <>
    <Route path="/rugby"
      render= {props=> <CompetitionTile />}
    >
    </Route>
    <Route 
      path="/rugby/rugbyworldcup"
      render={props => <RugbySchedule />}
      />
    </>
  )
}
export default RugbyContent;


