import { createTask } from "./tasks.js";

class TaskQueue {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.runningCount = 0;
  }

  push(task) {
    if (Array.isArray(task)) {
      this.queue.push(...task);
    } else {
      this.queue.push(task);
    }
    this.run();
  }

  run() {
    while (this.queue.length && this.runningCount < this.limit) {
      this.runningCount += 1;
      const task = this.queue.shift();
      task().then((val) => {
        console.log(val);
        this.runningCount -= 1;
        this.run();
      });
    }
  }
}

const task1 = createTask(2000);
const task2 = createTask(2000);
const task3 = createTask(2000);
const task4 = createTask(1000);
const task5 = createTask(1000);

const samples = [task1, task2, task3, task4, task5];

const queue = new TaskQueue(3);

queue.push(samples);
