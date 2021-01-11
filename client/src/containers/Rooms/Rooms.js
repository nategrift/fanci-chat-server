import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import RoomNav from "./RoomNav/RoomNav";
import Room from "./Room/Room";
import OnlineList from "../OnlineList/OnlineList";

import CreateRoom from "../CreateRoom/CreateRoom";

import classes from "./Rooms.module.css";
import JoiningRoom from "../JoiningRoom/JoiningRoom";

function Rooms(props) {
    // Opens UI
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [joiningRoom, setJoiningRoom] = useState(false);
    const [roomToJoin, setRoomToJoin] = useState(null);
    const [onlineListOpen, setOnlineListOpen] = useState(true);

    // Which list of rooms is viewing
    const [isSectionPublic, setIsSectionPublic] = useState(true) || null;


    function createRoomHandler(e, value) {
        e.preventDefault();
        setCreatingRoom(value || !creatingRoom);
    }

    function joinRoomHandler(e, value, room) {
        if (e) {
            e.preventDefault();
        }
        setJoiningRoom(value || !joiningRoom);
        if (room) {
            setRoomToJoin(room);
        }
    }

    function requestJoinRoom(event, password) {
        event.preventDefault();
        props.socket.emit("joinRoom", roomToJoin.roomID, password);
    }

    function toggleSections(id) {
        if (id === 'public') {
            setIsSectionPublic(() => true)
        } else  {
            setIsSectionPublic(() => false)
        }
    }

    function toggleOnlineView() {
        setOnlineListOpen(!onlineListOpen)
    }

    
    useEffect(() => {
        if (props.socket) {
            props.socket.on("successfulJoinPrivateRoom", () => {
            setJoiningRoom(false)
        });
        }
    }, [props.socket]);

    useEffect(() => {
        if (props.room) {
            if (props.room.private === true && isSectionPublic) {
                setIsSectionPublic(false);
            } else if (props.room.private === false && !isSectionPublic) {
                setIsSectionPublic(true);
            }
        }
    }, [props.room]);

    return (
        <div className={`${classes.Rooms} ${onlineListOpen ? null : classes.onlineClosed}`}>
            {creatingRoom ? (
                <CreateRoom createRoomHandler={createRoomHandler} />
            ) : null}
            {joiningRoom ? (
                <JoiningRoom
                    joinRoomHandler={joinRoomHandler}
                    click={requestJoinRoom}
                    roomName={roomToJoin.roomName}
                />
            ) : null}
            <RoomNav
                createRoomHandler={createRoomHandler}
                joinRoomHandler={joinRoomHandler}
                toggleSections={toggleSections}
                isSectionPublic={isSectionPublic}
            />
            <Room  toggleSideBar={toggleOnlineView} sideDrawOpen={onlineListOpen}/>
            <OnlineList/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        room: state.room,
    };
};

export default connect(mapStateToProps)(Rooms);
