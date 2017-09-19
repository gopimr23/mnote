const Kafka = require('node-rdkafka');
const Promise = require("bluebird");
var producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
    'dr_cb': true
  });

  const sendMessage = (message) => {
    try {
      producer.produce(
        // Topic to send the message to
        'mnote',
        // optionally we can manually specify a partition for the message
        // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
        null,
        // Message to send. Must be a buffer
        new Buffer(message),
        // for keyed messages, we also specify the key - note that this field is optional
        'Stormwind',
        // you can send a timestamp here. If your broker version supports it,
        // it will get added. Otherwise, we default to 0
        Date.now(),
        // you can send an opaque token here, which gets passed along
        // to your delivery reports
      );
      return Promise.resolve();
    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
      return Promise.reject();
    }
    
  }
producer.connect();

producer.on('ready', function(){
  try {
    producer.produce(
      // Topic to send the message to
      'mnote',
      // optionally we can manually specify a partition for the message
      // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
      null,
      // Message to send. Must be a buffer
      new Buffer('messaggeeee'),
      // for keyed messages, we also specify the key - note that this field is optional
      'Stormwind',
      // you can send a timestamp here. If your broker version supports it,
      // it will get added. Otherwise, we default to 0
      Date.now(),
      // you can send an opaque token here, which gets passed along
      // to your delivery reports
    );
  } catch (err) {
    console.error('A problem occurred when sending our message');
    console.error(err);
  }
  
});

producer.on('event.error', function(err) {
    console.error('Error from producer');
    console.error(err);
})

module.exports = {
  sendMessage: sendMessage
}