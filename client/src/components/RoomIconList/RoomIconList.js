import React from "react";

import classes from "./RoomIconList.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const listOfIcons = [
    "users",
    "coffee",
    "couch",
    "code",
    "gamepad",
    "icons",
    "chess-rook",
    "book",
    "star",
    "biohazard",
];

const RoomIconList = (props) => {
    const elementList = listOfIcons.map((icon) => (
        <div
            className={
                props.isSelected === icon ? classes.RoomIconListActive : null
            }
            onClick={() => props.select(icon)}
            key={icon}
        >
            <FontAwesomeIcon icon={icon} />
        </div>
    ));

    return <div className={classes.RoomIconList}>{elementList}</div>;
};

export default RoomIconList;
