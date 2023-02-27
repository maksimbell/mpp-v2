import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/my-boards", (req, res) => {
    res.render("pages/my-boards");
});

app.get("/board", (req, res) => {
    res.render("pages/board");
});

app.get("/about", function (req, res) {
    res.render("pages/about");
});

app.listen(port, () => console.log(`Listening on ${port}`));
