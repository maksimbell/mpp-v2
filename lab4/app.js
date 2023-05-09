import express from 'express';
import path from 'path'
import authRouter from './routers/authRouter.js'
import http from 'http'
import {
    Server
} from 'socket.io'
import registerBoardHandlers from './handlers/boardHandler.js'
import registerAuthHandlers from './handlers/authHandler.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    maxHttpBufferSize: 1e8,
    cookie: true,
})

app.use(express.static("public"))
const port = 3000

app.get('/board', (req, res) => {
    res.sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'board.html'))
});

const onConnection = (socket) => {
    console.log('Connected')
    socket.on('disconnect', () => {
        console.log('Disconnected')
    })

    registerBoardHandlers(io, socket)
    registerAuthHandlers(io, socket)
}

io.on('connection', onConnection)
app.use('/', authRouter)

server.listen(port, () => console.log(`Listening on ${port}`))