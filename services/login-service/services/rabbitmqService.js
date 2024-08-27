const { sendToQueue } = require('../config/rabbitmq');
const logger = require('../utils/logger');

// Wrapper function to send messages to a specific queue
exports.sendToQueue = (queue, message) => {
  try {
    sendToQueue(queue, message);
  } catch (error) {
    logger.error(`Failed to send message to queue ${queue}`, error);
  }
};
