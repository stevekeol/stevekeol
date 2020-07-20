/*!
 * taskScheduler.ts - 任务调度器
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-16 10:00
 */
import { TASK_TYPE, TASK_STATUS } from './Constant';

class TaskScheduler {
  taskQuene: {}; //数组还是哈希Map？//任务队列(定时任务加入taskQuene; 实时任务直接加入taskProcessorQuene的头部，还是尾部？)(task按照权重插入对应队列的对应位置)
  taskProcessorQuene: AsyncGenerator[]; //调度队列(任务执行队列)(取出下一次从taskQuene中扫描的时刻之前的任务，并成为这一批待执行的任务)

  constructor() {
    this.taskQuene = [];
    this.taskProcessorQuene = [];
  }

  //[TaskQuene.ts]: 从时间环的任务队列中取出在下一个时间片将要执行的任务
  getTasks(curIndx: number): AsyncGenerator[] {
    //
    //return this.taskQuene[curIndex];
    return [];
  }


  //[ProcessorQuene.ts]: 将从任务队列中取出的待执行
  addToSchedule(tasks: AsyncGenerator[]): void {
    this.taskProcessorQuene.push(...tasks);
  }

  //[TaskQuene.ts]: 向任务队列添加新任务
  addTask(task: AsyncGenerator) {
    this.taskQuene.push(task);
  }

  //[Task.ts & TaskScheduler.ts]: 将处于调度队列的task取消（）
  cancel(taskId: number): void {
    //
  }

  //[TaskProcessor.ts] 执行调度队列中的任务列表
  run(tasks: AsyncGenerator[]): void {
    //
  }

  //[TaskScheduler.ts] 唤醒任务
  wakeup(taskId) {
    this.taskQuene.remove(taskId);
    this.taskProcessorQuene.add(taskId);
  }

  

  //: 失败

  //定时扫描：需要被分发的任务（@TODO:可优化为"时间环"）
  //扫描结果是: 下一次扫描之前的所有Task。时间环的话，由于时间颗粒度的关系，取出来的也是Tasks。


}

//----------------------------------测试--------------------------------------

let ts = new TaskScheduler();

let tasks = this.getTasks();

const promisify = options => {
  return new Promise((resolve, reject) => {

  })
}