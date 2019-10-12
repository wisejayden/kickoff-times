import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdLocationOn } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import Headroom from "react-headroom";

const tempLogo = "./images/templogo.png";

const Header = observer(() => {
  const store = useContext(StoreContext).AppStore;

  const currentLocale = "Berlin";
  return (
    <div className="Header">
      {/* <div className="locale-container"> */}
      {/* <IconContext.Provider value={{className: "locale-icon" }}><MdLocationOn /></IconContext.Provider> */}
      {/* <span>{currentLocale}</span> */}
      {/* </div> */}

      {/* <Link to="/" ><img id="logo" src={tempLogo} alt="Kickoff Times Logo"/></Link> */}
      <Link to="/" onClick={store.clearFilterData}>
        <h1>KickOff Times</h1>
      </Link>

      {/* <IconContext.Provider value={{ className: "profile-icon" }}><FaUser /></IconContext.Provider> */}
    </div>
  );
});

export default Header;
