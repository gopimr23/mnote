const couchbase = require("couchbase");
const Promise = require("bluebird");
const uuid = require("uuid");
let cluster = new couchbase.Cluster("couchbase://127.0.0.1");

cluster.authenticate({username:"admin", password: "password2"});
let notesBucket = cluster.openBucket("notes", "password2");

function getNotes() {
  var query = "select notes.* from notes";
  console.log(query);
  return new Promise(function (resolve, reject) {
    console.log("in promise");
    notesBucket.query(query, function (err, result) {
      if (err) {
        console.log("errrrrr ", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function saveNotes(newNote) {
  console.log("in couchbase db ");
  return new Promise(function (resolve, reject) {
    var documentId = uuid.v4();
    notesBucket.insert(documentId, newNote, function (err, data) {
      if (err)console.log("ERRR ", err);
      err ? reject(err) : resolve();
    });
  });
}
module.exports = {
  getNotes: getNotes,
  saveNotes: saveNotes
};