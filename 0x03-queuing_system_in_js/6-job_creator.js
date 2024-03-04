import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Create an object containing the Job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a notification!',
};

// Create a job in the push_notification_code queue
const notificationJob = queue
  .create('push_notification_code', jobData)
  .save((error, job) => {
    if (!error) {
      console.log(`Notification job created: ${job.id}`);
    } else {
      console.error('Error creating notification job:', error);
    }
    // Quit Kue gracefully
    kue.app.close();
  });

// Listen for job completion
notificationJob.on('complete', () => {
  console.log('Notification job completed');
});

// Listen for job failure
notificationJob.on('failed', (errorMessage) => {
  console.error(`Notification job failed: ${errorMessage}`);
});
