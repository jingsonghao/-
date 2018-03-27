import fetch from '@/utils/fetch'

export default {
  getRoleManageTableData (params) {
    return fetch({
      url: '/admin/role/findRoleManagePage',
      method: 'get',
      params: params
    })
  },
  deleteRole (id) {
    return fetch({
      url: '/admin/role/deleteRole/' + id,
      method: 'delete'
    })
  },
  addRole (data) {
    return fetch({
      url: '/admin/role/addRole',
      method: 'post',
      data: data
    })
  },
  findRoleById (id) {
    return fetch({
      url: '/admin/role/findRoleById/' + id,
      method: 'get'
    })
  },
  modifyRole (id, data) {
    return fetch({
      url: '/admin/role/modifyRole/' + id,
      method: 'patch',
      data: data
    })
  },
  findAllRoleList () {
    return fetch({
      url: '/admin/role/findAllRoleList',
      method: 'get'
    })
  }
}
