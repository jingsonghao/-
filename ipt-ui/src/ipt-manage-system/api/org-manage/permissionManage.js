import fetch from '@/utils/fetch'

export default {
  getPermissionManageTableData(params) {
    return fetch({
      url: '/admin/role/findPermissionManagePage',
      method: 'get',
      params: params
    })
  },
  findRoleVOById(id) {
    return fetch({
      url: '/admin/resource/findRoleVOById/' + id,
      method: 'get'
    })
  },
  getResourceTreeList() {
    return fetch({
      url: '/admin/resource/getResourceTreeList',
      method: 'get'
    })
  },
  modifyPermission(id, data) {
    return fetch({
      url: '/admin/role/modifyRolePermission/' + id,
      method: 'patch',
      data: data
    })
  }
}
