import fetch from '@/utils/fetch'

export default {
  getUserManageTableData (params) {
    return fetch({
      url: '/admin/user/findPage',
      method: 'get',
      params: params
    })
  },
  disableUser (id) {
    return fetch({
      url: '/admin/user/disableUser/' + id,
      method: 'patch'
    })
  },
  enableUser (id) {
    return fetch({
      url: '/admin/user/enableUser/' + id,
      method: 'patch'
    })
  },
  findUserById (id) {
    return fetch({
      url: '/admin/user/findUserById/' + id,
      method: 'get'
    })
  },
  findUserVOById (id) {
    return fetch({
      url: '/admin/user/findUserVOById/' + id,
      method: 'get'
    })
  },
  addUser (data) {
    return fetch({
      url: '/admin/user/addUser',
      method: 'post',
      data: data
    })
  },
  modifyUser (id, data) {
    return fetch({
      url: '/admin/user/modifyUser/' + id,
      method: 'patch',
      data: data
    })
  },
  getUserTypeEnumList() {
    return fetch({
      url: '/admin/user/getUserTypeEnum',
      method: 'get'
    })
  },
  getEnterpriseList() {
    return fetch({
      url: '/trace-base/enterprises/findAllUseEnterpriseList',
      method: 'get'
    })
  }
}
