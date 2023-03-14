import express from 'express';
import fileUpload from 'express-fileupload'

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}))
app.use(fileUpload({
    createParentPath: true
}));

app.set("view engine", "ejs");

const cards = []

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/my-boards", (req, res) => {
    res.render("pages/my-boards");
});

app.get("/board", (req, res) => {
    res.render("pages/board", {cards: cards});
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});

app.post('/board', (req, res) => {
    console.log(req.files)

    const newCard = {
        columnId: 1,
        content: req.body.content,
        files: req.files,
    }

    cards.push(newCard)
    res.render("pages/board", {cards: cards});
    res.end()
    
    console.log(cards)
})

app.listen(port, () => console.log(`Listening on ${port}`));
