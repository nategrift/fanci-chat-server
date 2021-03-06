const express = require('express');
const bodyParser = require('body-parser');

const compression = require('compression');
const fanciAPIController = require('./controllers/fanciAPIController');

const rootDir = require('./util/path');

const app = express();
app.use(compression());

const path = require('path');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', fanciAPIController.connectionEstablished);  


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'client' ,'build')))

// All paths go to index.html
app.use('/', (req,res) =>{
    res.sendFile(path.join(rootDir, 'client' , 'build', 'index.html'));
});

server.listen(process.env.PORT || 5000);





