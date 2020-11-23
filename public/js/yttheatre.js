

const socket = io('/youtube-theatre');

let videoID = 'R7klyFU_6xM';


let tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
            let video = {
                videoID: videoID,
                playing: true,
                timestamp: player.getCurrentTime().toFixed(2),
            }
            socket.emit('sendPlayVideo', video);
            console.log('playing')
        
    } else if (event.data == YT.PlayerState.PAUSED) {

        let video = {
            videoID: videoID,
            playing: false,
            timestamp: player.getCurrentTime().toFixed(2),
        }
        socket.emit('sendPlayVideo', video);
        console.log('pausing')
    
    } else if (event.data == YT.PlayerState.ENDED) {
        console.log('video ended')
    }   
}
function stopVideo() {
    player.stopVideo();
}

function playVideoWithURL(e) {
    e.preventDefault();
    let input = document.querySelector('#form').children[0];
    
    let vidid = input.value;
    input.value = '';

    if (vidid != videoID) {
        videoID = vidid;
        player.loadVideoById(vidid, 0)
        player.playVideo();
        let video = {
            videoID: vidid,
            playing: true,
            timestamp: 0,
        }
        socket.emit('sendPlayVideo', video);

        controlsClickHandler();
    }


}

function controlsClickHandler() {
    overlay.classList.toggle('show-overlay');
    controlsPanel.classList.toggle('show-control-panel');
}

let overlay = document.querySelector('#overlay');
let controls = document.querySelector('#controls');
let controlsPanel = document.querySelector('#control-panel');
let form = document.querySelector('#form')

form.addEventListener('submit', playVideoWithURL)

controls.addEventListener('click', controlsClickHandler);

socket.on('requestVideo', () => {
    
    let video = {
        videoID: videoID,
        playing: true,
        timestamp: 0,
    }

    // Check if the video is playing


    let isplaying = player.getPlayerState();
    if (isplaying && isplaying != 1 && isplayer != 3) {
        video.playing = false;
    }

    // get time
    video.timestamp = player.getCurrentTime().toFixed(2)
    socket.emit('sendPlayVideo', video);
})

socket.on('playVideo', (video) => {

    if (video.videoID != videoID) {
        player.loadVideoById(video.videoID, video.timestamp);

        videoID = video.videoID;
    } else {
        let time = parseInt(video.timestamp);
        let mytime = player.getCurrentTime().toFixed(2);

        console.log(time);
        console.log(mytime);
        if (time > mytime + 3 || time < mytime - 3) {
            player.seekTo(video.timestamp, true)
            console.log('changing time')
        } 
    }

    if (video.playing != true) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }

}) 