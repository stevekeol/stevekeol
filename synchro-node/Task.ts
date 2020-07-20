/*!
 * Task.ts - 任务
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-16 10:00
 */
import { EventEmitter } from './EventEmitter'
import { TASK_STATE } from './Constant';
import { random } from './util';


export class Task extends EventEmitter {
  taskId: string; //是否可取消?
  state: string;
  type: string; //'DOWNLOAD_HEADER', 'VERTIFY_HEADER', 'DOWNLOAD_ACCOUNT', 'VERTIFY_ACCOUNT'
  progress: number; //任务完成进度，如区块同步/验证的高度/时间;

  // preTask: []; //该任务的依赖任务（预热任务) //最佳实现方式是?
  // success: []; //该任务执行成功后的回调函数
  // fail: []; //该任务执行失败后的回调函数

  // runTime: Date; //需要重新思考！！！
  // callback: Promise[]

  constructor(type) {
    super();
    this.taskId = `id_${new Date().getTime()}${random()}`; //暂时选用当前时间戳+5位随机数字替代UUID
    this.state = TASK_STATE.VIRGIN; //默认初始状态为'VIRGIN'
    this.type = type; //Task的类型(TASK_TYPE中的一种)
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
   * 同步该任务的进度(暂定以区块链的高度为进度指标)
   * @param { string } state
   */
  updateProgress(height: number) {
    this.progress = height;
  }  
}
