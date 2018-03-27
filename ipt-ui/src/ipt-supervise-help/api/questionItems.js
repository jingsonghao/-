import fetch from '@/utils/fetch'

export default {
  /*显示page分页的数据*/
  /*getQuestionItemsTableData(params, cb) {
    const url = '/api/questionReportTableData'
    return axios.get(url, params).then((response) => {
      response = response.data
      if (response.status === CONSTANT.STATUS.SUCCESS && typeof cb === 'function') {
        cb(response)
      }
    })
  }*/

  /**  2017/12/11 获取问题报告列表 */
  getQuestionItemsTableData(params) {
    return fetch({
      url:  '/trace-supervise/ir',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 添加 */
  addQuestionItems(params) {
    return fetch({
      url:  '/trace-supervise/ir',
      method: 'post',
      data: params
    })
  },
  /** yanggang 2017/12/5 查询详情 */
  findQuestionItems(id) {
    return fetch({
      url: '/trace-supervise/ir/' + id,
      method: 'get'
    })
  },
  /** yanggang 2017/12/5 更新 */
  updateQuestionItems(id, params) {
    return fetch({
      url: '/trace-supervise/ir/' + id,
      method: 'patch',
      data: params
    })
  },
  /** yanggang 2017/12/5 审核 */
  approvalQuestionItems(id, params) {
    return fetch({
      url: '/trace-supervise/ir/audit/' + id,
      method: 'patch',
      data: params
    })
  },
  /** liutian 2017/12/13 审核类型 */
  getProblemReportTypes(params) {
    return fetch({
      url:  '/trace-supervise/ir/iroblemReportTypes',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 删除 */
  deleteQuestionItems(id) {
    return fetch({
      url: '/trace-supervise/ir/' + id,
      method: 'delete'
    })
  }

}
