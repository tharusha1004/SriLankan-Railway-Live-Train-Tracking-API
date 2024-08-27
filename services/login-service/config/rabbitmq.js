const amqp = require('amqplib/callback_api');
const logger = require('../utils/logger');

let channel = null;

// Connect to RabbitMQ server
const connectRabbitMQ = () => {
    amqp.connect(process.env.RABBITMQ_URL, (error0, connection) => {
        if (error0) {
            logger.error('Failed to connect to RabbitMQ', error0);
            throw error0;
        }

        connection.createChannel((error1, ch) => {
            if (error1) {
                logger.error('Failed to create RabbitMQ channel', error1);
                throw error1;
            }
            channel = ch;
            logger.info('RabbitMQ channel created successfully');
        });
    });
};

// Send a message to a RabbitMQ queue
const sendToQueue = (queue, message) => {
    if (!channel) {
        logger.error('RabbitMQ channel is not created');
        return;
    }

    channel.assertQueue(queue, {
        durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
    });

    logger.info(`Message sent to queue ${queue}: ${message}`);
};

module.exports = { connectRabbitMQ, sendToQueue };
