import fetch from '@/utils/fetch'

export default {
  getEquipmentMonitorTableData(params) {
    return fetch({
      url: '/trace-supervise/equipmentMonitor/findPage',
      method: 'get',
      params: params
    })
  },
  findEquipmentByEnterpriseNo(no) {
    return fetch({
      url: '/trace-supervise/equipmentMonitor/findEquipmentByEnterpriseNo/' + no,
      method: 'get'
    })
  },
  getMonitorStatusEnum() {
    return fetch({
      url: '/trace-supervise/equipmentMonitor/getMonitorStatusEnum',
      method: 'get'
    })
  }
}
