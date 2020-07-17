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

  // 轮训的下标
  taskIndex: number = 0;

  //
  async *run() {
    if (this.asyncList.length === 0) {
      return;
    }

    while (true) {
      let asyncList = this.asyncFirstList.length
        ? this.asyncFirstList
        : this.asyncList;
      let task = asyncList[this.taskIndex];
      if (!task) return;

      let { value, done } = await task.next();
      if (done) {
        asyncList.splice(this.taskIndex, 1);
        if (asyncList.length === 0) {
          this.taskIndex = 0;
        }
      } else {
        yield value;
      }
      if (asyncList.length - 1 < ++this.taskIndex) {
        this.taskIndex = 0;
      }
    }
  }
}

// 测试

async function* A() {
  yield "A:1";
  yield "A:2";
  yield "A:3";
  yield "A:4";
  yield "A:5";
  yield "A:6";
  yield "A:7";
  yield "A:8";
  yield "A:9";
  yield "A:10";
}

async function* B() {
  yield "B:1";
  yield "B:2";
  yield "B:3";
  yield "B:4";
  yield "B:5";
  yield "B:6";
  yield "B:7";
  yield "B:8";
  yield "B:9";
  yield "B:10";
}

async function* C() {
  yield "C:1";
  yield "C:2";
  yield* A();
  yield "C:3";
  yield "C:4";
  yield "C:5";
  yield "C:6";
}

var s = new TaskScheduler([A(), B(), C()]);
s.pushJump(C());

async function taskRun() {
  for await (let i of s.run()) {
    console.info(i);
  }
}

taskRun();
