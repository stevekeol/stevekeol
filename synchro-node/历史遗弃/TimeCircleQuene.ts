/*!
 * TimeCircleQuene.ts - 时间环队列
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-17 14:30
 */

/**
 * 默认的 "时间环大小"
 * 时间粒度为 1min
 */
import { Task } from './Task';

export class TimeCircleQuene {
  quene: []; //该quene是元素为数组的数组
  curIndex: number;

  constructor(public size: number = 24 * 60) {
    this.quene = [];
    this.curIndex = 0;
  }

  /**
   * 判断当前时间片的索引是否是时间环的最后一个
   * @returns { boolean }
   */
  isTail() {
    return this.curIndex === ( this.quene.length - 1 );
  }

  getTasks(curIndex: number): Task[] {
    return this.quene[curIndex];
  }

  getTaskIndex(task: Task): number {
    runTime
  }

  addTask(task: Task): boolean {
    let index = this.getTaskIndex(task);
    this.quene[index].push(task);
  }


}
