import React from "react";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
    return (
        <React.Fragment>
            {props.children}
            <div
                className={`${classes.Backdrop} ${props.isTransparent ? classes.transparent : null}`}
                onClick={props.click}
            ></div>
        </React.Fragment>
    );
};

export default Backdrop;
