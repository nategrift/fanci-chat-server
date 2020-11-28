const axios = require('axios');

let activeUsers = []

// Youtube Theatre Socket
module.exports.connectionEstablished = (socket) => {

    // Push user to active users
    activeUsers.push(socket);

    
    console.log(activeUsers.length)
    // Remove user
    socket.on('disconnect', () => {
        let userIndex = activeUsers.findIndex(user => user.id == socket.id);
        if (!userIndex) {
            return;
        }
        activeUsers = activeUsers.slice(userIndex, 1);
    })

    // Request Video
    if (activeUsers[0] != null && activeUsers[0] != socket) {
        socket.broadcast.emit('requestVideo');
    }

    // Play video from response
    socket.on('sendPlayVideo', (video) => {
        socket.broadcast.emit('playVideo', video);
    })

    // Play video from response
    socket.on('requestVideoCallback', (video) => {
        socket.emit('playVideo', video);
        console.log(video);
    })


    socket.on('searchVideo', (video) => {
        
          
        const searchString = (`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${video}&key=AIzaSyClb3W2LP_TLBdCQNMlrIyPUHehzTv-Z5w`);
        search(searchString);
    })
    
    const search = async (video) => {
        try {
          const results = await axios.get(video);
          socket.emit('searchResults', results.data);
        } catch (error) {
          console.log(error)
        }
      }
      
};