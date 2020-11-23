const express = require('express');
const bodyParser = require('body-parser');

const compression = require('compression');
const fanciAPIController = require('./controllers/fanciAPIController');
const youtubeTheatre = require('./controllers/youtubeTheatre');


const rootDir = require('./util/path');

const app = express();
app.use(compression());

const path = require('path');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const youtubeAPI = io.of('/youtube-theatre');
const fanci = io.of('/fanci');


youtubeAPI.on('connection', youtubeTheatre.connectionEstablished);  
fanci.on('connection', fanciAPIController.connectionEstablished);  



app.use(bodyParser.urlencoded({extended: false}));
 
app.use(express.static(path.join(rootDir, 'build')))
 
app.use(express.static(path.join(rootDir, 'public')))

app.get('/youtube-theatre', (req,res) =>{
    res.sendFile(path.join(rootDir, 'views', 'yttheatre.html'));
});

app.use('/', (req,res) =>{
    res.sendFile(path.join(rootDir, 'build', 'index.html'));
});


app.use(express.static(path.join(rootDir, 'build')))




server.listen(process.env.PORT || 5000);





