const sendgrid = require('@sendgrid/mail');
const SENDGRID_API_KEY = "~your sendgrid api key here~"

const rabbit = require('amqplib');
const QUEUE_NAME = 'square';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'main';
const KEY = 'myKey';

sendgrid.setApiKey(SENDGRID_API_KEY)

var email = {
    to: '~recipient~',
  // Change to your recipient
    from: '~sender~',
  // Change to your verified sender
    subject: 'Waypoint Addition request from ',
    html: '',
 }

connection = rabbit.connect('amqp://rabbitmq');
connection.then(async (conn)=>{
   const channel = await conn.createChannel();
   await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
   await channel.assertQueue(QUEUE_NAME);
   channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
   channel.consume(QUEUE_NAME, function(msg) {
    if (msg !== null) {   
        channel.ack(msg);

        message = JSON.parse(msg.content.toString())
        console.log(message)

        email.subject += message.user
        email.html += `<div> You have a waypoint addition request; The following message from the user is appended: "${message.adminEmail}" </div><br>`
        email.html += `<code>Waypoint lat: ${message.position.lat}<br>Waypoint lng: ${message.position.lng}</code>`

        sendgrid
        .send(email)
        .then((resp) => {
          console.log('Email sent\n', resp)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  });
})
