var Transform = require('stream').Transform;
const Kafka = require('node-rdkafka');

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
  
  stream.on('data', function(){
    console.log(arguments);
  })
  stream.on('message', function(){
    console.log(arguments);
  }) 
  stream.on('error', function(err) {
    console.log(err);
    process.exit(1);
  });
  
  stream.consumer.on('event.error', function(err) {
    console.log(err);
  })

  module.exports = {}