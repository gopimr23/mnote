const express = require("express");
const path = require("path");
const app = express();

app.use(express.static('dest'));
app.get("/", (req, res)=>{
  console.log(path.resolve(__dirname + "/../client/index.html"));
  res.status(200).sendFile(path.resolve(__dirname + "/../client/index.html"));
});

app.listen(3000, ()=>{console.log("Listening...")});