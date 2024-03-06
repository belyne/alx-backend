import { createClient } from "redis";

const client = createClient();

client.on("connect", () => {
  console.log("Redis client connected to the server");
});

client.on("error", (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Function to set a hash value in Redis
const setHashValue = (hashKey, field, value) => {
  client.hset(hashKey, field, value, (err, reply) => {
    if (err) {
      console.error(`Error setting hash value: ${err}`);
    } else {
      console.log(`Hash value set successfully: ${reply}`);
    }
  });
};

// Function to get all hash values in Redis
const getAllHashValues = (hashKey) => {
  client.hgetall(hashKey, (err, result) => {
    if (err) {
      console.error(`Error retrieving hash values: ${err}`);
    } else {
      console.log(`All hash values for ${hashKey}:`);
      console.log(result);
    }
    // Quit the client gracefully after completing the operations
    client.quit();
  });
};

// Set hash values for cities
setHashValue("HolbertonSchools", "Portland", "50");
setHashValue("HolbertonSchools", "Seattle", "80");
setHashValue("HolbertonSchools", "New York", "20");
setHashValue("HolbertonSchools", "Bogota", "20");
setHashValue("HolbertonSchools", "Cali", "40");
setHashValue("HolbertonSchools", "Paris", "2");

// Display all hash values
getAllHashValues("HolbertonSchools");
