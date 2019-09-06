import React from 'react';
import { Link } from 'react-router-dom';
import './Tab.scss';






const Tab = ({ ...props}) => {
  
  return (
    <div className="Tab">
        <Link className="Tab-link" to={"/matches"}><span>Matches</span></Link>
        <Link className="Tab-link" to={"/pools"}><span className="tab-links" >Pools</span></Link>
        <Link className="Tab-link" to={"/ratings"}><span className="tab-links" >Match Ratings</span></Link>
    </div>
  )
}

export default Tab;
