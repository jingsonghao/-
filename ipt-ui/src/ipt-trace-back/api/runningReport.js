import fetch from '@/utils/fetch'

export default {
  /*显示page分页的数据*/
  /*getRunningReportTableData(params, cb) {
    const url = '/api/questionReportTableData'
    return axios.get(url, params).then((response) => {
      response = response.data
      if (response.status === CONSTANT.STATUS.SUCCESS && typeof cb === 'function') {
        cb(response)
      }
    })
  }*/

  /**  2017/12/11 获取问题报告列表 */
  getRunningReportTableData(params) {
    return fetch({
      url:  '/trace-base/rr/findPr',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 添加 */
  addRunningReport(params) {
    return fetch({
      url:  '/trace-base/rr/addPr',
      method: 'post',
      data: params
    })
  },
  /** yanggang 2017/12/5 查询详情 */
  findRunningReport(id) {
    return fetch({
      url: '/trace-base/rr/' + id,
      method: 'get'
    })
  },
  /** yanggang 2017/12/5 更新 */
  updateAdminRecord(id, params) {
    return fetch({
      url: '/trace-base/rr/' + id,
      method: 'patch',
      data: params
    })
  },
  /** yanggang 2017/12/5 审核 */
  approvalRunningReport(id, params) {
    return fetch({
      url: '/trace-base/rr/audit/' + id,
      method: 'patch',
      data: params
    })
  },
  /** yanggang 2017/12/5 删除 */
  deleteAdminRecord(id) {
    return fetch({
      url: '/trace-base/rr/deletePr/' + id,
      method: 'delete'
    })
  }

}
