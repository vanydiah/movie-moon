import React from "react";
import classes from "./ScrollerWrapper.module.css";

const ScrollerWrapper: React.FC = (props) => {
  return (
    <div className={`${classes.scroller} ${classes.scrollbar}`}>
      {props.children}
    </div>
  );
};

export default ScrollerWrapper;
