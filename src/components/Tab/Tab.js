import React from 'react';
import { Link } from 'react-router-dom';
import './Tab.scss';
import { withRouter} from "react-router-dom";

const Tab = withRouter(({ ...props}) => {
  const path = props.history.location.pathname;
  return (
    <div className="Tab">
        <Link className={path === "/matches" ? "Tab-link active" : "Tab-link"} to={"/matches"}><span>Matches</span></Link>
        <Link className={path === "/pools" ? "Tab-link active" : "Tab-link"} to={"/pools"}><span className="tab-links" >Pools</span></Link>
        <Link className={path === "/ratings" ? "Tab-link active" : "Tab-link"} to={"/ratings"}><span className="tab-links" >Ratings</span></Link>
    </div>
  )
});

export default Tab;
