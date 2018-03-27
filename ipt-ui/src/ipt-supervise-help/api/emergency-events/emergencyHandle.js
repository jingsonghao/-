import fetch from '@/utils/fetch'

//应急事件处理
export default {
  apiUrl: '/trace-supervise/emergency/event',
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
  },
  compound(id, params) {
    return fetch({
      url: this.apiUrl + '/' + id + '/compound',
      method: 'patch',
      data: params
    })
  }
}
