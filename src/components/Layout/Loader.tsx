import React from "react";
import classes from "./Loader.module.css";
const Loader = () => {
  return (
    <div className="card border-0" style={{background: 'transparent'}}>
      <span className={classes.loader}></span>
    </div>
  );
};

export default React.memo(Loader);
