// Import the required library using the 'import' keyword
import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Attempt to connect to the Redis server
client
  .on('connect', () => {
    console.log('Redis client connected to the server');
  })
  .on('error', (error) => {
    console.error(`Redis client not connected to the server: ${error}`);
  });

// Gracefully handle process exit
process.on('SIGINT', () => {
  client.quit();
});

process.on('exit', () => {
  client.quit();
});
