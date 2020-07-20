/**
 * Created by zhangjie on 2020-07-16 15:00.
 */

// 任务类型
// exports.TASK_TYPE = {
//     CRON: 'CRON', 
//     REAL_TIME: 'REAL_TIME',
//     TIMER: 'TIMER',
//     REPEAT: 'REPEAT'
// };

//任务类型
exports.TASK_TYPE = {
    'DOWNLOAD_HEADER': 'DOWNLOAD_HEADER', //预下载区块头
    'VERTIFY_HEADER': 'VERTIFY_HEADER', //验证重放区块头
    'DOWNLOAD_ACCOUNT': 'DOWNLOAD_ACCOUNT', //预下载区块事件
    'VERTIFY_ACCOUNT': 'VERTIFY_ACCOUNT' //验证重放事件
}

// // 任务状态(较为完备)
// exports.TASK_STATUS = {
//     CREATE: 'CREATE',
//     RUNNING: 'RUNNING',
//     EXECUTE: 'EXECUTE',
//     PAUSE: 'PAUSE',
//     SUCCESS: 'SUCCESS',
//     FAILED: 'FAILED',
//     CANCEL: 'CANCEL'
// };

exports.TASK_STATE = {
    VIRGIN: 'VIRGIN', //任务被创建，但未被调度
    SCHEDULED: 'SCHEDULED', //任务已调度但未执行
    SUCCESSED: 'SUCCESSED', //任务已执行
    CANCELLED: 'CANCELLED', //任务已取消，从任务队列中取消
    ABORTED: 'ABORTED', //任务中止（即进入任务队列，等待唤醒）
    FAILED: 'FAILED', //任务在执行过程中报错导致任务中止（任务一样进入任务队列，等待唤醒）
}