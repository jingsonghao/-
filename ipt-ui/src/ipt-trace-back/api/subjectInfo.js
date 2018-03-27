import fetch from '@/utils/fetch'

export default {
  getNodeRecordList(params) {
    return fetch({
      url: '/trace-base/enterprises',
      method: 'get',
      params: params
    })
  },
  findNodeRecord(id) {
    return fetch({
      url: '/trace-base/enterprises/' + id,
      method: 'get'
    })
  },
  updateNodeRecord(id, params) {
    return fetch({
      url: '/trace-base/enterprises/' + id,
      method: 'patch',
      data: params
    })
  },
  addNodeRecord(params) {
    return fetch({
      url:  '/trace-base/enterprises',
      method: 'post',
      data: params
    })
  },
  deleteNodeRecord(id) {
    return fetch({
      url: '/trace-base/enterprises/' + id,
      method: 'delete'
    })
  },
  approvalNodeRecord(id) {
    return fetch({
      url: '/trace-base/enterprises/' + id + '/approval',
      method: 'patch'
    })
  },
  getBusinessesUsingList(params) {
    return fetch({
      url: '/trace-base/businesses',
      method: 'get',
      params: params
    })
  },
  findBusinessesUsing(id) {
    return fetch({
      url: '/trace-base/businesses/' + id,
      method: 'get'
    })
  },
  updateBusinessesUsing(id, params) {
    return fetch({
      url: '/trace-base/businesses/' + id,
      method: 'patch',
      data: params
    })
  },
  addBusinessesUsing(params) {
    return fetch({
      url:  '/trace-base/businesses',
      method: 'post',
      data: params
    })
  },
  deleteBusinessesUsing(id) {
    return fetch({
      url: '/trace-base/businesses/' + id,
      method: 'delete'
    })
  },
  approvalBusinessesUsing(id) {
    return fetch({
      url: '/trace-base/businesses/' + id + '/approval',
      method: 'patch'
    })
  }
}
