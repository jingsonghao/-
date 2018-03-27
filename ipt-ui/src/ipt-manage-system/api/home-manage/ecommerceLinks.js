import fetch from '@/utils/fetch'

export default {
  getEcommerceLinksTableData(params) {
    return fetch({
      url: '/home-admin/eCommerceLink/findECommerceLinkPageList',
      method: 'get',
      params: params
    })
  },
  addEcommerceLinks(params) {
    return fetch({
      url: '/home-admin/eCommerceLink/addECommerceLink',
      method: 'put',
      params: params
    })
  },
  updateECommerceLink(id, params) {
    return fetch({
      url: '/home-admin/eCommerceLink/' + id,
      method: 'post',
      params: params
    })
  },
  findECommerceLinkRecord(id) {
    return fetch({
      url: '/home-admin/eCommerceLink/' + id,
      method: 'get'
    })
  },
  deleteECommerceLinkRecord(eCommerceLinkId) {
    return fetch({
      url: '/home-admin/eCommerceLink/deleteECommerceLink/' + eCommerceLinkId,
      method: 'delete'
    })
  },
  deleteBatchECommerceLink(params) {
    return fetch({
      url: '/home-admin/eCommerceLink/deleteBatch',
      method: 'post',
      data: params
    })
  }
}
