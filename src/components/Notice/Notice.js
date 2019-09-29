import React from "react";
import Button from "../Button/Button";
import "./Notice.scss";

const Notice = ({ message, clickNotice, ...props }) => {
  return (
    <div className="Notice">
      <Button content={message} onClick={clickNotice} />
    </div>
  );
};

export default Notice;
