export default {
  /**
   * @描述 : 编码
   * @作者 : yanggang
   * @日期 : 2017/12/5
   * @时间 : 14:16
   */
  encode(input) {
    var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "="
    var output = ""
    var chr1
    var chr2
    var chr3 = ""
    var enc1
    var enc2
    var enc3
    var enc4 = ""
    var i = 0
    do {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4)
      chr1 = chr2 = chr3 = ""
      enc1 = enc2 = enc3 = enc4 = ""
    } while (i < input.length)
    return output
  },
  /**
   * @描述 : 获取字符串长度
   * @作者 : yanggang
   * @日期 : 2017/12/19
   * @时间 : 14:53
   */
  getByteLen(val) {
    let len = 0
    for (let i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) {
        len += 1
      } else {
        len += 0.5
      }
    }
    return Math.floor(len)
  }
}
