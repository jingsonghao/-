export default {
  /**
   * @描述 : 以Json形式返回请求地址上的参数
   * @作者 : yanggang
   * @日期 : 2017/12/19
   * @时间 : 14:54
   */
  getUrlParams(url) {
    url = url === null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return obj
  }
}
