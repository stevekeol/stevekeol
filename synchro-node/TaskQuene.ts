/*!
 * TaskQuene.ts - 任务队列
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-16 10:00
 */
// import { Task } from './Task';

// export class TaskQuene {
//   quene: []; //对象数组在ts中怎么声明类型

//   constructor() {
//     this.quene = [];
//   }

//   /**
//    * judge the quene is empty
//    * @returns { boolean }
//    */
//   isEmpty(): boolean {
//     return this.quene.length ? false : true;
//   }

//   //此处的Task来源是?
//   //应该返回什么：整个新的队列，还是刚添加的task，还是true/false?
//   add(task: Task) {
//     this.quene.push(task);
//   }
// }


import { Task } from './Task';

let task = new Task();

console.log(task.setState('SUCCESSED'));
console.log(task.wakeup());
console.log(task.getState());
