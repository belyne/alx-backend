import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Function to send a notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the push_notification_code queue
queue.process('push_notification_code', (job, done) => {
  // Extract data from the job
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function
  sendNotification(phoneNumber, message);

  // Mark the job as completed
  done();
});

// Listen for errors in the queue
queue.on('error', (error) => {
  console.error(`Queue error: ${error}`);
});

// Listen for queue job completion
queue.on('job complete', (id, result) => {
  console.log(`Job ${id} completed`);
});

// Listen for queue job failed
queue.on('job failed', (id, error) => {
  console.error(`Job ${id} failed with error: ${error}`);
});

// Close the Kue app gracefully
process.once('SIGTERM', () => {
  queue.shutdown(5000, (error) => {
    console.log('Kue shutdown: ', error || '');
    process.exit(0);
  });
});

// Log a message when the processor is ready
console.log('Job processor is ready');
