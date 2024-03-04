import express from 'express';
import redis from 'redis';
import kue from 'kue';
import { promisify } from 'util';

const app = express();
const port = 1245;
const client = redis.createClient();
const queue = kue.createQueue();

// Utility function to promisify Redis commands
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Set the initial number of available seats to 50
const initialAvailableSeats = 50;
let reservationEnabled = true;

// Function to reserve a seat
const reserveSeat = async (number) => {
  await setAsync('available_seats', number);
};

// Function to get the current number of available seats
const getCurrentAvailableSeats = async () => {
  const numberOfAvailableSeats = await getAsync('available_seats');
  return numberOfAvailableSeats ? parseInt(numberOfAvailableSeats) : 0;
};

// Middleware to parse JSON in requests
app.use(express.json());

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      res.json({ status: 'Reservation failed' });
    } else {
      res.json({ status: 'Reservation in process' });
    }
  });

  job
    .on('complete', () => console.log(`Seat reservation job ${job.id} completed`))
    .on('failed', (errorMessage) => console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`));
});

// Route to process the queue and decrease available seats
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  if (numberOfAvailableSeats > 0) {
    await reserveSeat(numberOfAvailableSeats - 1);

    if (numberOfAvailableSeats === 1) {
      reservationEnabled = false;
    }
  } else {
    throw new Error('Not enough seats available');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
