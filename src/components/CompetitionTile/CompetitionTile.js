import React from 'react';
import rwc from '../../rwc-schedule.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import './CompetitionTile.scss';

const rwcLogo = '/images/rwc-logo.png';


const CompetitionTile = (sport, comp, ...props) => {
  
    return (
        <div className="CompetitionTile">
            <Link to="/rugby/rugbyworldcup/"><img src={rwcLogo} alt="Rugby World Cup 2019"/></Link>                        
        </div>
    )
}

export default CompetitionTile;