import fetch from '@/utils/fetch'

export default {
  getUserOptLogTableData (params) {
    return fetch({
      url: '/admin/logInfo/findUserOptLogPage',
      method: 'get',
      params: params
    })
  },
  getSystemRunLogTableData (params) {
    return fetch({
      url: '/admin/logInfo/findSystemRunLogPage',
      method: 'get',
      params: params
    })
  },
  getPageQueryEnumList () {
    return fetch({
      url: '/admin/logInfo/getPageQueryEnumList',
      method: 'get'
    })
  }
}
