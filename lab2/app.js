import express from 'express';
import path from 'path'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'

const app = express();

const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())


const upload = multer({
    dest: "public/files/"
});

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
    res.status(200).send(board)
})

app.put('/board/card', upload.single('file'), (req, res) => {
    try {
        const id = +req.body.id
        const file = req.file

        if (file) {
            const oldPath = req.file.path
            const newPath = `public/files/${req.file.originalname}`

            fs.rename(oldPath, newPath, (err) => {
                if (err)
                    console.error(err)
            })
        }

        const newCard = {
            id: data.columns[id].cards.length,
            content: req.body.content,
            file,
        }

        data.columns[id].cards.push(newCard)
        res.status(200).json(newCard)
    } catch (err) {
        res.sendStatus(500)
    }
})

app.post('/board/column', upload.none(), (req, res) => {
    try {
        const newColumn = {
            ...req.body,
            cards: []
        }
        console.log(newColumn)

        data.columns.push(newColumn)
        res.status(200).json(newColumn)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.delete('/board/column/:id', (req, res) => {
    try {
        const id = +req.params.id
        data.columns = data.columns.filter(col => col.id != id)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
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