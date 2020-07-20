/*!
 * TaskQuene.ts - 任务队列(需要持久化)
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-16 10:00
 */
import { EventEmitter } from './EventEmitter'
import { Task } from './Task';
import { TASK_TYPE } from './Constant';


export class TaskQuene extends EventEmitter {
  quene: {};
  constructor() {
    super();
    this.quene = {};  //采用{}而非[]
  }

  add(task: Task) {
    if(!this.quene[task.taskId]) {
      this.quene[task.taskId] = task;
    }
  }

  delete(task: Task) {
    if(this.quene[task.taskId]) {
      delete this.quene[task.taskId];
    }
  }
}

let task1 = new Task(TASK_TYPE.DOWNLOAD_HEADER);

let task2 = new Task(TASK_TYPE.VERTIFY_HEADER);
let task3 = new Task(TASK_TYPE.DOWNLOAD_ACCOUNT);

let taskQuene = new TaskQuene();
taskQuene.add(task1);
taskQuene.add(task2);
taskQuene.add(task3);

console.log(taskQuene);

taskQuene.delete(task2);
console.log(taskQuene);

// console.log(task.setState('SUCCESSED'));
// console.log(task.wakeup());
// console.log(task.getState());
