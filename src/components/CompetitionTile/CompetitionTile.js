import React from 'react';
import { BrowserRouter as Link } from "react-router-dom"
import './CompetitionTile.scss';
const rwcLogo = '/images/rwc-logo.png';

const CompetitionTile = () => {
    return (
        <div className="CompetitionTile">
            <Link to="/rugby/rugbyworldcup/"><img src={rwcLogo} alt="Rugby World Cup 2019"/></Link>                        
        </div>
    )
}

export default CompetitionTile;