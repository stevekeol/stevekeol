/*!
 * simulateSyncroTask.ts - 模拟同步任务
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-22 14:00
 */

/*------------------------------僚机任务能中止目标任务-----------------------------*/
function serviceTask() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000, '僚机任务已完成');
  })
}

function task() {
  return new Promise(resolve => {
    setTimeout(() => {}, 2000, '目标任务已完成');
  })
}

// Promise.race([serviceTask(), task()])
//   .then(value => console.log(value));

/*-----------------------从数据库逐个获取区块------------------*/
const http = require('http');

let bufferPool = [];

function getBlockByHeight(height) {
  console.log('sasd')
  return new Promise((resolve, reject) => {
    http.get(`http://172.17.141.161:9527/block?height=${height}`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(JSON.parse(data));
        resolve(JSON.parse(data));
      })
    })
  })
}

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {console.log('okokok')}, time);
  })
}

async function syncBlockChain(start, end) {
  let curHeight = start;
  let block;
  console.log(curHeight);
  while(curHeight <= end) {
    block = await getBlockByHeight(curHeight);
    bufferPool.push(block);
    await sleep(1000);
    await curHeight++;
  }
} 

syncBlockChain(1, 10);

/*--------------------------------------------------------------------------------*/


function _syncBlockChain(file, start) {
  let currentHistoryBlock;
  let readStream = fs.createReadStream(file, { start: start, end: start + 1000 });

  readStream.setEncoding('utf8');

  readStream.on('data', function(chunk){
    currentHistoryBlock += chunk;
  });

  readStream.on('end', function(chunk){
    console.log('success');
    // return currentHistoryBlock;
  });
}



function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {console.log('okok')}, time);
  })
}



// function syncBlockChain(file) {
//   let historyBlock = '';
//   let start = 0;

//   return function _syncBlockChain() {
//     let readStream = fs.createReadStream(file, { start: start, end: start + 1000 });
//     readStream.setEncoding('utf8');
//     readStream.on('data', chunk => historyBlock += chunk);
//     readStream.on('end', () => {
//       sleep(500);
//       start += 1000;
//     })
//   }
// }


// sleep(2000);

// _syncBlockChain(file, start);

// let task_syncro_node = new Task(TASK_TYPE.DOWNLOAD_HEADER, syncBlockChain);

