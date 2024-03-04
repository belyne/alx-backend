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

// Function to set a new school value
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

// Function to display the value for a school
function displaySchoolValue(schoolName) {
  client.get(schoolName, (error, value) => {
    if (error) {
      console.error(`Error getting value for ${schoolName}: ${error}`);
    } else {
      console.log(value);
    }
  });
}

// Call functions at the end of the file
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
