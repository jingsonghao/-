export default {
  /**
   * @描述 : 删除数组中的特定对象
   * @作者 : yanggang
   * @日期 : 2017/12/19
   * @时间 : 13:11
   */
  remove(arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        arr.splice(i, 1)
        break
      }
    }
  }
}
