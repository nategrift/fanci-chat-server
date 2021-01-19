import React from 'react';

import { connect } from 'react-redux'

import classes from './RoomCard.module.css'

import '../../assets/styles/card.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const roomCard = (props) => {

    let activeClass = null
    if (props.connectRoom) {
        if (props.connectRoom.roomID === props.room.roomID) {
            activeClass = 'card-selected'
        }
    }
    return (
                <li title={`Click to join ${props.room.roomName}`} className={`card ${activeClass} ${classes.RoomCard}`} id={props.room.roomID} key={props.room.roomID} onClick={props.clicked} >
                    <div className="card-online-status"></div>
                    <FontAwesomeIcon icon={props.room.icon} />
                    <div className="card-info">
                        <h3>{props.room.roomName}</h3>
                        <p>{props.room.numberOnline} Online</p>
                    </div>
                    {props.room.private ? <FontAwesomeIcon icon="lock" /> : null}
                    {props.room.hasSheild ? <FontAwesomeIcon icon="shield-alt" /> : null}
                </li>
    );
};

const mapStateToProps = state => {
    return {
        connectRoom: state.room
    };
}

export default connect(mapStateToProps)(roomCard);
