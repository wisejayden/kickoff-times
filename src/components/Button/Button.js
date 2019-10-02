import React from "react";
import "./Button.scss";

const Button = ({ content, onClick, hoverable, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={"Button" + (hoverable ? " hover-button" : "")}
    >
      {content}
    </div>
  );
};
export default Button;
