import fetch from '@/utils/fetch'

export default {
  getAllMenus(params) {
    return fetch({
      url: '/admin/resource/findResourceVOList',
      method: 'get',
      params: params
    })
  },
  enable(id) {
    return fetch({
      url: '/admin/resource/enableResource/' + id,
      method: 'patch'
    })
  },
  disable(id) {
    return fetch({
      url: '/admin/resource/disableResource/' + id,
      method: 'patch'
    })
  },
  update(id, params) {
    return fetch({
      url: '/admin/resource/' + id,
      method: 'patch',
      data: params
    })
  }
}
