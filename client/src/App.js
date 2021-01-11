import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";


import "./assets/styles/theme.css";

import Layout from "./components/Layout/Layout.js";
import Rooms from "./containers/Rooms/Rooms.js";
import Home from "./components/Home/Home.js";
import Profile from "./containers/Profile/Profile.js";
import StatusMessages from './containers/StatusMessages/StatusMessages'

function App(props) {
    const [currentTheme, setTheme] = useState(
        localStorage.getItem("theme") || "dark"
    );

    function toggleTheme() {
        if (currentTheme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    }

    useEffect(() => {
        const socket = io({
            reconnectionAttempts: 5,
        });

        props.updateSocket(socket);

        socket.on("connect", () => {
            const UniqueSessionID = localStorage.getItem('UniqueSessionID') || null;
            const user = {
                name: props.name,
                icon: props.icon,
                visable: props.visable,
                UniqueSessionID: UniqueSessionID
            };
            socket.emit("createUser", user);
            socket.emit("getRooms", null);
        });

        socket.on("statusMsg", (statusMsg) => {
            props.addStatusMessage(statusMsg);

        });
        
        socket.on("connect_failed", () => {
    
            let statusMessage = {
                title: "Connection Error",
                desc: "Unable to connect to server",
                icon: "times",
                status: "ERROR"
            };
            props.addStatusMessage(statusMessage);

        });

        socket.on("disconnect", () => {
            
            let statusMessage = {
                title: "Disconected from server",
                desc: "Reconnecting to server...",
                icon: "bell",
                status: "UPDATE"
            };

            props.updateCurrentRoom(null)
            props.addStatusMessage(statusMessage);

        });

        socket.on("reconnect_failed", () => {
            
            let statusMessage = {
                title: "Connection Failed",
                desc: "Please try again later",
                icon: "times",
                status: "ERROR"
            };
            props.addStatusMessage(statusMessage);

        });

        socket.on("updateUsers", (users, hiddenUsers) => {
            props.updateUsers(users, hiddenUsers);
        });

        socket.on("updateUserState", (user) => {
            localStorage.setItem("name", user.name);
            localStorage.setItem("icon", user.icon);
            localStorage.setItem("visable", user.visable);
            props.updateCurrentUser(user.name, user.icon, user.visable);
        });

        socket.on("updateRooms", (rooms) => {
            props.updateRooms(rooms);
        });


        socket.on("joinedRoom", (room) => {
            props.updateCurrentRoom(room);
        });

        socket.on("receiveMessage", (message) => {
            props.addMessage(message);
        });

        socket.on("leftRoom", () => {
            // Sets current room to null
            props.updateCurrentRoom(null);
            props.clearMessages();
            socket.emit('getRooms', null);
        });

        socket.on("setUniqueSessionID", UniqueSessionID => {
            localStorage.setItem('UniqueSessionID', UniqueSessionID);
        })

        let refreshRooms = setInterval(() => {
            socket.emit("getRooms", null);
        }, 5000);

        return () => {
            socket.disconnect();
            refreshRooms.clearInterval();
        };
    }, []);

    function updateProfile(name, icon, visable) {
        const newUser = {
            name: name,
            icon: icon,
            visable: visable,
        };
        props.socket.emit("updateUser", newUser);
    }

    return (
        <BrowserRouter>
            <div className={`${currentTheme}`}>
                <Layout toggleTheme={toggleTheme}>
                    <StatusMessages />
                    <Switch>
                        <Route path="/rooms" component={Rooms} />
                        <Route
                            path="/profile"
                            exact
                            render={() => <Profile clicked={updateProfile} />}
                        />
                        <Route path="/home" component={Home} />
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        name: state.name,
        icon: state.icon,
        visable: state.visable,
    };
};

const mapDispachToProps = (dispatch) => {
    return {
        updateSocket: (socket) =>
            dispatch({ type: "UPDATE_SOCKET", socket: socket }),
        updateUsers: (users, hiddenUsers) =>
            dispatch({ type: "UPDATE_USERS", users: users, hiddenUsers: hiddenUsers }),
        updateCurrentUser: (name, icon, visable) =>
            dispatch({
                type: "UPDATE_CURRENT_USER",
                name: name,
                icon: icon,
                visable: visable,
            }),
        updateRooms: (rooms) =>
            dispatch({ type: "UPDATE_ROOMS", rooms: rooms }),
        updateCurrentRoom: (room) =>
            dispatch({ type: "UPDATE_CURRENT_ROOM", room: room }),
        addMessage: (message) =>
            dispatch({ type: "ADD_MESSAGE", message: message }),
        clearMessages: () => dispatch({ type: "CLEAR_MESSAGES" }),
        addStatusMessage: (msg) => dispatch({ type: "ADD_STATUS_MESSAGE", statusMessage: msg}),
        
    };
};

export default connect(mapStateToProps, mapDispachToProps)(App);
