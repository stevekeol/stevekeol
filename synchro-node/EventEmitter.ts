/*!
 * EventEmitter.ts - 事件触发器
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-20 10:00
 */

export class EventEmitter {
  private __events;

  constructor() {
    this.__events = {};
  }

  /**
   * 注册触发事件
   * @param { string } eventName
   * @returns { object } EventEmitter
   */
  on(eventName, listener) {
    if (!eventName || !listener) return;

    if (!EventEmitter.isValidListener(listener)) {
        throw new TypeError('listener must be a function');
    }

    let events = this.__events;
    let listeners = events[eventName] = events[eventName] || [];
    let listenerIsWrapped = typeof listener === 'object';

    // 不重复添加事件
    if (EventEmitter.indexOf(listeners, listener) === -1) {
      listeners.push(listenerIsWrapped ? listener : {
        listener: listener,
        once: false
      });
    }

    return this;
  }

  /**
   * 注册(一次性)触发事件
   * @param { string } eventName
   * @returns { object } EventEmitter
   */
  once(eventName, listener) {
    return this.on(eventName, {
      listener: listener,
      once: true
    })
  };

  /**
   * 主动触发事件
   * @param { string } eventName
   * @param { object } args
   * @returns { object } EventEmitter
   */
  emit(eventName, args) {
    let listeners = this.__events[eventName];
    if (!listeners) return;

    for (let i = 0; i < listeners.length; i++) {
      let listener = listeners[i];
      if (listener) {
        listener.listener.apply(this, args || []);
        if (listener.once) {
          this.remove(eventName, listener.listener)
        }
      }

    }
    return this;
  };

  /**
   * 注册(一次性)触发事件
   * @param { string } eventName
   * @returns { object } EventEmitter
   */
  remove(eventName, listener) {
      let listeners = this.__events[eventName];
      if (!listeners) return;

      let index;
      for (let i = 0, len = listeners.length; i < len; i++) {
          if (listeners[i] && listeners[i].listener === listener) {
              index = i;
              break;
          }
      }

      if (typeof index !== 'undefined') {
          listeners.splice(index, 1, null)
      }

      return this;
  };    

  /**
   * 移除所有注册的事件(传入eventName时，移除该eventName下的所有事件; 不传入任何参数时，移除所有注册的事件)
   * @param { eventName } eventName
   */
  removeAll(eventName) {
    if (eventName && this.__events[eventName]) {
      this.__events[eventName] = []
    } else {
      this.__events = {}
    }
  };

  /**
   * Helper
   * @param { function | object } listener
   * @returns { boolean }
   */
  static isValidListener(listener){
    if (typeof listener === 'function') {
      return true
    } else if (listener && typeof listener === 'object') {
      return EventEmitter.isValidListener(listener.listener)
    } else {
      return false
    }      
  }

  /**
   * Helper
   * @param { array } eventName
   * @param { object } item
   * @returns { object } EventEmitter
   */
  static indexOf(array, item) {
    let result = -1
    item = typeof item === 'object' ? item.listener : item;

    for (let i = 0, len = array.length; i < len; i++) {
      if (array[i].listener === item) {
        result = i
        break
      }
    }
    return result      
  }   
}