import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Attempt to connect to the Redis server
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle connection errors
client.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Gracefully handle process exit
process.on('SIGINT', () => {
  client.quit();
});

process.on('exit', () => {
  client.quit();
});
