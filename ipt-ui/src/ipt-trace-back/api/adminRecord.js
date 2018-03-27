import fetch from '@/utils/fetch'

export default {
  /** yanggang 2017/12/5 获取管理者备案列表 */
  apiUrl: '/trace-base/managers',
  findPage(params) {
    return fetch({
      url: this.apiUrl,
      method: 'get',
      params: params
    })
  },
  create(params) {
    return fetch({
      url: this.apiUrl,
      method: 'post',
      data: params
    })
  },
  getOne(id) {
    return fetch({
      url: this.apiUrl + '/' + id,
      method: 'get'
    })
  },
  deleteOne(id) {
    return fetch({
      url: this.apiUrl + '/' + id,
      method: 'delete'
    })
  },
  update(id, params) {
    return fetch({
      url: this.apiUrl + '/' + id,
      method: 'patch',
      data: params
    })
  },
  approval(id, params) {
    return fetch({
      url: this.apiUrl + '/' + id + '/approval',
      method: 'patch',
      data: params
    })
  }
}
