/*!
 * TaskProcessor.ts - 任务执行器(需要数据持久化)
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-16 10:00
 */

import { EventEmitter } from './EventEmitter';
import { TaskQuene } from './TaskQuene';
import { Aborter } from './Aborter';
import { Task } from './Task';

export class TaskProcessor extends EventEmitter {
  quene: [];
  constructor() {
    super();
    this.quene = [];
  }

  /**
   * 中止正在执行中的任务(将该任务从执行队列退回至任务队列)
   * @param { string } state
   */
  abort(task: Task) {
    
    Promise.race([])
  }





  pairPromise(myPromise) {

  }

  // mainLoop() {
  //   while(true) {

  //   }
  // }

}

let task1 = new Task('DOWNLOAD_HEADER');
let task2 = new Task('VERTIFY_HEADER');

let abort1 = new Aborter(task1);
let abort2 = new Aborter(task2);

