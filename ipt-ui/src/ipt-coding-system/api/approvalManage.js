import fetch from '@/utils/fetch'

export default {
  /** gaoj 2017/12/5 获取列表 */
  getApprovalManageTableData(params) {
    return fetch({
      url:  '/trace-code/codeApproval',
      method: 'get',
      params: params
    })
  },
  /** gaoj 2017/12/5 审核 */
  review(id, params) {
    return fetch({
      url: '/trace-code/codeApproval/' + id + '/review',
      method: 'patch',
      data: params
    })
  }
}
