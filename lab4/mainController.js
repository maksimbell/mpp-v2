import path from 'path'
import data from './data.js'
import fs from 'fs'

const getPage = (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'board.html'))
    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: 'Get error'
        })
    }
}

const getBoard = (req, res) => {
    const board = data
    res.status(200).send(board)
}

const addCard = (req, res) => {
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
}

const addColumn = (req, res) => {
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
}

const deleteColumn = (req, res) => {
    try {
        const id = +req.params.id
        data.columns = data.columns.filter(col => col.id != id)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export default {
    addCard,
    addColumn,
    deleteColumn,
    getBoard,
    getPage
}