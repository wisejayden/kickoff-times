import React from 'react';
import UpcomingGames from '../UpcomingGames/UpcomingGames';
import SportTile from './SportTile';
import './Main.scss';
import rwcSchedule from '../../rwc-schedule.json';
import Tab from '../Tab/Tab';

const rugbyImage = '/images/mackenzie.jpg';
const soccerImage = '/images/messi.jpg';
const nflImage = '/images/nfl.jpeg';



const FrontPage = (props) => {
  return (
    <div className="Main">
      <h1>Rugby World Cup</h1>
      <Tab />
      {props.location.pathname === "/matches" &&
            <UpcomingGames data={rwcSchedule.sport_events}/>
      }
       {props.location.pathname === "/matches" &&
            <p>Pools</p>
      }

      {/*
      <h2>Sports</h2>

      <SportTile backgroundPosition="50% 50%" link="/rugby" sportName='Rugby' image='https://www.radiosport.co.nz/media/16861238/chiefs-first-five-damian-mckenzie-photosport.jpg?mode=crop&width=675&height=379&quality=80&scale=both'/>
      <SportTile backgroundPosition="50% 40%" sportName='Football' image='https://ep01.epimg.net/deportes/imagenes/2019/04/19/actualidad/1555686393_895375_1555686917_noticia_normal.jpg'/>
      <SportTile backgroundPosition="0% 0%" sportName='NFL' image='https://media.profootballfocus.com/2015/12/AP_670821111947.jpg?w=916&h=720'/>
        */}
    </div>
  )
}


export default FrontPage;
