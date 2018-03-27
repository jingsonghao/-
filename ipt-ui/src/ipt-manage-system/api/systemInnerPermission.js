import fetch from '@/utils/fetch'

export default {
  getSystemInnerPermissionTableData(params) {
    return fetch({
      url: '/admin/gateClient/findClientServicePage',
      method: 'get',
      params: params
    })
  },
  findServiceToEditSecret(id) {
    return fetch({
      url: '/admin/gateClient/findByClientId/' + id,
      method: 'get'
    })
  },
  modifyServiceSecret(id, data) {
    return fetch({
      url: '/admin/gateClient/modifySecret/' + id,
      method: 'patch',
      data: data
    })
  },
  deleteClientService(id) {
    return fetch({
      url: '/admin/gateClient/deleteClientService/' + id,
      method: 'delete'
    })
  },
  findClientServiceList(id) {
    return fetch({
      url: '/admin/gateClient/findClientServiceList/' + id,
      method: 'get'
    })
  },
  findServiceVO(id) {
    return fetch({
      url: '/admin/gateClient/findServiceVOByClientId/' + id,
      method: 'get'
    })
  },
  modifyServiceClientList(id, data) {
    return fetch({
      url: '/admin/gateClient/modifyServiceClientList/' + id,
      method: 'patch',
      data: data
    })
  },
  batchDelete(data) {
    return fetch({
      url: '/admin/gateClient/batchDeleteClient',
      method: 'delete',
      data: data
    })
  }
}
