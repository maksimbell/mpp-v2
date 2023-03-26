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

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/my-boards", (req, res) => {
    res.render("pages/my-boards");
});

app.get("/board", (req, res) => {
    res.render("pages/board", {
        columns: columns
    });
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});

app.post('/board/add-card/:id', (req, res) => {
    const file = req.files?.uploaded
    console.log(file)

    if (file)
        file.mv('./public/files/' + file.name)

    const newCard = {
        content: req.body.content,
        file,
    }

    const columnId = req.params.id
    columns[columnId].cards.push(newCard)

    res.redirect('/board')
    res.end()
})

app.post('/board/add-column', (req, res) => {

    const newColumn = {
        name: req.body.columnName,
        cards: []
    }

    columns.push(newColumn)

    res.redirect('/board')
    res.end()
})

app.listen(port, () => console.log(`Listening on ${port}`));


const columns = [{
    name: 'First column',
    cards: [],
}]