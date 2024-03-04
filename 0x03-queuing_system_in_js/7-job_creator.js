import kue from 'kue';

// Create an array of jobs
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  // ... (add more jobs as needed)
];

// Create a Kue queue
const queue = kue.createQueue();

// Loop through the array and add jobs to the queue
jobs.forEach((jobData, index) => {
  // Create a new job in the push_notification_code_2 queue
  const notificationJob = queue.create('push_notification_code_2', jobData);

  // On successful job creation
  notificationJob.save((error) => {
    if (!error) {
      console.log(`Notification job created: ${notificationJob.id}`);
    } else {
      console.error(`Error creating notification job: ${error}`);
    }
  });

  // On job completion
  notificationJob.on('complete', () => {
    console.log(`Notification job ${notificationJob.id} completed`);
  });

  // On job failure
  notificationJob.on('failed', (errorMessage) => {
    console.error(`Notification job ${notificationJob.id} failed: ${errorMessage}`);
  });

  // On job progress
  notificationJob.on('progress', (progress, data) => {
    console.log(`Notification job ${notificationJob.id} ${progress}% complete`);
  });
});

// Gracefully shut down the queue after a short delay
setTimeout(() => {
  kue.app.close();
}, 2000);
