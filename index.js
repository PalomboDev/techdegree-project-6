const express = require("express");
const {projects} = require("./data.json");
const app = express();
const port = 3000;

app.use("/static", express.static("public"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("index.pug", {projects: projects});
});

app.get("/about", (req, res) => {
    res.render("about.pug");
});

app.get("/projects/:id", (req, res) => {
    const {id} = req.params;
    const project = projects[id];

    res.render("project.pug", {project: project});
});

app.use((req, res, next) => {
    const err = new Error("Not Found");
    
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render("error", err);
});

app.listen(port, () => console.log(`Server Started. Listening on port: ${port}`));