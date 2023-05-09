import path from 'path'
import fs from 'fs'
import promisePool from './config/db.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const generateToken = (id, role) => {
    return jwt.sign({
        id,
    }, 'secret', {
        expiresIn: '24h'
    })
}

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
                const token = jwt.sign({
                    id: rows[0].id
                }, 'secret', {
                    expiresIn: "1h"
                })
                return res.json({
                    token
                })
            } else {
               return res.json({
                   message: 'Wrong password'
               })
            }
        }
    } catch (e) {
        console.log('error!')
        res.status(400).json({
            message: e.message
        })
    }
}

const getLogin = (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'login.html'))
    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: 'Get error'
        })
    }
}

const getRegister = (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'register.html'))
    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: 'Get error'
        })
    }
}

export default {
    getRegister,
    getLogin,
    register,
    login,
}