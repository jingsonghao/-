import fetch from '@/utils/fetch'

export default {
  /*显示page分页的数据*/
  /*getQuestionReportTableData(params, cb) {
    const url = '/api/questionReportTableData'
    return axios.get(url, params).then((response) => {
      response = response.data
      if (response.status === CONSTANT.STATUS.SUCCESS && typeof cb === 'function') {
        cb(response)
      }
    })
  }*/

  /**  2017/12/11 获取问题报告列表 */
  getQuestionReportTableData(params) {
    return fetch({
      url:  '/trace-supervise/pr',
      method: 'get',
      params: params
    })
  },
  /** 获取用户分页列表 */
  getUserTableData(params) {
    return fetch({
      url:  '/trace-supervise/pr/user',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 添加 */
  addQuestionReport(params) {
    return fetch({
      url:  '/trace-supervise/pr',
      method: 'post',
      data: params
    })
  },
  /** yanggang 2017/12/5 查询详情 */
  findQuestionReport(id) {
    return fetch({
      url: '/trace-supervise/pr/' + id,
      method: 'get'
    })
  },
  /** yanggang 2017/12/5 更新 */
  updateQuestionReport(id, params) {
    return fetch({
      url: '/trace-supervise/pr/' + id,
      method: 'patch',
      data: params
    })
  },
  /** yanggang 2017/12/5 审核 */
  approvalQuestionReport(id, params) {
    return fetch({
      url: '/trace-supervise/pr/audit/' + id,
      method: 'patch',
      data: params
    })
  },
  /** liutian 2017/12/13 审核类型 */
  getProblemReportTypes(params) {
    return fetch({
      url:  '/trace-supervise/pr/problemReportTypes',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 删除 */
  deleteQuestionReport(id) {
    return fetch({
      url: '/trace-supervise/pr/' + id,
      method: 'delete'
    })
  }

}
