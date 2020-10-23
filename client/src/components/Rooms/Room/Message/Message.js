import React from "react";

import classes from "../Room.module.css";

const message = (props) => {
    function hideTimeStamp(event) {
        const timestamp = event.currentTarget.parentNode.lastChild;
        timestamp.className = "";
    }

    function showTimeStamp(event) {
        const timestamp = event.currentTarget.parentNode.lastChild;
        timestamp.className = classes.opacityZero;
    }

    return (
        <li
            className={props.isUser ? classes.messageIsUsers : ""}
        >
            <div onMouseOut={hideTimeStamp} onMouseOver={showTimeStamp}>
                <p>{props.user}</p>
                <p>{props.message}</p>
            </div>
            <p>{props.time}</p>
        </li>
    );
};

export default message;
