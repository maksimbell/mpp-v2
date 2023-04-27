import express from 'express';
import path from 'path'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'
import mainRouter from './routers/mainRouter.js'
import authRouter from './routers/authRouter.js'

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

app.use('/', mainRouter)
app.use('/', authRouter)

app.listen(port, () => console.log(`Listening on ${port}`));