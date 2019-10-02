import React from "react";
import "./Button.scss";

const Button = ({ content, onClick, ...props }) => {
  return (
    <div onClick={onClick} className="Button">
      {content}
    </div>
  );
};
export default Button;
