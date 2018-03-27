import Constant from '@/constant'
import axios from 'axios'
import {MessageBox} from 'element-ui'
import {getToken, removeToken} from './auth'
import NProgress from 'nprogress'

/** yanggang 2017/12/5 创建axios实例 */
const service = axios.create({
  /** yanggang 2017/12/5 请求超时时间 */
  timeout: 10000
})

/** Zhao Yun 2017/12/29 加载 */
let loading = {
  loadingInstance: undefined,
  minTimeout: 2,
  resolve: undefined,
  init: function () {
    /** Zhao Yun 2017/12/29 初始化加载实例 */
    NProgress.start()
    /** Zhao Yun 2017/12/29 创建Promise实例，去除resolve对象 */
    let promise = new Promise(resolve => {
      loading.resolve = resolve
    })
    let localTimeout = loading.minTimeout
    let interval = setInterval(() => {
      /** Zhao Yun 2017/12/29 只有时间到了之后才去调用promise的完成方法 */
      /** Zhao Yun 2017/12/29 简单的说，加载时间至少1s，以免时间过快导致加载刚显示就关闭了 */
      if (--localTimeout <= 0) {
        clearInterval(interval)
        promise.then(() => {
          NProgress.done()
        })
      }
    }, 1000)
  },
  close: function () {
    /** Zhao Yun 2017/12/29 完成promise  */
    loading.resolve({})
  }
}
let invalidToken = true

/** yanggang 2017/12/5 request拦截器 */
service.interceptors.request.use(config => {
  /** Zhao Yun 2017/12/29 发请求的时候去加载 */
  loading.init()
  config.headers['Authorization'] = getToken()
  return config
}, error => {
  /** yanggang 2017/12/5 异常处理 */
  console.log(error)
  Promise.reject(error)
})

/** yanggang 2017/12/5 respone拦截器 */
service.interceptors.response.use(
  response => {
    /** yanggang 2017/12/5 通过response自定义code标示请求状态 */
    const res = response.data
    /** Zhao Yun 2017/12/29 请求结束关闭加载 */
    loading.close()
    if (response.status !== 200) {
      return Promise.reject(new Error('error'))
    }
    switch (res.status) {
      case 40100:
      case 40101:
      case 40102:
      case 40104:
      case 40105:
        removeToken()
        console.log(Constant.VUE_INSTANCE.instance.$store.state.Common)
        if (invalidToken && !Constant.VUE_INSTANCE.instance.$store.state.Common.dialogFormVisible) {
          invalidToken = false
          MessageBox.confirm('请重新登陆', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
            removeToken()
            Constant.VUE_INSTANCE.instance.$store.dispatch('setDialogFormVisible', true)
            Constant.VUE_INSTANCE.instance.$router.push('/cityPlatform')
          })
        }
        break
      default:
        invalidToken = true
        break
    }
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.msg,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(new Error(error))
  }
)

export default service
