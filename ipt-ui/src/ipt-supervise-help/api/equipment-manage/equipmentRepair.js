import fetch from '@/utils/fetch'

export default {
  getEquipmentRepairTableData(params) {
    return fetch({
      url: '/trace-supervise/equipmentRepair/findPage',
      method: 'get',
      params: params
    })
  },
  getPageQueryList () {
    return fetch({
      url: '/trace-supervise/equipmentRepair/getPageQueryList',
      method: 'get'
    })
  },
  findReturnEquipmentList (params) {
    return fetch({
      url: '/trace-supervise/equipment/findAllReturnEquipmentList',
      method: 'get',
      params: params
    })
  },
  addEquipmentRepair (data) {
    return fetch({
      url: '/trace-supervise/equipmentRepair/addEquipmentReturn',
      method: 'post',
      data: data
    })
  },
  findVOByEquipmentRepairId (id) {
    return fetch({
      url: '/trace-supervise/equipmentRepair/findVOByEquipmentRepairId/' + id,
      method: 'get'
    })
  },
  findByEquipmentRepairId (id) {
    return fetch({
      url: '/trace-supervise/equipmentRepair/findByEquipmentRepairId/' + id,
      method: 'get'
    })
  },
  getRepairedAndScrapEnumList () {
    return fetch({
      url: '/trace-supervise/equipmentRepair/getRepairedAndScrapEnumList',
      method: 'get'
    })
  },
  saveEquipmentRepair (id, data) {
    return fetch({
      url: '/trace-supervise/equipmentRepair/saveEquipmentRepair/' + id,
      method: 'patch',
      data: data
    })
  }
}
