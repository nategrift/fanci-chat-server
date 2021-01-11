import React, { useState } from "react";
import { connect } from "react-redux";

import RoomCard from "../../../components/RoomCard/RoomCard";

import classes from "./RoomNav.module.css";
import "../../../assets/styles/button.css";
import "../../../assets/styles/infoBottom.css";
import "../../../assets/styles/subButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/styles/header.css";

import addButton from "../../../assets/images/add-icon.svg";

function RoomNav(props) {
    const [Search, setSearch] = useState(null);

    function searchRooms(event) {
        let value = event.currentTarget.value;
        if (value === "") {
            value = null;
        }

        setSearch(value);
    }

    let publicRooms = null;
    let privateRooms = null;
    if (props.rooms) {
        publicRooms = props.rooms.filter((item) => item.private === false);
        privateRooms = props.rooms.filter((item) => item.private === true);
    }

    let publicRoomsList = null;
    let privateRoomsList = null;

    if (publicRooms && publicRooms.length !== 0) {
        publicRooms = publicRooms.filter((room) => {
            let compressedName = room.roomName
                .toLowerCase()
                .replace(/\s+/g, "");
            let searchValue = null;
            if (Search != null) {
                searchValue = Search.toLowerCase().replace(/\s+/g, "");
            }
            if (Search != null && !compressedName.includes(searchValue)) {
                return false;
            } else {
                return true;
            }
        });
        publicRoomsList = publicRooms.map((room) => (
            <RoomCard
                room={room}
                clicked={() => {
                    joinRoom(room);
                }}
                key={room.roomID}
            />
        ));
    }

    if (publicRoomsList === null || publicRoomsList.length < 1) {
        publicRoomsList = (
            <p className={classes.noRoomInfo}>No Public Rooms Available</p>
        );
    }

    if (privateRooms && privateRooms.length !== 0) {
        privateRooms = privateRooms.filter((room) => {
            
            let compressedName = room.roomName
                .toLowerCase()
                .replace(/\s+/g, "");
            let searchValue = null;
            if (Search != null) {
                searchValue = Search.toLowerCase().replace(/\s+/g, "");
            }

            
            if (Search != null && !compressedName.includes(searchValue)) {
                return false;
            } else {
                return true;
            }
        });
        privateRoomsList = privateRooms.map((room) => (
            <RoomCard
                room={room}
                clicked={() => {
                    joinRoom(room);
                }}
                key={room.roomID}
            />
        ));
    }
    if (privateRoomsList === null || privateRoomsList.length < 1) {
        privateRoomsList = (
            <p className={classes.noRoomInfo}>No Private Rooms Available</p>
        );
    }

    function joinRoom(room) {
        if (props.room) {
            if (props.room.roomID !== room.roomID) {
                props.socket.emit("leaveRoom", null);
                if (room.private) {
                    props.joinRoomHandler(null, true, room);
                } else {
                    props.socket.emit("joinRoom", room.roomID);
                }
            }
        } else if (!props.room) {
            if (room.private) {
                props.joinRoomHandler(null, true, room);
            } else {
                props.socket.emit("joinRoom", room.roomID);
            }
        }
    }

    function reloadRooms() {
        props.socket.emit("getRooms", null);
    }

    const privateInfoMsg = (
        <p className={classes.privateInfoMsg}>
            <FontAwesomeIcon icon="key" />
            Private rooms need passwords to enter
        </p>
    );

    return (
        <div className={classes.RoomNav}>
            <div className="header">
                <h1>Chat Rooms</h1>
                <button
                    className={classes.addButton}
                    onClick={props.createRoomHandler}
                >
                    {" "}
                    Create Room <img src={addButton} alt="+"></img>{" "}
                </button>
            </div>
            <div className={classes.roomType}>
                <button
                    onClick={() => props.toggleSections("public")}
                    className={`${
                        props.isSectionPublic ? "buttonActive" : null
                    } button`}
                >
                    <FontAwesomeIcon icon="users" /> Public
                </button>
                <button
                    onClick={() => props.toggleSections("private")}
                    className={`${
                        props.isSectionPublic ? null : "buttonActive"
                    } button`}
                >
                    <FontAwesomeIcon icon="lock" /> Private
                </button>
            </div>
            <div className={classes.roomsList}>
                <div className={classes.searchBar}>
                    <label htmlFor="Search">
                        <FontAwesomeIcon icon="search" />
                    </label>
                    <input
                        placeholder="Search.."
                        type="text"
                        name="search"
                        value={Search || ''}
                        autoComplete="off"
                        onChange={searchRooms}
                    ></input>
                    <p className={Search != null && Search != '' ? classes.searchBarTyping : null} onClick={() => setSearch('')}><FontAwesomeIcon icon="times" /></p>
                </div>
                {!props.isSectionPublic ? privateInfoMsg : null}
                <ul className={classes.roomsListElement}>
                    {props.isSectionPublic ? publicRoomsList : privateRoomsList}
                </ul>
                <div
                    onClick={reloadRooms}
                    className={classes.ReloadIcon}
                    title="Update Rooms"
                >
                    <FontAwesomeIcon icon="sync" />
                </div>
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

const mapStateToProps = (state) => {
    return {
        rooms: state.rooms,
        socket: state.socket,
        room: state.room,
    };
};

export default connect(mapStateToProps)(RoomNav);
