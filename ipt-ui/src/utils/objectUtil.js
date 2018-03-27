export default {
  /**
   * @描述 : 深拷贝
   * @作者 : yanggang
   * @日期 : 2017/12/5
   * @时间 : 14:16
   */
  deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {}
          targetObj[keys] = this.deepClone(source[keys])
        } else {
          targetObj[keys] = source[keys]
        }
      }
    }
    return targetObj
  }
}
