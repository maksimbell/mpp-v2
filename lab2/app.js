import express from 'express';
import fileUpload from 'express-fileupload'
import path from 'path'
import fs from 'fs'

const app = express();
const jsonParser = express.json();
const port = 3000;

app.use(express.static('public'));
const filePath = 'data.json'

app.use(express.urlencoded({
    extended: true
}))

app.use(fileUpload({
    createParentPath: true
}));

app.listen(port, () => console.log(`Listening on ${port}`));

app.get("/board", (req, res) => {
    try{
      res.status(200).sendFile(path.resolve(path.dirname("."), 'views', 'pages', 'board.html'))
    }catch(e){
      console.log(e)
      res.status(400).json({message: 'Get error'})
    }
})

app.get('/board/get', (req, res) => {
    const data = fs.readFileSync(filePath, 'utf8')
    const board = JSON.parse(data)
    res.send(board)
})

