import fetch from '@/utils/fetch'

export default {
  apiUrl: '/home-admin/news',
  getInfoPublishTableData(params) {
    return fetch({
      url: this.apiUrl,
      method: 'get',
      params: params
    })
  },
  addInfoPublish(params) {
    return fetch({
      url: this.apiUrl,
      method: 'post',
      data: params
    })
  },
  /** 查询详情 */
  findInfoPublish(id) {
    return fetch({
      url: this.apiUrl + '/' + id,
      method: 'get'
    })
  },
  /** 更新 */
  updateInfoPublish(id, params) {
    return fetch({
      url: this.apiUrl + '/' + id,
      method: 'patch',
      data: params
    })
  },
  /** 审核 */
  approvalInfoPublish(id, params) {
    return fetch({
      url: this.apiUrl + '/' + id + '/review',
      method: 'patch',
      data: params
    })
  },
  /** 删除 */
  deleteInfoPublish(id) {
    return fetch({
      url: this.apiUrl + '/' + id,
      method: 'delete'
    })
  },
  deleteBatchInfoPublish(params) {
    return fetch({
      url: '/home-admin/news/deleteBatch',
      method: 'post',
      data: params
    })
  }
}
