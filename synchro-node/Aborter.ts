/*!
 * Aborter.ts - 中断器
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-20 21:00
 */
import { EventEmitter } from './EventEmitter';


export class Aborter extends EventEmitter{
  pair: {}
  constructor() {
    super();
    this.pair ={};
  }

  
}

