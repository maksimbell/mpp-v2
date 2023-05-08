import path from 'path'
import fs from 'fs'
import {
    writeFile
} from "fs";
import data from '../data.js'

export default (io, socket) => {
    // const getLogin = () => socket.emit('auth:getLogin')
    // const getRegister = () => socket.emit('auth:getRegister')

    const login = (card) => {
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

    const register = (user) => {
        try {

            let query = `select * from user where login = '${user.login}'`

            let [rows, fields] = await promisePool.query(query)
            console.log(rows.length)

            if (rows.length == 0) {
                let hashPassword = bcrypt.hashSync(user.password, 5)

                query = `INSERT INTO user(passwordHash, login) VALUES ('${hashPassword}', '${user.login}')`;

                [rows, fields] = await promisePool.query(query)

                res.status(200).json({
                    message: 'work'
                })
            } else {
                res.status(400).json({
                    message: 'User with this login already exist'
                })
            }

        } catch (e) {
            console.warn(e)
        }

        socket.emit('auth:register', {
            login: user.login,
        })
    }

    const deleteColumn = (id) => {
        data.columns = data.columns.filter(col => col.id != id)
        socket.emit('board:deleteColumn', id)
    }

    socket.on('auth:register', register)
    socket.on('auth:login', login)
    socket.on('auth:getRegister', getRegister)
    socket.on('auth:getLogin', getLogin)
}