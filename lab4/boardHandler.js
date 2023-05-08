import path from 'path'
import fs from 'fs'
import {
    writeFile
} from "fs";
import data from './data.js'

export default (io, socket) => {
    const getPage = () => {
        socket.emit('board:get', data)
        console.log('trying')
    }

    const addCard = (card) => {
        console.log(card)
        const id = card.id
        const file = card.file

        if (file) {
            writeFile("/public/files", file, (err) => {
                callback({
                    message: err ? "failure" : "success"
                });
            });
        }

        const newCard = {
            ...card
        }

        data.columns[id].cards.push(newCard)
        socket.emit('board:addCard', newCard)
    }

    socket.on('board:get', getPage)
    socket.on('board:addCard', addCard)
}