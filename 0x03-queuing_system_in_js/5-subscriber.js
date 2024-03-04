import redis from 'redis';

// Create a Redis subscriber client
const subscriber = redis.createClient();

// On connect, log the message
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

// On error, log the error message
subscriber.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Subscribe to the 'holberton school channel'
subscriber.subscribe('holberton school channel');

// Listen for messages on the subscribed channel
subscriber.on('message', (channel, message) => {
  console.log(message);

  // Unsubscribe and quit if the message is 'KILL_SERVER'
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
