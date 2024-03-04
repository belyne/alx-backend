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

// Function to create and store a hash
function createHash() {
  // Use hset to store values in the hash
  client.hset(
    'HolbertonSchools',
    'Portland',
    50,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Seattle',
    80,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'New York',
    20,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Bogota',
    20,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Cali',
    40,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Paris',
    2,
    redis.print
  );
}

// Function to display the stored hash
function displayHash() {
  // Use hgetall to retrieve the entire hash
  client.hgetall('HolbertonSchools', (error, result) => {
    if (error) {
      console.error(`Error getting hash: ${error}`);
    } else {
      console.log(result);
    }
    // Quit Redis connection gracefully
    client.quit();
  });
}

// Call functions at the end of the file
createHash();
displayHash();
