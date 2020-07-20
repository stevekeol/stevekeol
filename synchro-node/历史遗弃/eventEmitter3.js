/*
 * EventEmitter类实现发布订阅模式需要的步骤：
 * + 初始化空对象用来存储监听事件与对应的回调函数
 * + 添加监听事件，注册回调函数
 * + 触发事件，找出对应回调函数队列，一一执行
 * + 删除监听事件
 */

function EventEmitter() {
    this._events = Object.create(null);
}

EventEmitter.prototype.on = function(type, cb, flag) {
    if (!this._events) {
        this._events = Object.create(null);
    }

    if (type !== 'newListener') {
        this._events['newListener'] && this._events['newListener'].forEach( listener => {
            listener(type)
        })
    }

    if (this._events[type]) {
        if (flag) {
            this._events[type].unshift(cb)
        } else {
            this._events[type].push(cb)
        }
    } else {
        this._events[type] = [cb]
    }
}

EventEmitter.prototype.addListener = EventEmitter.prototype.on

// once
EventEmitter.prototype.once = function(type, cb, flag) {
        
    // 先绑定，调用后删除
    function wrap() {
        cb(...arguments);
        this.removeListener(type, wrap);
    }
    // 自定义属性
    // wrap.listen = cb;
    this.on(type, wrap, flag);
}


EventEmitter.prototype.emit = function() {
    let type = [].shift.call(arguments)
    if (this._events[type]) {
        this._events[type].forEach(fn => {
            fn.apply(this, arguments)
        })
    }
    
}

EventEmitter.prototype.removeAllListeners = function () {
    this._events = Object.create(null)
}

EventEmitter.prototype.removeListener = function(type) {
    if( this._events[type]) {
        this._events[type] = null
    }
}

// module.exports.EventEmitter = EventEmitter;

// export default EventEmitter;
module.exports = EventEmitter