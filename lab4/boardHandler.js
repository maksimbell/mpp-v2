import path from 'path'
import fs from 'fs'
import data from './data.js'

export default (io, socket) => {
    const getPage = (req, res) => {
        socket.emit('board:get', data)
        console.log('trying')
    }

    socket.on('board:get', getPage)
}