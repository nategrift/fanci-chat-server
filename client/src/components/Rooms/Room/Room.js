import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import Message from "./Message/Message";

import classes from "./Room.module.css";

import "../../../assets/styles/subButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import sendIcon from "../../../assets/images/send-icon.svg";

function Room(props) {

    let msgList = props.msgs.map((msg) => {
        return (
            <Message
                user={msg.user}
                message={msg.message}
                time={msg.time}
                isUser={msg.isUser}
                key={msg.key}
            />
        );
    });

    

    let room = (
        <h2 className={classes.centerInstructions}>
            Please select a room to join
        </h2>
    );

    function SendMsg(event) {
        event.preventDefault();
        const text = event.currentTarget[0].value;

        if (text.trim(' ') !== '') {
            event.currentTarget[0].value = "";
            props.socket.emit("sendMessage", text);
        }
    }

    function leaveRoom() {
        props.socket.emit("leaveRoom", null);
    }

    useEffect(() => {
        if (props.room) {
            scrollToRef(myRef);
        }
    })

    const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: "smooth" });
    const myRef = useRef(null)


    if (props.room) {
        room = (
            <React.Fragment>
                <div className={classes.RoomHeader}>
                    <FontAwesomeIcon icon={props.room.icon} />
                    <h1>{props.room.roomName}</h1>
                    <button className={`subButton ${classes.leaveButton}`} onClick={leaveRoom}>
                        <FontAwesomeIcon icon="sign-out-alt" /> Leave
                    </button>
                </div>
                    <ul className={classes.RoomList}>
                        {msgList}
                        <li ref={myRef} className={classes.BottomAnchor}></li>
                    </ul>
                <div>
                    <form onSubmit={SendMsg} className={classes.form}>
                        <input
                            type="text"
                            placeholder="Type a message here..."
                        ></input>
                        <button type="submit">
                            <img src={sendIcon} alt="Send"></img>
                        </button>
                    </form>
                </div>
            </React.Fragment>
        );

    }


    return <div className={classes.Room}>{room}</div>;

}

const mapStateToProps = (state) => {
    return {
        room: state.room,
        msgs: state.messages,
        socket: state.socket,
    };
};

export default connect(mapStateToProps)(Room);
