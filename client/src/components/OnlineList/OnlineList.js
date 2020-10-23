import React from "react";
import { connect } from 'react-redux'

import classes from "./OnlineList.module.css";

import OnlineCards from "./OnlineCards/OnlineCards";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../../assets/styles/infoBottom.css'

import "../../assets/styles/header.css";

function OnlineList(props) {
    return (
        <div className={classes.OnlineList}>
            <div className="header">
                <h1>Users Online</h1>
            </div>
            <ul>
                <OnlineCards />
            </ul>
            <div className="infoBottom">
                <FontAwesomeIcon icon="user-secret" />
                <p>Other Hidden Online Users: <span>{props.hiddenUsers}</span></p>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        hiddenUsers: state.hiddenUsers
    };
}

export default connect(mapStateToProps)(OnlineList);
