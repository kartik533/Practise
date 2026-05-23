const tasks = {
  a: {
    job: function (finish) {
      setTimeout(function () {
        console.log("a done");
        finish();
      }, 1000);
    },
  },
  b: {
    job: function (finish) {
      setTimeout(function () {
        console.log("b done");
        finish();
      }, 1000);
    },
  },
  c: {
    job: function (finish) {
      setTimeout(function () {
        console.log("c done");
        finish();
      }, 1000);
    },
  },
  d: {
    job: function (finish) {
      setTimeout(function () {
        console.log("d done");
        finish();
      }, 1000);
    },
    dependencies: ["a", "b"],
  },
  e: {
    job: function (finish) {
      setTimeout(function () {
        console.log("e done");
        finish();
      }, 1000);
    },
    dependencies: ["c", "d"],
  },
};

function runTasks2(tasks) {
  // set to store the keys of completed tasks;
  const completed = new Set();
  // Set to store the keys of tasks which have run
  const ran = new Set();

  const totalTasks = Object.keys(tasks).length;
  let completedTasks = 0;

  function run() {
    for (const key in tasks) {
      const task = tasks[key];

      if (ran.has(key)) continue;

      if (task.dependencies === undefined) {
        ran.add(key);
        task.job(() => finish(key));
      } else {
        const isEligibleToRun = checkEligibility(task);
        if (isEligibleToRun) {
          ran.add(key);
          task.job(() => finish(key));
        }
      }
    }
  }

  function checkEligibility(task) {
    for (const dependency of task.dependencies) {
      if (!completed.has(dependency)) return false;
    }
    return true;
  }

  function finish(key) {
    completed.add(key);
    completedTasks += 1;
    if (completedTasks !== totalTasks) run();
  }

  run();
}

function runTasks(tasks) {
  const completed = {};
  const ran = {};
  const totalTasks = Object.keys(tasks).length;
  let completedTasks = 0;

  function run() {
    for (let key in tasks) {
      if (!tasks[key].dependencies) {
        if (!ran[key]) {
          ran[key] = key;
          tasks[key].job(() => finish(key));
        }
      } else {
        let flag = checkTaskEligibility(key);
        if (flag && !ran[key]) {
          ran[key] = key;
          tasks[key].job(() => finish(key));
        }
      }
    }
  }

  function checkTaskEligibility(key) {
    for (let dep of tasks[key].dependencies) {
      if (!completed[dep]) {
        return false;
      }
    }
    return true;
  }

  function finish(key) {
    completed[key] = key;
    completedTasks += 1;
    if (completedTasks !== totalTasks) run();
  }

  run();
}

function topo(tasks) {
  const neighbours = new Map();
  const count = new Map();

  for (const task in tasks) {
    const taskObj = tasks[task];

    if (taskObj.dependencies) {
      for (const dep of taskObj.dependencies || []) {
        neighbours.set(dep, [...(neighbours.get(dep) || []), task]);
      }
      count.set(task, taskObj.dependencies.length);
    }
  }

  function finish(task) {
    for (const neighbour of neighbours.get(task) || []) {
      let c = count.get(neighbour);
      c -= 1;
      count.set(neighbour, c);

      if (c === 0) {
        tasks[neighbour].job(() => finish(neighbour));
      }
    }
  }

  function run() {
    for (const task in tasks) {
      const taskObj = tasks[task];
      if (!count.get(task)) {
        taskObj.job(() => finish(task));
      }
    }
  }

  run();
}

export function createTask(delay) {
  return () =>
    new Promise((res) => {
      setTimeout(() => {
        res(delay);
      }, delay);
    });
}

const task1 = createTask(1000);
const task2 = createTask(1000);
const task3 = createTask(1000);
const task4 = createTask(1000);
const task5 = createTask(1000);

const samples = [task1, task2, task3, task4, task5];

async function series(tasks) {
  const result = [];

  for (const task of tasks) {
    const val = await task();
    console.log("finished task with value", val);
    result.push(val);
  }

  console.log(result);
}

async function parallel(tasks) {
  const result = [];

  tasks.forEach(async (task, ind) => {
    const val = await task();
    result[ind] = val;
    console.log(result);
  });

  console.log(result);
}

function asyncMap(iterable, fn) {
  if (iterable.length === 0) return Promise.resolve([]);

  let completed = 0;
  const result = [];

  return new Promise((resolve, reject) => {
    iterable.forEach((item, ind) => {
      fn(item)
        .then((val) => {
          result[ind] = val;
          completed += 1;
          if (completed === iterable.length) resolve(result);
        })
        .catch(reject);
    });
  });
}

function mapAsyncLimit(iterable, fn, size = Infinity) {
  if (iterable.length === 0) return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    let completed = 0;
    const result = [];
    let currentIndex = 0;
    let runningCount = 0;

    function run() {
      while (runningCount < size && currentIndex < iterable.length) {
        const index = currentIndex;
        const task = iterable[currentIndex];
        runningCount += 1;
        currentIndex += 1;
        task().then((val) => {
          result[index] = val;
          completed += 1;

          if (completed === iterable.length) {
            resolve(resolve);
          }
          runningCount -= 1;
          run();
        });
      }
    }
  });
}
