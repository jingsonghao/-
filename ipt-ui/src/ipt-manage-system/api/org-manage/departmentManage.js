import fetch from '@/utils/fetch'

export default {
  getUserDepartmentList() {
    return fetch({
      url: '/admin/department/getUserDepartmentList',
      method: 'get'
    })
  },
  getAllDepartment() {
    return fetch({
      url: '/admin/department/getAllDepartment',
      method: 'get'
    })
  },
  findParentDepartment() {
    return fetch({
      url: '/admin/department/findParentDepartment',
      method: 'get'
    })
  },
  disableDepartment(id) {
    return fetch({
      url: '/admin/department/disableDepartment/' + id,
      method: 'patch'
    })
  },
  enableDepartment(id) {
    return fetch({
      url: '/admin/department/enableDepartment/' + id,
      method: 'patch'
    })
  },
  findByDepartmentId(id) {
    return fetch({
      url: '/admin/department/findByDepartmentId/' + id,
      method: 'get'
    })
  },
  modifyDepartment(id, data) {
    return fetch({
      url: '/admin/department/modifyDepartment/' + id,
      method: 'patch',
      data: data
    })
  },
  addChildDepartment(data) {
    return fetch({
      url: '/admin/department/addChildDepartment',
      method: 'post',
      data: data
    })
  },
  addParentDepartment(data) {
    return fetch({
      url: '/admin/department/addParentDepartment',
      method: 'post',
      data: data
    })
  }
}
