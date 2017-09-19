const couchbase = require("couchbase");
const Promise = require("bluebird");
const uuid = require("uuid");
let cluster = new couchbase.Cluster("http://127.0.0.1:8091");

let nquery = couchbase.N1qlQuery;

//cluster.authenticate({username:"admin", password: "password2"});
let notesBucket = cluster.openBucket("notes");

function getNotes() {
  var query = nquery.fromString("select notes.* from notes");

  console.log(query);
  return new Promise((resolve, reject)=> {
    console.log("in promise");
    return notesBucket.query(query, (err, result)=> {
      if (err)reject(err);
      else resolve(result);
    });
    /*var req = bucket.query(query);
     req.on('row', function(row) {
     console.log('Got a row', row);
     });
     req.on('error', function(err) {
     console.error('Got error %j', err);
     });
     req.on('end', function(meta) {
     console.log('All rows received. Metadata is %j:', meta);
     });*/
  });
}

function saveNotes(newNote) {
  console.log("in couchbase db ");
  return new Promise((resolve, reject) => {
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