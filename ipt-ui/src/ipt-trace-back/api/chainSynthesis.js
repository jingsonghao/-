/**
 * @描述: 追溯链条合成
 * @作者: Guo Ze Qiang
 * @日期: 2017/11/23
 * @时间: 10:00
 */
import fetch from '@/utils/fetch'

export default {
  /** yanggang 2017/12/5 获取管理者备案列表 */
  getChainSynthesisTableData(params) {
    return fetch({
      url:  '/trace-base/trace/findAll',
      method: 'get',
      params: params
    })
  }
  , getChain(id) {
    return fetch({
      url:  '/trace-base/trace/' + id,
      method: 'get'
    })
  }
}
