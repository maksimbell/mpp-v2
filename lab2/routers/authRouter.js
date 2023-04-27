import Router from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'
import authMiddleware from '../middlewares/authMiddleware.js'
import controller from '../authController.js'

const router = new Router()

router.use(Router.static('public'));
router.use(Router.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/register", controller.getRegister)
router.post("/register", controller.register)
router.get("/login", controller.getLogin)
router.post("/login", controller.login)


export default router