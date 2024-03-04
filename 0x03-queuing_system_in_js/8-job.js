import kue from 'kue';

function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Iterate through each job in the array
  jobs.forEach((jobData) => {
    // Create a job in the push_notification_code_3 queue
    const job = queue.create('push_notification_code_3', jobData);

    // Log when a job is created
    job.on('enqueue', () => {
      console.log(`Notification job created: ${job.id}`);
    });

    // Log when a job is complete
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // Log when a job fails
    job.on('failed', (error) => {
      console.error(`Notification job ${job.id} failed: ${error}`);
    });

    // Log when a job makes progress
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Save the job to the queue
    job.save();
  });
}

export default createPushNotificationsJobs;
