import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import RoomNav from "../../components/Rooms/RoomNav/RoomNav";
import Room from "../../components/Rooms/Room/Room";
import OnlineList from "../../components/OnlineList/OnlineList";

import CreateRoom from "../CreateRoom/CreateRoom";

import classes from "./Rooms.module.css";
import JoiningRoom from "../JoiningRoom/JoiningRoom";

function Rooms(props) {
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [joiningRoom, setJoiningRoom] = useState(false);
    const [roomToJoin, setRoomToJoin] = useState(null);

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

    useEffect(() => {
        if (props.socket) {
            props.socket.on("successfulJoinPrivateRoom", () => {
            setJoiningRoom(false)
        });
        }
    }, [props.socket]);

    return (
        <div className={classes.Rooms}>
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
            />
            <Room />
            <OnlineList />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
    };
};

export default connect(mapStateToProps)(Rooms);
