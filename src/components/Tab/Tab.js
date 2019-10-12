import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Tab.scss";
import { withRouter } from "react-router-dom";
import Headroom from "react-headroom";

const Tab = withRouter(({ ...props }) => {
  const path = props.history.location.pathname;
  const [positionTop, changePositionTop] = useState({ top: "0px" });

  return (
    <Headroom pinStart={150} disableInlineStyles={true}>
      <div className="Tab">
        <Link
          className={path === "/matches" ? "Tab-link active" : "Tab-link"}
          to={"/matches"}
        >
          <span>Matches</span>
        </Link>
        <Link
          className={path === "/pools" ? "Tab-link active" : "Tab-link"}
          to={"/pools"}
        >
          <span className="tab-links">Pools</span>
        </Link>
        <Link
          className={path === "/ratings" ? "Tab-link active" : "Tab-link"}
          to={"/ratings"}
        >
          <span className="tab-links">Ratings</span>
        </Link>
      </div>
    </Headroom>
  );
});

export default Tab;
