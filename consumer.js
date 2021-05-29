
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    Commentconsumer = new Consumer(client,
        [{ topic: 'Share', offset: 0}],
        {
            autoCommit: false
        }
    );
    Shareconsumer = new Consumer(client,
        [{ topic: 'Share', offset: 0}],
        {
            autoCommit: false
        }
    );
    Viewconsumer = new Consumer(client,
        [{ topic: 'View', offset: 0}],
        {
            autoCommit: false
        }
    );
    

    // For Comment Consumer
Commentconsumer.on('message', function (message) {
    
    console.log(message);
   
});

Commentconsumer.on('error', function (err) {
    console.log('Error:',err);
})

Commentconsumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
})


// For Share Consumer

Shareconsumer.on('message', function (message) {
    console.log(message);
});

Shareconsumer.on('error', function (err) {
    console.log('Error:',err);
})

Shareconsumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
})

// For View Consumer

Viewconsumer.on('message', function (message) {
    console.log(message);
});

Viewconsumer.on('error', function (err) {
    console.log('Error:',err);
})

Viewconsumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
})