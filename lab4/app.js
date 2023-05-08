import express from 'express';
import path from 'path'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'
import mainRouter from './routers/mainRouter.js'
// import authRouter from './routers/authRouter.js'
import http from 'http'
import {
    Server
} from 'socket.io'
import registerBoardHandlers from './boardHandler.js'

const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.use(express.static("public"));
const port = 3000;

app.get('/board', (req, res) => {
    res.sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'board.html'))
});

const onConnection = (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    registerBoardHandlers(io, socket)
}

io.on('connection', onConnection);

// app.use(express.static('public'));
// app.use(bodyParser.json());
// app.use(express.urlencoded({
//     extended: true
// }))

// app.use(express.json())

// const upload = multer({
//     dest: "public/files/"
// });

// app.use('/', mainRouter)
// app.use('/', authRouter)

server.listen(port, () => console.log(`Listening on ${port}`));