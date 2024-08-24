const amqp = require('amqplib');
require('dotenv').config();

async function publishMessage(queue, message) {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });  // Ensure the queue is durable
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Message sent to queue [${queue}]: ${message}`);
    } catch (error) {
        console.error(`Failed to send message to queue [${queue}]: ${error.message}`);
    }
}

module.exports = { publishMessage };
