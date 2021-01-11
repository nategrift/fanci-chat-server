import React from "react";

import classes from "../../containers/Rooms/Room/Room.module.css";

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
            <div onMouseOut={props.hideTime ? null : hideTimeStamp} onMouseOver={props.hideTime ? null : showTimeStamp} className={props.hideTime ? classes.repeatedUserMessage : null}>
                <p>{props.hideUsername ? null : props.user}</p>
                <p>{props.message}</p>
            </div>
            <p>{props.hideTime ? null : props.time}</p>
        </li>
    );
};

export default message;
