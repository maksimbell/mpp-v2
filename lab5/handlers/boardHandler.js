import path from 'path'
import fs from 'fs'
import {
    writeFile
} from "fs";
import data from '../data.js'

export default (io, socket) => {
    const getPage = () => socket.emit('board:get', data)

    const addCard = (card) => {
        console.log(card)
        const id = card.id
        const file = card.file
        console.log(file)

        const newCard = {
            id: data.columns[id].cards.length,
            ...card
        }

        data.columns[id].cards.push(newCard)
        socket.emit('board:addCard', {
            colId: id,
            ...newCard
        })
    }

    const addColumn = (column) => {
        const newColumn = {
            ...column,
            cards: []
        }
        console.log(newColumn)

        data.columns.push(newColumn)
        socket.emit('board:addColumn', newColumn)
    }

    const deleteColumn = (id) => {
        data.columns = data.columns.filter(col => col.id != id)
        socket.emit('board:deleteColumn', id)
    }

    socket.on('board:get', getPage)
    socket.on('board:addCard', addCard)
    socket.on('board:addColumn', addColumn)
    socket.on('board:deleteColumn', deleteColumn)
}