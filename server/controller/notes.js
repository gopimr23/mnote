const fs = require("fs");
const {promisify} = require("util");
const readFilePromise = promisify(fs.readFile);
const path = require("path");

let filePath = path.resolve(__dirname,"../notes.json");

var getNotes = ()=> {
  return readFilePromise(filePath)
    .then((data)=> {
      console.log(data);
      return JSON.parse(data);
    });
};

var saveNotes = (note, cb)=> {
  return readFilePromise(filePath)
    .then((data)=> {
      var notes = JSON.parse(data);
      notes.push(note);
      notes = JSON.stringify(notes, null, 2);
      fs.writeFile(filePath, notes, cb)
    });
};
module.exports = {
  getNotes: getNotes,
  saveNotes: saveNotes
};