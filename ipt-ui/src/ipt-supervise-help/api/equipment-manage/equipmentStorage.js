import fetch from '@/utils/fetch'

export default {
  getNormalEquipmentStorageTableData(params) {
    return fetch({
      url: '/trace-supervise/equipmentStorage/findNormalPage',
      method: 'get',
      params: params
    })
  },
  getAbnormalEquipmentStorageTableData(params) {
    return fetch({
      url: '/trace-supervise/equipmentStorage/findAbnormalPage',
      method: 'get',
      params: params
    })
  },
  findNormalEquipmentModelStorage(id) {
    return fetch({
      url: '/trace-supervise/equipmentStorage/findNormalEquipmentModelStorage/' + id,
      method: 'get'
    })
  },
  findAbnormalEquipmentModelStorage(id) {
    return fetch({
      url: '/trace-supervise/equipmentStorage/findAbnormalEquipmentModelStorage/' + id,
      method: 'get'
    })
  },
  findNormalEquipmentModelViewDetail(params) {
    return fetch({
      url: '/trace-supervise/equipment/findNormalEquipmentModelViewDetail/' + params.equipmentTypeId + '/' + params.equipmentModelId,
      method: 'get'
    })
  },
  findAbnormalEquipmentModelViewDetail(params) {
    return fetch({
      url: '/trace-supervise/equipment/findAbnormalEquipmentModelViewDetail/' + params.equipmentTypeId + '/' + params.equipmentModelId,
      method: 'get'
    })
  }
}
