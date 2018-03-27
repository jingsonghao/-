import fetch from '@/utils/fetch'

export default {
  getBackEnterpriseTableData(params) {
    return fetch({
      url: '/home-admin/awardEnterprise/findAwardEnterprisePageList',
      method: 'get',
      params: params
    })
  },
  addBackEnterprise(params) {
    return fetch({
      url: '/home-admin/awardEnterprise/addAwardEnterprise',
      method: 'put',
      params: params
    })
  },
  updateBackEnterprise(id, params) {
    return fetch({
      url: '/home-admin/awardEnterprise/' + id,
      method: 'post',
      params: params
    })
  },
  findBackEnterpriseRecord(id) {
    return fetch({
      url: '/home-admin/awardEnterprise/' + id,
      method: 'get'
    })
  },
  deleteBackEnterpriseRecord(id) {
    return fetch({
      url: '/home-admin/awardEnterprise/deleteAwardEnterprise/' + id,
      method: 'delete'
    })
  }
}
