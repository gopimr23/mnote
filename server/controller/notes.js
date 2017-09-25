var db = require("../db/");

var kafkaProducer = require("../kafka-listener/producer");
var kafkaConsumer = require("../kafka-listener/consumer");

var getNotes = ()=> {
  return db.getNotes();
};

var saveNotes = (note)=> {
  console.log("in controller", note);
  return db.saveNotes(note)
};

var getMessage = (message)=>{
  console.log("Message producer", message);
  return kafkaProducer.sendMessage(message);
}
module.exports = {
  getNotes: getNotes,
  saveNotes: saveNotes,
  getMessage: getMessage
};