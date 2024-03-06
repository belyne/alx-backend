import { createClient, print } from "redis";
import { promisify } from "util";

const client = createClient();

client
  .on("connect", () => {
    console.log("Redis client connected to the server");
  })
  .on("error", (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
  });

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

const getAsync = promisify(client.get).bind(client);

async function displaySchoolValue(schoolName) {
  try {
    const res = await getAsync(schoolName);
    console.log(`Value for ${schoolName}: ${res}`);
  } catch (error) {
    console.error(`Error retrieving value for ${schoolName}: ${error}`);
  }
}

// Example usage
displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
