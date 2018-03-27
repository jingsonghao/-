import fetch from '@/utils/fetch'

export default {
  /** zhanghuijie 2017/12/14 剔除信息恢复 */
  findPage(params) {
    return fetch({
      url:  '/trace-base/rejectInformation/findRejectInformationInAll',
      method: 'get',
      params: params
    })
  }
  , restore(id) {
    return fetch({
      url:  '/trace-base/rejectInformation/' + id + '/restore',
      method: 'patch'
    })
  }
}
