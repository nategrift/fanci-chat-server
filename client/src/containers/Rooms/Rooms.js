import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import RoomNav from './RoomNav/RoomNav';
import Room from './Room/Room';
import OnlineList from '../OnlineList/OnlineList';

import CreateRoom from '../CreateRoom/CreateRoom';

import classes from './Rooms.module.css';
import JoiningRoom from '../JoiningRoom/JoiningRoom';

function Rooms(props) {
    // Active sections
    const SECTIONS = {
        RoomNav: 'roomnav',
        OnlineList: 'onlinelist',
    };

    // Opens UI
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [joiningRoom, setJoiningRoom] = useState(false);
    const [roomToJoin, setRoomToJoin] = useState(null);

    // Active Section - Mobile Support
    const [activeSection, setActiveSection] = useState(SECTIONS.RoomNav);

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
        props.socket.emit('joinRoom', roomToJoin.roomID, password);
    }

    function toggleSections(id) {
        if (id === 'public') {
            setIsSectionPublic(() => true);
        } else {
            setIsSectionPublic(() => false);
        }
    }

    function setSection(section) {
        setActiveSection(section);
        console.log(activeSection);
        console.log(section);
    }

    function hideSections() {
        if (activeSection != null) {
            setActiveSection(null);
        }
        console.log('hey');
    }

    useEffect(() => {
        if (props.socket) {
            props.socket.on('successfulJoinPrivateRoom', () => {
                setJoiningRoom(false);
            });
            props.socket.on('joinedRoom', () => {
                setActiveSection(null);
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

    let roomnavclasses;
    let roomclasses;
    let onlineclasses;
    // Assign classes if screen is smaller than 800
    if (window.screen.width < 1200) {
        roomnavclasses = `${classes.mobileSection} ${classes.sectionNav} ${
            activeSection === SECTIONS.RoomNav
                ? `${classes.sectionNavShown} ${classes.sectionShown} ${
                      !props.room ? classes.noRoomSection : null
                  }`
                : null
        }`;
        roomclasses = `${classes.mobileSection} ${classes.sectionRoom} ${
            activeSection === SECTIONS.Room ? classes.sectionShown : null
        }`;
        onlineclasses = `${classes.mobileSection} ${
            classes.sectionOnlineList
        } ${
            activeSection === SECTIONS.OnlineList
                ? `${classes.sectionOnlineListShown} ${classes.sectionShown}`
                : null
        }`;
    }

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
            <div className={roomnavclasses}>
                <RoomNav
                    createRoomHandler={createRoomHandler}
                    joinRoomHandler={joinRoomHandler}
                    toggleSections={toggleSections}
                    isSectionPublic={isSectionPublic}
                />
            </div>
            <div onClick={hideSections} className={roomclasses}>
                <Room SECTIONS={SECTIONS} setSection={setSection} />
            </div>
            <div className={onlineclasses}>
                <OnlineList />
            </div>
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
