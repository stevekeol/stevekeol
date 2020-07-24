/*!
 * taskScheduler.ts - 任务调度器
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-16 10:00
 */
// import { TASK_TYPE, TASK_STATUS } from './Constant';
// import { Task } from './Task';
// // import { fs } from 'fs';
// const { fs }  = require('fs');

// class TaskScheduler {
//   taskQuene: {}; //数组还是哈希Map？//任务队列(定时任务加入taskQuene; 实时任务直接加入taskProcessorQuene的头部，还是尾部？)(task按照权重插入对应队列的对应位置)
//   taskProcessorQuene: Task[]; //调度队列(任务执行队列)(取出下一次从taskQuene中扫描的时刻之前的任务，并成为这一批待执行的任务)

//   constructor() {
//     this.taskQuene = [];
//     this.taskProcessorQuene = [];
//   }

//   //[TaskQuene.ts]: 从时间环的任务队列中取出在下一个时间片将要执行的任务
//   getTasks(curIndx: number): Task[] {
//     //
//     //return this.taskQuene[curIndex];
//     return [];
//   }

//   //[ProcessorQuene.ts]: 将从任务队列中取出的待执行
//   addToSchedule(tasks: Task[]): void {
//     this.taskProcessorQuene.push(...tasks);
//   }

//   //[TaskQuene.ts]: 向任务队列添加新任务
//   addTask(task: Task) {
//     this.taskQuene.push(task);
//   }

//   //[Task.ts & TaskScheduler.ts]: 将处于调度队列的task取消（）
//   cancel(taskId: number): void {
//     //
//   }

//   //[TaskProcessor.ts] 执行调度队列中的任务列表
//   run(tasks: Task[]): void {
//     //
//   }

//   //[TaskScheduler.ts] 唤醒任务
//   wakeup(taskId) {
//     this.taskQuene.delete(taskId);
//     this.taskProcessorQuene.add(taskId);
//   }
  

//   //: 失败

//   //定时扫描：需要被分发的任务（@TODO:可优化为"时间环"）
//   //扫描结果是: 下一次扫描之前的所有Task。时间环的话，由于时间颗粒度的关系，取出来的也是Tasks。
// }

//------------------------------------------------------------------------

// function syncBlockChain() {
//   let readStream = fs.createReadStream('./historyChain.txt');

//   let historyBlock = '';

//   readStream.setEncoding('utf8');

//   let count = 0;

//   readStream.on('data', function(chunk){
//     historyBlock += chunk;
//     count++;

//     if(count == 100) console.log(historyBlock);
//   });

//   readStream.on('end', function(chunk){
//     // 文件读取完成，文件内容是 [你好，我是程序猿小卡]
//     console.log('historyBlock is syncro.', historyBlock);
//   });
// }

// syncBlockChain();

// let task_syncro_node = new Task(TASK_TYPE.DOWNLOAD_HEADER, syncBlockChain);



/*----------------------------------预期的使用方式---------------------------------*/

import { Task } from './Task';
import { TaskQuene } from './TaskQuene';
import { TaskProcessor } from './TaskProcessor';

import { TASK_TYPE, TASK_STATUS } from './Constant';
import { syncroBlockChain } from './TaskMock.js';


let taskQuene = new TaskQuene();
let taskProcessor = new TaskProcessor();

//定义任务
let task1 = new Task(TASK_TYPE.DOWNLOAD_HEADER, syncroBlockChain);

//定义有预热任务的任务
let task2 = new Task(TASK_TYPE.VERTIFY_HEADER, task1, vertifyBlockChain);

//保存任务
taskQuene.add(task1);

//调度task1，该任务会在线程空闲时自动执行
taskProcessor.schedule(task1);

//中止task1(中止时，task1会进行扫尾任务，会将task1放进taskQuene)
taskProcessor.abort(task1);

//唤醒task1(唤醒时，任务放入taskProcessor，并从上次中止时的进度开始执行)
taskQuene.wakeup(task1);