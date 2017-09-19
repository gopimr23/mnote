const notesController = require("../controller/notes");

function getNotes (req, res) {
  notesController.getNotes()
    .then((notes)=>{
      console.log("")
      res.status(200).send(notes);
    })
    .catch((err)=>{
      res.status(500).send(err);
    })
}

function saveNotes (req, res) {
  notesController.saveNotes(req.body)
    .then(()=>{
      res.status(201).send("Saved Successfully");
    })
    .catch((err)=>{
      res.status(500).send(err)
    })
}

function getMessage(req, res){
  notesController.getMessage(req.body)
  .then(()=>{
    res.status(201).send("Saved Successfully");
  })
  .catch((err)=>{
    res.status(500).send(err)
  })
}
module.exports = {
  getNotes: getNotes,
  saveNotes: saveNotes,
  getMessage: getMessage
};