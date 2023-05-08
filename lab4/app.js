import express from 'express';
import path from 'path'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'
// import authRouter from './routers/authRouter.js'
import http from 'http'
import {
    Server
} from 'socket.io'
import registerBoardHandlers from './handlers/boardHandler.js'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e8
})

app.use(express.static("public"));
const port = 3000;

app.get('/board', (req, res) => {
    res.sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'board.html'))
});

const onConnection = (socket) => {
    console.log('Connection now authenticated to receive further events');
    socket.on('disconnect', () => {
        console.log('disconnected');
    });

    registerBoardHandlers(io, socket)
}

io.use((socket, next) => {
    // if (socket.handshake.query && socket.handshake.query.token) {
    //     jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function (err, decoded) {
    //         if (err) return next(new Error('Authentication error'));
    //         socket.decoded = decoded;
    //         next();
    //     });
    // } else {
    //     next(new Error('Authentication error'));
    // }
    next()
}).on('connection', onConnection);

server.listen(port, () => console.log(`Listening on ${port}`));