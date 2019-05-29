import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

const tempLogo = './images/templogo.png';


const Header = () => {
  return (
    <header id="Header">
      <div className="logo-container">
        <Link to="/" ><img id="logo" src={tempLogo} alt="Kickoff Times Logo"/></Link>
        <Link to="/"><span>KickOff Times</span></Link>
      </div>

      <Link to="/rugby"><span>Rugby</span></Link>
      <span>Login</span>
    </header>
  )
}

export default Header;
