// import { EventEmitter } from './EventEmitter.ts';
// import { EventEmitter } from './eventEmitter3.js';

// const EventEmitter = require('./eventEmitter3.js');
// const EventEmitter = require('./EventEmitter_abondon.ts');
import {EventEmitter} from './EventEmitter';

var emitter1 = new EventEmitter();
var emitter2 = new EventEmitter();


function handleOne(a, b, c) {
    console.log('第一个监听函数', a, b, c)
}

function handleSecond(a, b, c) {
    console.log('第二个监听函数', a, b, c)
}

function handleThird(a, b, c) {
    console.log('第三个监听函数', a, b, c)
}

emitter1.on("demo", handleOne)
       // .once("demo", handleSecond)
       // 
emitter2.on("demo", handleThird);

emitter1.emit('demo', [1, 2, 3]);
// => 第一个监听函数 1 2 3
// => 第二个监听函数 1 2 3
// => 第三个监听函数 1 2 3

emitter2.emit('demo', [1,2, 3])

// emitter.remove('demo', handleThird);
// emitter.emit('demo', [1, 2, 3]);
// // => 第一个监听函数 1 2 3

// emitter.removeAll();
// emitter.emit('demo', [1, 2, 3]);
// // nothing