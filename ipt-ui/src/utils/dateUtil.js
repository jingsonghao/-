export default {
  /**
   * @描述 : 格式化时间日期
   * @作者 : yanggang
   * @日期 : 2017/12/19
   * @时间 : 14:53
   */
  parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) {
        time = parseInt(time) * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
  },

  computeSeconds(start, end) {
    let seconds = 0
    if (typeof start === 'object' && end === 'object') {
      seconds = end.getTime() - start.getTime()
    } else {
      seconds = parseInt(end) - parseInt(start)
    }
    return seconds / 1000
  }
}
