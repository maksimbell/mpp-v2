import express from 'express';
import fileUpload from 'express-fileupload'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'

const app = express();
const jsonParser = express.json();
const port = 3000;

app.use(express.static('public'));
const filePath = 'data.json'
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(fileUpload({
    createParentPath: true
}));

app.listen(port, () => console.log(`Listening on ${port}`));

app.get("/board/", (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'board.html'))
    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: 'Get error'
        })
    }
})

app.get('/board/columns', (req, res) => {
    const board = data
    res.send(board)
})

app.post('/board/card', (req, res) => {
    const id = +req.body.id
    //e.target
    const newCard = {
        id: data.columns[id].cards.length,
        content: req.body.content,
    }

    data.columns[id].cards.push(newCard)
})

app.post('/board/column', (req, res) => {
    const newColumn = {
        ...req.body
    }
    data.columns.push(newColumn)
})

const data = {
    name: "First board",
    columns: [{
            id: 0,
            name: "First column",
            cards: [{
                    id: 0,
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                },
                {
                    id: 1,
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit orem ipsum dolor sit amet, consectetur adipiscing elitorem ipsum dolor sit amet, consectetur adipiscing elit"
                }
            ]
        },
        {
            id: 1,
            name: "Second column",
            cards: [{
                id: 0,
                content: "Lorem ipsum fdsghgffdghfgddolor sit amsfddsfdsffsfsfdsfdsfdsfdsfdset, consectetur adipiscing elit."
            }]
        }
    ]
}