import React from 'react';
import UpcomingGames from '../UpcomingGames/UpcomingGames';
import SportTile from './SportTile';
import './Main.scss';

const rugbyImage = '/images/mackenzie.jpg';
const soccerImage = '/images/messi.jpg';
const nflImage = '/images/nfl.jpeg';



const FrontPage = () => {
  return (
    <div className="Main">
      <UpcomingGames />
      <h2>Sports</h2>

      <SportTile image={rugbyImage}/>
      <SportTile image={soccerImage}/>
      <SportTile image={nflImage}/>
    </div>
  )
}


export default FrontPage;
