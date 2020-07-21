/*!
 * Block.ts - 区块信息的结构化定义
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-21 14:00
 */
const CryptoJS = require('crypto-js')

class Block {
  /**
   * 构造函数
   * @param {Number} index 
   * @param {String} previousHash 
   * @param {Number} timestamp 
   * @param {*} data 
   * @param {String} hash 
   */
  constructor(height, previousHash, timestamp, data, hash) {
    this.height = height // 区块的位置
    this.previousHash = previousHash + '' // 前一个区块的hash
    this.timestamp = timestamp // 生成区块时候的时间戳
    this.data = data // 区块本身携带的数据
    this.hash = hash + '' // 区块根据自身信息和规则生成的hash
  }
}

