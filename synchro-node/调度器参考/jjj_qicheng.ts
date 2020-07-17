

//处理异步数组函数
async function t(list: AsyncGenerator[]) {
  console.log(list.length)
  let tasks = list.slice();
  let delList: any = [];
  let i = 0;
  while (tasks.length) {
    console.log("执行中" + i)
    delList = await doSomesting(tasks);
    tasks = detailList(tasks, delList);
    i++;
  }
}
//异步执行函数操作
async function doSomesting(list) {
  let delList = [];
  for (let i = 0; i < list.length; i++) {
    let data = await list[i].next();
    console.log(data);
    if (data.done) delList.push(list[i]);
  }
  return delList;
}
//删除完成的异步函数
function detailList(asyncList, delList) {
  var arr = asyncList;
  var a = delList;
  for (let x = arr.length - 1; x >= 0; x--) {
    for (let i = a.length - 1; i >= 0; i--) {
      if (arr[x] === a[i]) {
        arr.splice(x, 1);
      }
    }
  }
  return arr;
}
async function* t1() {
  yield 'hello1';
  yield 'world1';
  return 'ending1';
}

// 任务2
async function* t2() {
  yield 'hello2';
  return 'ending2';
}

// 任务3
async function* t3() {
  yield 'hello3';
  yield 'world3';
  yield '你好3';
  return 'ending3';
}
var a = t1();
var b = t2();
var c = t3();
let list: AsyncGenerator[] = [a, b, c];
t(list);