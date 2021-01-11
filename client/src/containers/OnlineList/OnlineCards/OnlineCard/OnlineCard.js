import React from "react";

import "../../../../assets/styles/card.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./OnlineCard.module.css";

function OnlineCard(props) {
    return (
        <li className="card">
            <div className="card-online-status"></div>
            <FontAwesomeIcon icon={props.icon} />
            <div className="card-info">
                <h3>{props.name}</h3>
            </div>
            {props.inSameRoom ? (
                <FontAwesomeIcon
                    className={classes.inRoom}
                    icon={props.inSameRoom}
                />
            ) : null}
        </li>
    );
}

export default OnlineCard;
