function sleep(timeout: number, data: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

class TaskScheduler {
  asyncList: Array<AsyncGenerator>; // 迭代器
  asyncFirstList: Array<AsyncGenerator> = []; // 插队迭代器

  constructor(asyncList: Array<AsyncGenerator>) {
    this.asyncList = asyncList;
  }

  // 轮训的迭代器
  push(...task: Array<AsyncGenerator>) {
    this.asyncList.push(...task);
  }

  // 插队的迭代器
  pushJump(...task: Array<AsyncGenerator>) {
    this.asyncFirstList.push(...task);
  }

  // 定时器
  sleep(timeout: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }

  time = 100;

  //
  async *run() {
    let cacheTask: Array<Promise<any>> = [];
    while (true) {
      let asyncList = this.asyncFirstList.length
        ? this.asyncFirstList
        : this.asyncList;

      if (asyncList.length === 0) return;

      for (let index = 0; index < asyncList.length; index++) {
        const task = asyncList[index];
        if (task) {
          console.info(index);
          let p = cacheTask[index];
          if (p && p instanceof Promise) {
            cacheTask.splice(index, 1);
            ((i, t) => {
              p.then(({ done, value }) => {
                console.info(done, value);
                if (done) {
                  asyncList.splice(i, 1);
                  if (index > i) --index;
                } else {
                  cacheTask.push(t.next());
                }
              });
            })(index, task);
          } else {
            cacheTask.push(task.next());
          }
        }
      }

      // 根据任务时长 动态调整 time 值
      yield this.sleep(this.time);
    }
  }
}

// 测试

async function* A() {
  yield sleep(100, "A:1");
  yield sleep(100, "A:2");
  yield sleep(100, "A:3");
  yield sleep(100, "A:4");
  yield sleep(100, "A:5");
  yield sleep(100, "A:6");
  yield sleep(100, "A:7");
  yield sleep(100, "A:8");
  yield sleep(100, "A:9");
  yield sleep(100, "A:10");
}

async function* B() {
  yield sleep(100, "B:1");
  yield sleep(100, "B:2");
  yield sleep(100, "B:3");
  yield sleep(100, "B:4");
  yield sleep(100, "B:5");
  yield sleep(100, "B:6");
  yield sleep(100, "B:7");
  yield sleep(100, "B:8");
  yield sleep(100, "B:9");
  yield sleep(100, "B:10");
}

async function* C() {
  yield sleep(100, "C:1");
  yield sleep(100, "C:2");
  yield* A();
  yield sleep(100, "C:3");
  yield sleep(100, "C:4");
}

var s = new TaskScheduler([A(), B(), C()]);
s.pushJump(C());

async function taskRun() {
  for await (let i of s.run()) {
    // console.info(i);
  }
}

taskRun();
