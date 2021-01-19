import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import Message from "../../../components/Message/Message";

import classes from "./Room.module.css";

import "../../../assets/styles/menuIcon.css";
import "../../../assets/styles/menuPopUp.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import sendIcon from "../../../assets/images/send-icon.svg";

import Backdrop from "../../../components/Backdrop/Backdrop";

function Room(props) {
    const [menuOpen, setMenuOpen] = useState(false);

    let msgList = [];
    props.msgs.forEach((msg, index) => {
        let hideUsername = false;
        let lastMessage = props.msgs[index - 1];
        let lastLastMessage = props.msgs[index - 2];

        if (
            index - 1 > -1 &&
            lastMessage.user === msg.user &&
            lastMessage.user != null
        ) {
            hideUsername = true;
            msgList.pop();

            let previousHideUsername = false;
            if (
                index - 2 > -1 &&
                lastLastMessage.user === lastMessage.user &&
                lastLastMessage.user != null
            ) {
                previousHideUsername = true;
            }
            msgList.push(
                <Message
                    user={lastMessage.user}
                    message={lastMessage.message}
                    time={lastMessage.time}
                    isUser={lastMessage.isUser}
                    key={lastMessage.key}
                    hideUsername={previousHideUsername}
                    hideTime={true}
                />
            );
        }

        msgList.push(
            <Message
                user={msg.user}
                message={msg.message}
                time={msg.time}
                isUser={msg.isUser}
                key={msg.key}
                hideUsername={hideUsername}
                hideTime={false}
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

        if (text.trim(" ") !== "") {
            event.currentTarget[0].value = "";
            props.socket.emit("sendMessage", text);
        }
    }

    function menuClickHandler(event) {
        setMenuOpen(true);
        popup.current.style.top = event.pageY + "px";
        popup.current.style.left = event.pageX + "px";
    }

    const popup = useRef(null);

    function leaveRoom() {
        props.socket.emit("leaveRoom", null);
        setMenuOpen(false);
    }

    const copyToClipboard = str => {
        console.log(room)
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      };

    // Scrolls to last messsage
    useEffect(() => {
        if (props.room) {
            scrollToRef(myRef);
        }
    });

    const scrollToRef = (ref) =>
        ref.current.scrollIntoView({ behavior: "smooth" });
    const myRef = useRef(null);

    if (props.room) {
        room = (
            <React.Fragment>
                <div className={classes.RoomHeader}>
                    <FontAwesomeIcon icon={'bars'} onClick={() => props.setSection(props.SECTIONS.RoomNav)}/>
                    <FontAwesomeIcon icon={props.room.icon} />
                    
                    <h1>{props.room.roomName}</h1>
                    <div
                        onClick={menuClickHandler}
                        className={classes.menuButton}
                    >
                        <button className="menuIcon"></button>
                    </div>
                    <FontAwesomeIcon icon={'users'} onClick={() => props.setSection(props.SECTIONS.OnlineList)}/>
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

    return (
        <React.Fragment>
            <div className={classes.Room}>{room}</div>
            <div className={`${!menuOpen ? classes.openMenu : null} ${classes.popUpMenu}`}>
                <Backdrop click={() => setMenuOpen(false)} isTransparent={true}>
                    <ul className="menuPopUp" ref={popup}>
                        <li>
                            <div onClick={leaveRoom}>
                                <FontAwesomeIcon icon="sign-out-alt" />
                                <p>Leave Room</p>
                            </div>
                        </li>
                        {props.room && props.room.private ? <li>
                            <div onClick={() => copyToClipboard(props.room.password)}>
                                <FontAwesomeIcon icon="key" />
                                <p>Copy Password</p>
                            </div>
                        </li> : null}
                        <li>
                            <div onClick={() => copyToClipboard(props.room.roomName)}>
                                <FontAwesomeIcon icon="copy" />
                                <p>Copy Room Name</p>
                            </div>
                        </li>
                    </ul>
                </Backdrop>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        room: state.room,
        msgs: state.messages,
        socket: state.socket,
    };
};

export default connect(mapStateToProps)(Room);
