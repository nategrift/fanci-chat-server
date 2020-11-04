let rooms = require("../data/rooms");

const privateRoomsPasswords = [];
let browserUniqueID = [];

const listOfRoomIcons = [
    "users",
    "coffee",
    "couch",
    "code",
    "gamepad",
    "icons",
    "chess-rook",
    "book",
    "star",
    "biohazard",
];

let users = [];

// Server Msg Socket
module.exports.connectionEstablished = (socket) => {
    sendStatus(
        "Connected to Server",
        `${users.length + 1} users are active`,
        "SUCCESS"
    );

    socket.on("createUser", (rawUserData) => {
        const user = {
            id: socket.id,
            name: "Guest",
            icon: "user-circle",
            visable: true,
            room: null,
        };

        
        let matchedSessionID = browserUniqueID.filter(item => item.UniqueSessionID == rawUserData.UniqueSessionID);

        if (rawUserData.UniqueSessionID && matchedSessionID.length > 0) {
            sendStatus("Already Connected Elsewhere", "Error", "ERROR")
            socket.disconnect();
            
            } else {
                UniqueSessionID = String(Math.random());
                UniqueSessionIDKey = String(socket.id);
        
                browserUniqueID.push({UniqueSessionID: UniqueSessionID, UniqueSessionIDKey: UniqueSessionIDKey})
                socket.emit('setUniqueSessionID', UniqueSessionID)
                users.push(user);
                updateUser(rawUserData, true);
            }
            
        
    });

    socket.on("reconnect", (rawUserData) => {
        sendStatus(
            "Reconnected to Server",
            `${users.length + 1} users are active`,
            "SUCCESS"
        );
    });

    socket.on("disconnecting", () => {

        // Leave room
        leaveRoom();
    
        // Remove User from users
        users = users.filter((item) => item.id !== socket.id);

        // Update Users for people
        updateUsers();

        // Remove Session ID
        if (browserUniqueID.length > 0) {
            browserUniqueID = browserUniqueID.filter((item) => item.UniqueSessionIDKey != socket.id);
        }
    });

    socket.on("updateUser", (rawUserData) => {
        let didUpdate = updateUser(rawUserData);
        didUpdate ? sendStatus("Profile Updated", "Success", "SUCCESS") : null;
    });

    socket.on("sendMessage", (msg) => {
        if (msg.trim(" ") !== "" && msg != null) {
            let user = getUser();

            let message = {
                user: user.name,
                message: msg,
                time: getTime(),
                isUser: true,
                key: Math.random(),
            };
            socket.emit("receiveMessage", message);

            message.isUser = false;
            socket.to(user.room.roomID).emit("receiveMessage", message);
        }
    });

    socket.on("getRooms", () => {
        socket.emit("updateRooms", rooms);
    });

    socket.on("leaveRoom", () => {
        leaveRoom();
    });

    socket.on("joinRoom", (joiningRoomId, password) => {
        const room = getRoom(joiningRoomId);

        if (room) {
            if (room.private) {
                const roomForPassword = privateRoomsPasswords.filter(
                    (room) => room.roomID == joiningRoomId
                )[0];
                if (roomForPassword.password === password) {
                    socket.emit('successfulJoinPrivateRoom')
                    joinedRoom(room, password);
                    sendStatus(
                        `Joined ${room.roomName}`,
                        "Joined Private Room",
                        "SUCCESS"
                    );

                } else {
                    sendStatus(
                        `Error joining ${room.roomName}`,
                        "Incorrect Password",
                        "ERROR"
                    );
                }
            } else {
                joinedRoom(room);
            }
        } else {
            sendStatus(
                `Error joining ${joiningRoomId || "room"}`,
                "Could not find room",
                "ERROR"
            );
        }
    });

    socket.on("createRoom", (newRoom, password) => {
        if (newRoom["roomName"]) {
            let checkedRoom = {
                icon: "users",
                roomName: "a room",
                numberOnline: 0,
                hasSheild: false,
                roomID: "a-room",
                private: false,
            };

            let addRoom = false;
            let errmsg = null;

            // Check Icon
            if (listOfRoomIcons.includes(newRoom.icon)) {
                checkedRoom.icon = newRoom.icon;
            }

            // Checking Room
            const containsRoom = rooms.filter((room) => {
                room.roomName.trim(" ") == newRoom.roomName.trim(" ");
            });

            if (
                containsRoom.length === 0 &&
                newRoom.roomName.substr(0, 18) == newRoom.roomName && newRoom.roomName.trim(" ") != ""
            ) {
                checkedRoom.roomName = newRoom.roomName;
                addRoom = true;
            } else {
                errmsg = "Invalid Room Name";
            }

            // Add ID to room
            if (addRoom) {
                let id = checkedRoom.roomName;
                id = id.replace(/[^\w\s-]/g, "");
                id = id.replace(/[^\w-]/g, "-");
                id = id.toLowerCase();
                checkedRoom.roomID = id;
            }

            // Check if valid password
            if (newRoom.private) {
                if (password) {
                    checkedRoom.private = true;
                    if (password.length < 1) {
                        addRoom = false;
                        errmsg = "Invalid Password, needs 2 characters";
                    }
                } else {
                    addRoom = false;
                    errmsg = "Private Room's need a Password";
                }
            }

            if (addRoom) {
                rooms.push(checkedRoom);
                if (checkedRoom.private) {
                    privateRoomsPasswords.push({
                        roomID: checkedRoom.roomID,
                        password: password,
                    });
                }

                sendStatus(
                    `Created ${checkedRoom.roomName}`,
                    `Success`,
                    "SUCCESS",
                    "door-open"
                );

                socket.emit("updateRooms", rooms);
                socket.broadcast.emit("updateRooms", rooms);
                joinedRoom(checkedRoom, password);
            } else {
                sendStatus(
                    `Error Creating Room`,
                    errmsg,
                    "ERROR",
                    "door-closed"
                );
            }
        } else {
            sendStatus(
                `Error Creating Room`,
                "Room needs a name",
                "ERROR"
            );
        }
    });

    function sendStatus(title, description, status, icon) {
        if (status == "ERROR") {
            backupIcon = "times";
        }
        if (status == "UPDATE") {
            backupIcon = "bell";
        }
        if (status == "SUCCESS") {
            backupIcon = "check";
        }

        let statusMessage = {
            title: title,
            desc: description,
            icon: icon || backupIcon,
            status: status,
        };
        socket.emit("statusMsg", statusMessage);
    }

    function getUser() {
        const userIndex = users.findIndex((item) => item.id == socket.id);
        const user = users[userIndex];
        return user;
    }

    function getRoom(roomID) {
        const roomIndex = rooms.findIndex((item) => item.roomID == roomID);
        const room = rooms[roomIndex];
        return room;
    }

    function joinedRoom(room, password) {
        let user = getUser();
        socket.join(room.roomID);

        room.numberOnline = room.numberOnline + 1;

        leaveRoom();

        const time = getTime();

        // Construct Join Message
        let message = {
            user: null,
            message: `${user.name || "someone"} joined the chat`,
            time: time,
            isUser: false,
            key: Math.random(),
        };

        socket.to(room.roomID).emit("receiveMessage", message);
        socket.to(room.roomID).emit("updateRooms", rooms);

        user.room = room;

        if (password) {
            room.password = password;
        } else {
            room.password = "Congrats, you found a glitch. You weren't supposed to be able copy this";
        }

        socket.emit("joinedRoom", room);
        socket.emit("updateRooms", rooms);
        updateUsers(room.roomID);
    }

    function getTime() {
        const date = new Date();

        let hour = date.getHours();
        let timeOfDay = null;
        if (hour >= 12) {
            hour = hour - 12;
            if (hour == 0) {
                hour = 12;
            }
            timeOfDay = "PM";
        } else {
            timeOfDay = "AM";
        }

        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = `${0}${minutes}`;
        }

        return `${hour}:${minutes} ${timeOfDay}`;
    }

    function updateUsers(toRoom) {
        const visableUsers = users.filter((item) => item.visable === true);
        const hiddenUsers = users.filter((item) => item.visable === false)
            .length;

        if (toRoom) {
            socket.to(toRoom).emit("updateUsers", visableUsers, hiddenUsers);
            socket.emit("updateUsers", visableUsers, hiddenUsers);
        } else {
            socket.broadcast.emit("updateUsers", visableUsers, hiddenUsers);
            socket.emit("updateUsers", visableUsers, hiddenUsers);
        }
    }

    function leaveRoom() {
        let user = getUser();
        if (!user) {
            return;
        }
        if (user.room) {
            let room = getRoom(user.room.roomID);

            if (room != null) {
                room.numberOnline = room.numberOnline - 1;
                rooms = rooms.filter((room) => {
                    if (room.numberOnline == 0) {
                        if (!room.hasSheild) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                });
            }

            const time = getTime();

            // Construct Leave Message
            let message = {
                user: null,
                message: `${user.name || "someone"} left the chat`,
                time: time,
                isUser: false,
                key: Math.random(),
            };

            socket.to(user.room.roomID).emit("receiveMessage", message);
            socket.to(user.room.roomID).emit("updateRooms", rooms);
            socket.emit("updateRooms", rooms);

            socket.leave(user.room.roomID);
            user.room = null;
            socket.emit("leftRoom", null);
        }
    }

    function updateUser(rawUserData, newUser) {
        let user = getUser();
        let shouldUpdated = false;
        let wentHidden = false;

        let updatedUserReturn = {
            name: user.name,
            icon: user.icon,
            visable: user.visable,
        };

        //Update Name if required
        if (
            rawUserData.name.trim(" ") != "" &&
            rawUserData.name &&
            rawUserData.name != user.name
        ) {
            user.name = rawUserData.name;
            updatedUserReturn.name = rawUserData.name;
            shouldUpdated = true;
        }

        // Update Visibility if required
        if (
            rawUserData.visable != null &&
            rawUserData.visable !== user.visable
        ) {
            user.visable = rawUserData.visable;
            updatedUserReturn.visable = rawUserData.visable;
            wentHidden = true;
        }

        // Update Icon if required
        if (user.icon != rawUserData.icon) {
            user.icon = rawUserData.icon;
            updatedUserReturn.icon = rawUserData.icon;
            shouldUpdated = true;
        }

        // Update everyones accounts
        if (shouldUpdated || wentHidden) {
            updateUsers();
            socket.emit("updateUserState", updatedUserReturn);
        } else {
            if (newUser) {
                updateUsers();
                sendStatus("Logged in as Guest", "Go to Profile to change name", "UPDATE");
            } else {

                sendStatus("Error Saving Profile", "Invalid Entry", "ERROR");
            }
        }
        if (wentHidden && !shouldUpdated) {
            if (!updatedUserReturn.visable) {
                sendStatus(
                    "Your Hidden",
                    "Hidden Mode Enabled",
                    "UPDATE",
                    "user-secret"
                );
            } else {
                sendStatus(
                    "Your Visable",
                    "Hidden Mode Disabled",
                    "UPDATE",
                    "user-circle"
                );
            }
            return false;
        } else {
            return shouldUpdated;
        }
    }
};
