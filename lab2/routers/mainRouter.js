import Router from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'
import authMiddleware from '../middlewares/authMiddleware.js'
import controller from '../mainController.js'

const router = new Router()

router.use(Router.static('public'));
router.use(Router.json());

const upload = multer({
    dest: "public/files/"
});

router.get("/board", authMiddleware, controller.getPage)
router.get("/board/columns", authMiddleware, controller.getBoard)
router.put("/board/card", authMiddleware, upload.single('file'), controller.addCard)
router.post("/board/column", authMiddleware, upload.none(), controller.addColumn)
router.delete("/board/column/:id", authMiddleware, controller.deleteColumn)


export default router