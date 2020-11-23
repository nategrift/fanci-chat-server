let activeUsers = []

// Youtube Theatre Socket
module.exports.connectionEstablished = (socket) => {

    // Push user to active users
    activeUsers.push(socket);

    console.log(activeUsers.length)

    // Remove user
    socket.on('disconnect', () => {
        let userIndex = activeUsers.findIndex(user => user == socket);
        if (!userIndex) {
            return;
        }
        activeUsers = activeUsers.slice(userIndex, 1);
    })

    // Request Video
    if (activeUsers[0] != null && activeUsers[0] != socket) {
        activeUsers[0].emit('requestVideo');
    }

    // Play video from response
    socket.on('sendPlayVideo', (video) => {
        socket.broadcast.emit('playVideo', video);
    })
};
