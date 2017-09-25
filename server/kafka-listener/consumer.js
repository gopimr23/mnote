var Transform = require('stream').Transform;
const Kafka = require('node-rdkafka');
const db = require("../db/");

var stream = Kafka.KafkaConsumer.createReadStream({
    'metadata.broker.list': 'localhost:9092',
    'group.id': 'librd-test',
    'socket.keepalive.enable': true,
    'enable.auto.commit': false
  }, {}, {
    topics: 'mnote',
    waitInterval: 0,
    objectMode: false
  });
  
  stream.on('error', function(err) {
    if (err) console.log(err);
    process.exit(1);
  });
  function uint8arrayToStringMethod(myUint8Arr){
    return String.fromCharCode.apply(null, myUint8Arr);
 }
  stream.on('data', function(data){
    console.log("consumer - ");
    var t = String.fromCharCode.apply(null, data);;
    try{
      var json = JSON.parse(t);
      db.saveNotes(json)
      console.log("JSON ______ ", json);
    }catch(e){
      console.log(e);
      console.log("string ______ ", t);
    }
  })
  stream.on('message', function(){
    console.log("Arguments ",arguments);
  }) 
  stream.on('error', function(err) {
    console.log(err);
    process.exit(1);
  });
  
  stream.consumer.on('event.error', function(err) {
    console.log(err);
  })

  module.exports = {}