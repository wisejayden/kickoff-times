import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';
import { IconContext } from "react-icons";
import { MdLocationOn } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

const tempLogo = './images/templogo.png';


const Header = () => {
  const currentLocale = "Berlin";
  return (
    <header className="Header">
        <div className="locale-container">
          <IconContext.Provider value={{className: "locale-icon" }}><MdLocationOn /></IconContext.Provider>
          <span>{currentLocale}</span>
        </div>
      
        {/* <Link to="/" ><img id="logo" src={tempLogo} alt="Kickoff Times Logo"/></Link> */}
        <Link to="/"><h1>KickOff Times</h1></Link>

      <IconContext.Provider value={{ className: "profile-icon" }}><FaUser /></IconContext.Provider>

    </header>
  )
}

export default Header;
