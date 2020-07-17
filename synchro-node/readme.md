### 多任务调度器的实现

##### 背景
+ Task是Web开发的经典场景：某些不需要在当下立即执行的任务，或是需要定时去执行的一些任务。
+ 需要： 1. 一个用来存放任务的队列；2. 用来执行任务的工具； 3. 可能需要定时执行的任务调度器。
+ 任务队列：主要是依次执行一些列异步的任务； 任务调度：和时间相关的，可能执行任务或者系统命令。

##### 任务队列的设计
+ 【任务的定义】：需要注意的是任务的依赖。因为任务是进入队列并有额外的调度执行者来执行，因此应当将任务可能需要的参数，或者依赖对象序列化后存储在一个额外的地方。执行该任务时再反序列化。 任务队列可以是单一队列或多队列。单一任务可能有些固定API：移出/移入队列，任务状态查询，任务失败的回调等。 任务的定义是强依赖于于任务队列的存储介质和任务的执行者的实现的。
+ 【任务如何进入队列】： 任务队列需要存放任务的名字、类型、所需参数、任务本身数据等。还得提供一些接口：删除某个待执行任务，清空队列，查询队列当前执行情况。
+ 【任务队列的调度执行】：任务调度执行者是永不停止的。按照权重/先后顺序执行。在任务完成/出错/超时后，执行下一个任务。任务队列清空后，可以sleep一段时间后继续空转。

##### 需求
+ 任务有两类：预热任务、执行任务。后者依赖于前者。
+ 多任务调度器可以执行以上两种任务。
+ 任务都有自己的进度
+ 任务可以中途结束执行，也可中途启动参与执行
+ 任务可以互相唤醒（A任务向B任务发送一个信号，当B任务处在任务队列中？）

##### 头脑风暴
+ NodeJS中实现任务调度与执行的模块有：node-schedule、node-cron、agenda、bull、sia-task、light-task-scheduler
+ Bcoin中的任务调度文件：
+ BFchain-Mobile中的任务调度文件：

##### 思维草稿
+ 数据结构： 小顶堆实现优先级队列，优先级标准是任务下次执行时间
+ 四个类(掘金java并发编程源码解析)： Task(任务类)、 TaskQuene(任务队列类)、TaskProcessor(任务执行器类)、 TaskScheduler（多任务调度器类）。TaskScheduler内部维持TaskQuene和TaskProcessor，主线程创建Task并加入TaskQuene后由TaskProcessor异步轮询处理任务队列。
+ 任务的状态state有：VIRGIN = 0(任务被创建，但未被调度); SCHEDULED = 1(任务已调度但未执行); EXECUTED/SUCCESSED = 2(任务已执行); CANCELLED = 4(任务已取消，取消处于SCHEDULED状态的); ABORTED = 5(任务中止); FAILED = -1(任务在执行过程中报错导致任务中止)
+ 任务状态变更: new Task则由无 -> VIRGIN；
               TaskShceduler.sched则由VIRGIN -> SCHEDULED
               TaskScheduler.cancel/Task.cancel则由SCHEDULER -> CANCELLED
               TaskProcessor.run则由SCHEDULED -> EXECUTED
               TaskScheduler.purge则由CANCELLED -> 无
+ 任务的类型type有：实时任务（提交后需要立即执行）；定时任务（指定时间点单次执行）；corn轮次任务（每当XX时刻执行）
+ 该任务调度库的使用方法有: let ts = new TaskScheduler();
                          ts.init(); //?
+ 可以利用EventEmitter解耦（后续改进时再说）                          
                            

##### 其它
+ ``` CHAIN_SYNC_TIP_#TIME_#HEIGHT```您的节点已落后{{time}}，目前已开始同步剩下的{{height}}个区块，在同步过程中，当前节点将消耗大量的计算能力和网络流量，部分设备在这个过程中可能会发热，在同步结束后将恢复正常。
+ 执行失败的任务如何处理？1. 延迟执行的任务； 2. 定时执行的任务； 3. 类似节点数据同步的长任务
+ Task的cancel是什么意思？（从调度队列中删除 & task的state字段更改为cancelled）