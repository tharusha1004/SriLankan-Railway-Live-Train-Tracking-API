const amqp = require('amqplib');
require('dotenv').config();

async function publishMessage(queue, message) {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Message sent: ${message}`);
    } catch (error) {
        console.error(`Failed to send message: ${error.message}`);
    }
}

module.exports = { publishMessage };
