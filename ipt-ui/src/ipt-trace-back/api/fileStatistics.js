import fetch from '@/utils/fetch'

export default {
  /** yanggang 2017/12/5 获取管理者备案列表 */
  getFileStatisticsData(params) {
    return fetch({
      url: '/trace-base/stat/records',
      method: 'get',
      params: params
    })
  },
  getEnterpriseInfoTableData(params) {
    return fetch({
      url: '/trace-base/stat/enterprise',
      method: 'get',
      params: params
    })
  }
}
