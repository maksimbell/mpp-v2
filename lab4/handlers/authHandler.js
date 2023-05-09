import path from 'path'
import fs from 'fs'
import {
    writeFile
} from "fs";
import data from '../data.js'
import bcrypt from "bcrypt";
import promisePool from '../config/db.js'
import jwt from 'jsonwebtoken'

const generateToken = (id, role) => {
    return jwt.sign({
        id,
    }, 'SECRET_KEY', {
        expiresIn: '24h'
    })
}

export default (io, socket) => {
    const login = async (user) => {
        try {
            const {
                login,
                password
            } = user

            console.log(user)
            let query = `select * from user where login = '${login}'`
            let [rows, fields] = await promisePool.query(query)

            if (rows.length > 0) {

                const validPassword = bcrypt.compareSync(password, rows[0].passwordHash)
                if (validPassword) {
                    console.log(rows[0].id)
                    // const token = generateToken(rows[0].id)
                    const token = 'secretToken'
                    socket.emit('auth:login', token)
                    console.log('success')
                } else {
                    console.log('user not found')
                }
            }
        } catch (e) {
            console.warn(e)
        }
    }

    const register = async (user) => {
        try {

            const {
                login,
                password
            } = user
            let query = `select * from user where login = '${login}'`
            let [rows, fields] = await promisePool.query(query)
            console.log(rows.length)

            if (rows.length == 0) {
                let hashPassword = bcrypt.hashSync(password, 5)
                query = `INSERT INTO user(passwordHash, login) VALUES ('${hashPassword}', '${login}')`;

                [rows, fields] = await promisePool.query(query)

                // res.status(200).json({
                //     message: 'work'
                // })
            } else {
                // res.status(400).json({
                //     message: 'User with this login already exist'
                // })
            }

        } catch (e) {
            console.warn(e)
        }
        console.log('registered!')
    }

    socket.on('auth:register', register)
    socket.on('auth:login', login)
}