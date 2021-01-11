import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import Backdrop from "../../components/Backdrop/Backdrop";
import RoomIconList from "../../components/RoomIconList/RoomIconList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./CreateRoom.module.css";

import "../../assets/styles/button.css";

const CreateRoom = (props) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("users");

    const passwordRef = useRef(null);

    function setNameHandler(event) {
        let name = event.currentTarget.value;
        setName(name.substr(0, 18));
    }

    function setPassworHandler(event) {
        let password = event.currentTarget.value;
        setPassword(password.substr(0, 18));
    }

    function selectButton(event, value) {
        event.preventDefault();
        setIsPrivate(value);
        passwordRef.current.disabled = !value;
    }

    function selectIcon(icon) {
        setSelectedIcon(icon);
    }

    function submitNewRoom(event) {
        event.preventDefault();
        let newRoom = {
            icon: selectedIcon,
            roomName: name,
            private: isPrivate,
        };
        props.socket.emit("createRoom", newRoom, password);

        props.createRoomHandler(event, false)
    }

    return (
        <Backdrop click={props.createRoomHandler}>
            <div className={classes.CreateRoom}>
                <button
                    className={classes.ClosePopup}
                    onClick={(e) => props.createRoomHandler(e, false)}
                >
                    <FontAwesomeIcon icon="times" />
                </button>
                <div className={classes.CreateRoomInfo}>
                    <h2>Create Room</h2>
                    <FontAwesomeIcon icon="door-open" />
                    <p>
                        Room is not permanent, it will delete after you leave
                        it. Users can join public rooms and they are visible to
                        the public. Private rooms are visible to the public but
                        need a password to enter.
                    </p>
                </div>
                <form className={classes.CreateRoomInput}>
                        <div className={classes.controls}>
                            <div>
                            <h4>Room Type:</h4>
                                <h4>Room Name:</h4>
                                <h4
                                    className={
                                        !isPrivate ? classes.disabledText : null
                                    }
                                >
                                    Room Password:
                                </h4>
                            </div>
                            <div>
                            <div className={classes.buttons}>
                                    <button
                                        className={`button ${
                                            !isPrivate ? "buttonActive" : null
                                        }`}
                                        onClick={(e) => selectButton(e, false)}
                                    >
                                        Public
                                    </button>
                                    <button
                                        className={`button ${
                                            isPrivate ? "buttonActive" : null
                                        }`}
                                        onClick={(e) => selectButton(e, true)}
                                    >
                                        Private
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type a room name here..."
                                    onChange={setNameHandler}
                                    value={name}
                                ></input>
                                <input
                                    type="text"
                                    placeholder="Type password here..."
                                    onChange={setPassworHandler}
                                    ref={passwordRef}
                                    disabled
                                    value={password}
                                ></input>
                                
                            </div>
                        </div>
                        <RoomIconList
                            select={selectIcon}
                            isSelected={selectedIcon}
                        />
                        <div className={classes.createRoom}>
                            <button
                                className="button cancelButton"
                                onClick={(e) =>
                                    props.createRoomHandler(e, false)
                                }
                            >
                                Cancel
                            </button>
                            <button className="button" type="submit" onClick={submitNewRoom}>
                                Create Room
                            </button>
                        </div>
                </form>
            </div>
        </Backdrop>
    );
};

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
    };
};

export default connect(mapStateToProps)(CreateRoom);
