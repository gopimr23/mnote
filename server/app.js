const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const router = require("./routes");

const notes = require("./controller/notes");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('dest'));


app.get("/", (req, res)=> {
  res.status(200).sendFile(path.resolve(__dirname + "/../client/index.html"));
});

app.use("/notes", router);

app.listen(3000, ()=> {
  console.log("Listening...")
});