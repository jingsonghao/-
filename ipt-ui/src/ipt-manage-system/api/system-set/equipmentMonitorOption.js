import fetch from '@/utils/fetch'

export default {
  getEquipmentMonitorOptionTableData (params) {
    return fetch({
      url: '/admin/equipmentMonitorOption/findPage',
      method: 'get',
      params: params
    })
  },
  findEquipmentMonitorOption (id) {
    return fetch({
      url: '/admin/equipmentMonitorOption/findByMonitorOptionId/' + id,
      method: 'get'
    })
  },
  modifyEquipmentMonitorOption (id, data) {
    return fetch({
      url: '/admin/equipmentMonitorOption/modifyEquipmentMonitorOption/' + id,
      method: 'patch',
      data: data
    })
  },
  getPageQueryList () {
    return fetch({
      url: '/admin/equipmentMonitorOption/getPageQueryList',
      method: 'get'
    })
  }
}
