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
    const register = async (req, res) => {
        try {

            const {
                login,
                password
            } = req.body

            let query = `select * from user where login = '${login}'`

            let [rows, fields] = await promisePool.query(query)
            console.log(rows.length)

            if (rows.length == 0) {
                let hashPassword = bcrypt.hashSync(password, 5)

                query = `INSERT INTO user(passwordHash, login) VALUES ('${hashPassword}', '${login}')`;

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
    }

    const login = async (req, res) => {
        try {

            const {
                login,
                password
            } = req.body

            let query = `select * from user where login = '${login}'`

            let [rows, fields] = await promisePool.query(query)

            if (rows.length == 0) {
                res.status(400).json({
                    message: `User with this login doesn't exist`
                })
            } else {

                const validPassword = bcrypt.compareSync(password, rows[0].passwordHash)
                if (validPassword) {
                    console.log(rows[0].id)
                    const token = generateToken(rows[0].id)
                    res.status(200).cookie('jwt',
                        token, {
                            httpOnly: true,
                            secure: true,
                        }).json({
                        msg: 'work'
                    })
                } else {
                    res.status(400).json({
                        message: 'Password is incorrect'
                    })
                }
            }
        } catch (e) {
            console.warn(e)
        }
    }

    socket.on('auth:register', register)
    socket.on('auth:login', login)
}