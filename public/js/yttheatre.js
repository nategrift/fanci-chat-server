const socket = io('/youtube-theatre');

let videoID = '';

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

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerReady() {
    player.playVideo();
}
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        let video = {
            videoID: videoID,
            playing: true,
            timestamp: player.getCurrentTime().toFixed(2),
        };
        socket.emit('sendPlayVideo', video);
    } else if (event.data == YT.PlayerState.PAUSED) {
        let video = {
            videoID: videoID,
            playing: false,
            timestamp: player.getCurrentTime().toFixed(2),
        };
        socket.emit('sendPlayVideo', video);
    } else if (event.data == YT.PlayerState.ENDED) {
        console.log('video ended');
    }
}
function stopVideo() {
    player.stopVideo();
}

function controlsClickHandler() {
    overlay.classList.toggle('show-overlay');
    controlsPanel.classList.toggle('show-control-panel');
}

let overlay = document.querySelector('#overlay');
let controls = document.querySelector('#controls');
let controlsPanel = document.querySelector('#control-panel');
let form = document.querySelector('#form');
let xButton = document.querySelector('.x-button');

form.addEventListener('submit', searchVideo);

controls.addEventListener('click', controlsClickHandler);
xButton.addEventListener('click', controlsClickHandler);

function searchVideo(e) {
    e.preventDefault();

    let input = document.querySelector('#form').children[0];

    let videoName = input.value;
    input.value = '';

    socket.emit('searchVideo', videoName);
}

socket.on('requestVideo', () => {
    if (videoID != '') {
        let video = {
            videoID: videoID,
            playing: true,
            timestamp: 0,
        };

        // Check if the video is playing

        let isplaying = player.getPlayerState();
        if (isplaying && isplaying != 1 && isplayer != 3) {
            video.playing = false;
        }

        // get time
        video.timestamp = player.getCurrentTime().toFixed(2);
        socket.emit('requestVideoCallback', video);
    }
});

socket.on('playVideo', (video) => {
    console.log('playing vido');

    if (video.videoID != videoID) {
        player.loadVideoById(video.videoID, video.timestamp);

        videoID = video.videoID;
    } else {
        let time = parseInt(video.timestamp);
        let mytime = player.getCurrentTime().toFixed(2);

        if (time > mytime + 3 || time < mytime - 3) {
            player.seekTo(video.timestamp, true);
            console.log('changing time');
        }
    }

    if (video.playing != true) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

socket.on('searchResults', (results) => {
    console.log(results.items);
    let list = [];
    results.items.forEach((item) => {
        if (item.id.kind === 'youtube#video') {
            let listItem = {};
            listItem.id = item.id.videoId;
            listItem.creator = item.snippet.channelTitle;
            listItem.title = item.snippet.title;
            listItem.description = item.snippet.description;
            listItem.img = item.snippet.thumbnails.medium.url;
            list.push(listItem);
        }
    });
    listVue.videoList = list;
});

const listVue = new Vue({
    data: {
        videoList: [],
    },
    methods: {
        playVid: (vidid) => {
            if (vidid != videoID) {
                videoID = vidid;
                player.loadVideoById(vidid, 0);
                player.playVideo();
                let video = {
                    videoID: vidid,
                    playing: true,
                    timestamp: 0,
                };
                socket.emit('sendPlayVideo', video);

                controlsClickHandler();
            }
        }
    },
}).$mount('#list');

controlsClickHandler();


