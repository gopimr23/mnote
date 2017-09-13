var db = require("../db/");

var getNotes = ()=> {
  return db.getNotes();
};

var saveNotes = (note)=> {
  console.log("in controller", note);
  return db.saveNotes(note)
};
module.exports = {
  getNotes: getNotes,
  saveNotes: saveNotes
};