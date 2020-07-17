/*!
 * task.ts - 任务
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-16 10:00
 */

import { TASK_STATE } from './Constant';

export class Task {
  taskId: string; //是否可取消?
  state: string;
  type: string;
  progress: number; //任务完成进度，如区块同步/验证的高度/时间;

  preTask: []; //该任务的依赖任务（预热任务)
  success: []; //该任务执行成功后的回调函数
  fail: []; //该任务执行失败后的回调函数

  // runTime: Date; //需要重新思考！！！
  // callback: Promise[]

  constructor() {
    this.state = TASK_STATE.VIRGIN; //默认初始状态为'VIRGIN'
    this.taskId = `id_${new Date().getTime()}`; //暂时选用当前时间戳替代UUID
  }

  /**
   * get the state of task
   * @param { number } taskId
   * @returns { string } state
   */
  getState(): string {
    return this.state;
  }

  /**
   * set the state of task
   * @param { string } state
   */
  setState(state: string): boolean {
    if(!TASK_STATE[state]) {
      return false;
    }
    this.state = state;
    return true;
  }

  /**
   * wakeup the task
   * taskQuene? -> processorQuene;
   */
  wakeup() {
    this.setState(TASK_STATE.SCHEDULED);
  }
}
