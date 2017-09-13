const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const notes = require("./notes");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('dest'));


app.get("/", (req, res)=> {
  res.status(200).sendFile(path.resolve(__dirname + "/../client/index.html"));
});

app.post("/note", (req, res)=> {
  console.log(req.body);
  notes.saveNotes(req.body, (err)=>{
    if(err){
      res.status(500).send(err);
    }
    else {
      res.status(201).send("success");
    }
  });
});

app.get("/note", (req, res)=>{
  notes.getNotes()
    .then((data)=>{
      console.log(data);
      res.status(200).send(data);
    });
});

app.listen(3000, ()=> {
  console.log("Listening...")
});