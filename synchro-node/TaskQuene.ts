/*!
 * TaskQuene.ts - 任务队列(需要持久化)
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-16 10:00
 */
import { EventEmitter } from './EventEmitter';
import { Task } from './Task';
import { TaskProcessor } from './TaskProcessor';


export class TaskQuene extends EventEmitter {
  quene: {};
  constructor() {
    super();
    this.quene = {};  //采用{}而非[]
  }

  /**
   * 向任务队列中添加某个任务
   * @param { Task } task
   */
  add(task: Task) {
    if(!this.quene[task.taskId]) {
      this.quene[task.taskId] = task;
    }
  }

  /**
   * 从任务队列中删除某个任务
   * @param { Task } task
   */
  delete(task: Task) {
    if(this.quene[task.taskId]) {
      delete this.quene[task.taskId];
    }
  }
}