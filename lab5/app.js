import express from 'express';
import path from 'path'
import authRouter from './routers/authRouter.js'
import http from 'http'
import {
    Server
} from 'socket.io'
import authMiddleware from './middlewares/authMiddleware.js'
import registerBoardHandlers from './handlers/boardHandler.js'
import schema from './schemas/schema.js'
import {
    graphqlHTTP
} from 'express-graphql'
import board from './data.js';

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    maxHttpBufferSize: 1e8,
    cookie: true,
})

app.use(express.static("public"))
const port = 3000

var root = {
    hello: () => {
        return "Hello world!"
    },
    getBoard: () => {
        return board
    },
    addCard: ({
        colId,
        content
    }) => {
        const newCard = {
            id: board.columns[colId].cards.length,
            content
        }

        console.log(newCard)
        board.columns[colId].cards.push(newCard)
        return {
            ...newCard
        }
    },
    addColumn: ({
        colId,
        name
    }) => {
        const newColumn = {
            id: +colId,
            name,
            cards: []
        }
        console.log(newColumn)

        board.columns.push(newColumn)
        return {
            ...newColumn
        }
    },
    deleteColumn: ({
        colId
    }) => {
        board.columns = board.columns.filter(col => col.id != colId)
        return colId
    }
}

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)

app.use('/', authRouter)

app.get('/board', (req, res) => {
    res.sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'board.html'))
});

app.get('/login', authMiddleware, (req, res) => {
    res.sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'login.html'))
});

app.get('/register', authMiddleware, (req, res) => {
    res.sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'register.html'))
});

app.get('/attempt', authMiddleware, () => console.log('auth attempt'))

server.listen(port, () => console.log(`Listening on ${port}`))