import fetch from '@/utils/fetch'

export default {
  apiUrl: '/trace-supervise/emergency/plans',
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
  }
}
