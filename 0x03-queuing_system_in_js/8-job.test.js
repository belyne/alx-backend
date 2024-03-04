import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    // Create a new queue and enter test mode
    queue = kue.createQueue({ redis: { createClientFactory: () => kue.redis.createClient() } });
    queue.testMode.enter();
  });

  afterEach(() => {
    // Clear the queue and exit test mode
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('notAnArray', queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Validate the number of jobs in the queue
    expect(queue.testMode.jobs.length).to.equal(2);

    // Validate job creation log messages
    expect(queue.testMode.jobs[0].log).to.include('Notification job created:');
    expect(queue.testMode.jobs[1].log).to.include('Notification job created:');
  });

  // Add more tests as needed

});
