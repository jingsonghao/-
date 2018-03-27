import fetch from '@/utils/fetch'

export default {
  apiUrl: '/home-admin/channels',
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
  enable(id) {
    return fetch({
      url: this.apiUrl + '/' + id + '/enable',
      method: 'patch'
    })
  },
  disable(id) {
    return fetch({
      url: this.apiUrl + '/' + id + '/disable',
      method: 'patch'
    })
  }
}
