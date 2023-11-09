import React from "react";

const Error: React.FC<{ message?: string }> = (props) => {
  return <p>{props.message ? props.message : "Something went wrong!"}</p>;
};

export default Error;
