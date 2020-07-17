
class ScheduleHandlerTS {
    taskList: AsyncGenerator[]; // 任务列表
    processingTaskList: AsyncGenerator[]; // 正在处理任务列表
    constructor() {
        this.taskList = [];
        this.processingTaskList = [];
    }

    // 新增一个任务
    addTask(task: AsyncGenerator) {
        this.taskList.push(task);
        this.run(this.taskList);
    }
    
    // 任务执行方法
    run(taskList: AsyncGenerator[]){
        taskList.forEach((task,i) => {
          if (this.processingTaskList.indexOf(task) === -1) {
            this.processingTaskList.push(task);
            this.genTaskHandler(task,taskList,this.processingTaskList);
          }
        });
    }

    // AsyncGenerator事件处理
    async genTaskHandler <T extends AsyncGenerator> (task: T, taskList: T[], processingTaskList: T[]) {
        async function next(data:any) {
            let result = await task.next(data);
            if(result.done) {
                taskList.splice(taskList.indexOf(task));
                processingTaskList.splice(processingTaskList.indexOf(task));
                return;
            }
            await next(result.value);
        }
        await next(undefined)
    }
}
// --------------------------------------------------------测试----------------------------------------------------------------
/**
 * 异步任务封装函数
 * @param num 延时次数
 * @param time 延时时间 
 * @param i 子任务标号
 */

const setIntervalPromise = (num = 10,time = 1000, i=0) => {
    return new Promise((resolve,reject)=>{
      let interval = setInterval(()=>{
        console.log(i,num)
        if (num===0){
          resolve(true)
          clearInterval(interval)
        }
        num--;
      },time)
    })
}

// 任务1
async function* gen1(){
    let a1 = yield setIntervalPromise(10, 1000,1);
    console.log('a1', a1);
    let a2 = yield setIntervalPromise(15, 1000,2);
    console.log('a2', a2);
}

// 任务2
async function* gen2(){
    let a3 = yield setIntervalPromise(5, 1000,3);
    console.log('a3', a3);
    let a4 = yield setIntervalPromise(20, 1000,4);
    console.log('a4', a4);
}

// 任务3
async function* gen3(){
    let a5 = yield setIntervalPromise(6, 1000,5);
    console.log('a5', a5);
    let a6 = yield setIntervalPromise(7, 1000,6);
    console.log('a6', a6);
}

// 测试函数
async function test() {
    let schedule = new ScheduleHandlerTS();
    // 加入任务1
    schedule.addTask(await gen1());
    // 加入任务2
    schedule.addTask(await gen2());
    // 3秒后加入任务3
    setTimeout(async ()=>{
        schedule.addTask(await gen3());
    },3000)
}

// 启动测试
test();

// 样例输出
/**
 * 第一列为子任务的标号，第二列为当前任务输出
 *  1 10
    3 5
    1 9
    3 4
    1 8
    3 3
    5 6
    1 7
    3 2
    5 5
    1 6
    3 1
    5 4
    1 5
    3 0
    a3 true
    5 3
    1 4
    4 20
    5 2
    1 3
    4 19
    5 1
    1 2
    4 18
    5 0
    a5 true
    1 1
    4 17
    6 7
    1 0
    a1 true
    4 16
    6 6
    2 15
    4 15
    6 5
    2 14
    4 14
    6 4
    2 13
    4 13
    6 3
    2 12
    4 12
    6 2
    2 11
    4 11
    6 1
    2 10
    4 10
    6 0
    a6 true
    2 9
    4 9
    2 8
    4 8
    2 7
    4 7
    2 6
    4 6
    2 5
    4 5
    2 4
    4 4
    2 3
    4 3
    2 2
    4 2
    2 1
    4 1
    2 0
    a2 true
    4 0
    a4 true
 */
  
  