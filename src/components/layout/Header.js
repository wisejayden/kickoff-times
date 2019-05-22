import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

const tempLogo = './images/templogo.png';


const Header = () => {
  return (
    <header id="Header">
      <div className="logo-container">
        <Link to="/"><img id="logo" src={tempLogo} /></Link>
        <Link to="/"><span>KickOff Times</span></Link>
      </div>

      <Link to="/rugby"><a>Rugby</a></Link>
      <a>Login</a>
    </header>
  )
}

export default Header;
