import kue from 'kue';

// Create an array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a Kue queue for push_notification_code_2
const queue = kue.createQueue();

// Function to send a notification
function sendNotification(phoneNumber, message, job, done) {
  // Track progress of the job
  job.progress(0, 100);

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job with an error message
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Update progress to 50%
  job.progress(50, 100);

  // Log the notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job
  done();
}

// Process jobs in the push_notification_code_2 queue with concurrency set to 2
queue.process('push_notification_code_2', 2, (job, done) => {
  // Extract data from the job
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function
  sendNotification(phoneNumber, message, job, done);
});

// Listen for errors in the queue
queue.on('error', (error) => {
  console.error(`Queue error: ${error}`);
});

// Listen for queue job completion
queue.on('job complete', (id) => {
  console.log(`Notification job ${id} completed`);
});

// Listen for queue job failure
queue.on('job failed', (id, error) => {
  console.error(`Notification job ${id} failed: ${error.message}`);
});

// Log a message when the processor is ready
console.log('Job processor is ready');
