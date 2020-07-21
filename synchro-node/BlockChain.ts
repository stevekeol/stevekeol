/*!
 * BlockChain.ts - 区块链的结构化定义
 * Author: zhangjie @Instinct-Blockchain
 * CreateTime: 2020-07-21 14:00
 */

class BlockChain {
  constructor() {
    this.blocks = [this.getGenesisBlock()]
  }

  /**
   * 创世区块(硬编码)
   */
  getGenesisBlock() {
    return new Block(0, '0', 1552801194452, 'genesis block', '810f9e854ade9bb8730d776ea02622b65c02b82ffa163ecfe4cb151a14412ed4')
  }

  /**
   * 根据信息计算hash值
   */
  calcuteHash(height, previousHash, timestamp, data) {
    return CryptoJS.SHA256(height + previousHash + timestamp + data) + ''
  }

  /**
   * 得到区块链中最后一个块节点
   */
  getLatestBlock() {
    return this.blocks[this.blocks.length - 1]
  }

  /**
   * 计算当前链表的下一个区块
   * @param {*} blockData 
   */
  generateNextBlock(blockData) {
    const previousBlock = this.getLatestBlock()
    const nextIndex = previousBlock.height + 1
    const nextTimeStamp = new Date().getTime()
    const nextHash = this.calcuteHash(nextIndex, previousBlock.hash, nextTimeStamp, blockData)
    return new Block(nextIndex, previousBlock.hash, nextTimeStamp, blockData, nextHash)
  }

  /**
   * 向区块链添加新节点
   * @param {Block} newBlock 
   */
  addBlock(newBlock) {
    // 合法区块
    if(this.isValidNewBlock(newBlock, this.getLatestBlock())) {
      this.blocks.push(newBlock)
      return true  
    }
    return false
  }

  /**
   * 判断新加入的块是否合法
   * @param {Block} newBlock 
   * @param {Block} previousBlock 
   */
  isValidNewBlock(newBlock, previousBlock) {
    if( !(newBlock instanceof Block) || !(previousBlock instanceof Block) ) {
      return false
    }

    // 判断height是否自增
    if(newBlock.height !== previousBlock.height + 1) { 
      return false
    }

    // 判断区块中preHash是否和前一块相等
    if(newBlock.previousHash !== previousBlock.hash) { 
      return false
    }

    // 计算新块的hash值是否符合规则
    if(this.calcuteHash(newBlock.height, newBlock.previousHash, newBlock.timestamp, newBlock.data) !== newBlock.hash) { 
      return false
    }

    return true
  }

  /**
   * 插入新链表
   * @param {Array} newChain 
   */
  addChain(newChain) {
    if(this.isValidNewChain(newChain)) {
      const index = newChain[0].index
      this.blocks.splice(index)
      this.blocks = this.blocks.concat(newChain)
      return true
    }
    return false
  }

  /**
   * 判断新插入的区块链是否合法而且可以覆盖原来的节点
   * @param {Array} newChain 
   */
  isValidNewChain(newChain) {
    if(Array.isArray(newChain) === false || newChain.length === 0) {
      return false
    }

    let newChainLength = newChain.length,
      firstBlock = newChain[0]

    // 硬编码的起源块不能改变
    if(firstBlock.index === 0) {
      return false
    }

    // 移植新的链的长度 <= 现有链的长度
    // 新的链不可信
    if(newChainLength + firstBlock.index <= this.blocks.length) {
      return false
    }

    // 下面检查新的链能否移植
    // 以及新的链的每个节点是否符合规则
    if(!this.isValidNewBlock(firstBlock, this.blocks[firstBlock.index - 1])) {
      return false
    }

    for(let i = 1; i < newChainLength; ++i) {
      if(!this.isValidNewBlock(newChain[i], newChain[i - 1])) {
        return false
      }
    }
    return true
  }
}
