import React, { useState } from "react";
import { connect } from 'react-redux'

import RoomCard from "./RoomCard/RoomCard";

import classes from "./RoomNav.module.css";
import '../../../assets/styles/button.css'
import '../../../assets/styles/infoBottom.css'
import '../../../assets/styles/subButton.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/styles/header.css";

import addButton from "../../../assets/images/add-icon.svg"

function RoomNav(props) {

    const [isSectionPublic, setIsSectionPublic] = useState(true) || null;

    let publicRooms = null;
    let privateRooms = null;
    if (props.rooms) {
        publicRooms = props.rooms.filter((item) => item.private === false);
        privateRooms = props.rooms.filter((item) => item.private === true);
    }

    let publicRoomsList = null;
    let privateRoomsList = null;

    if (publicRooms) {
        publicRoomsList = publicRooms.map((room) => {
    
            return (
                <RoomCard
                    room={room}
                    clicked={() => {joinRoom(room)}}
                    key={room.roomID}
                />
            );
        });
    }


    if (privateRooms) {
        privateRoomsList = privateRooms.map((room) => {
            return (
                <RoomCard
                    room={room}
                    clicked={() => {joinRoom(room)} }
                    key={room.roomID}
                />
            );
        });
    } else {
        privateRoomsList=<p>No Private Rooms Available</p>
    }


    function toggleSections(id) {
        if (id === 'public') {
            setIsSectionPublic(() => true)
        } else  {
            setIsSectionPublic(() => false)
        }
    }

    function joinRoom(room) {
        if (props.room) {
            if (props.room.roomID !== room.roomID) {
                props.socket.emit("leaveRoom", null);
                if (room.private) {
                    props.joinRoomHandler(null, true, room);
                } else {
                    props.socket.emit('joinRoom', room.roomID)
                }
            }
        } else if (!props.room) {
            if (room.private) {
                props.joinRoomHandler(null, true, room);
            } else {
                props.socket.emit('joinRoom', room.roomID)
            }
        }
    }


    function reloadRooms() {
        props.socket.emit('getRooms', null)
    }

    const privateInfoMsg = <p className={classes.privateInfoMsg}><FontAwesomeIcon icon='key'/>Private rooms need passwords to enter</p>

    return (
        <div className={classes.RoomNav}>
            <div className="header">
                <h1>Chat Rooms</h1>
                    <button className={classes.addButton} onClick={props.createRoomHandler}> Create Room <img src={addButton} alt='+'></img> </button>
            </div>
            <div className={classes.roomType}>
                <button onClick={() => toggleSections("public")} className={`${isSectionPublic ? 'buttonActive' : null} button`}><FontAwesomeIcon icon="users" /> Public</button>
                <button onClick={() => toggleSections("private")} className={`${isSectionPublic ? null : 'buttonActive'} button`}><FontAwesomeIcon icon="lock" /> Private</button>
            </div>
            <div className={classes.roomsList}>
                {!isSectionPublic ? privateInfoMsg : null}
                <ul className={classes.roomsListElement}>
                    {isSectionPublic ? publicRoomsList : privateRoomsList}
                </ul>
                <div onClick={reloadRooms} className={classes.ReloadIcon} title='Update Rooms'><FontAwesomeIcon icon="sync" /></div>
            </div>
            <div className="infoBottom">
                <FontAwesomeIcon icon="shield-alt" />
                <p>
                    Rooms marked with this symbol are static and will never
                    disappear
                </p>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        rooms: state.rooms,
        socket: state.socket,
        room: state.room
    };
}

export default connect(mapStateToProps)(RoomNav);
