import React from "react";

type ButtonType = {
  btnClass?: string;
  onClick?: () => void;
  disabled?: boolean;
};
const Button: React.FC<ButtonType> = (props) => {
  return (
    <button
      className={`btn ${props.btnClass}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
