import fetch from '@/utils/fetch'

export default {
  getEquipmentAdjustTableData(params) {
    return fetch({
      url: '/trace-supervise/equipmentAdjust/findPage',
      method: 'get',
      params: params
    })
  },
  getEquipmentList(data) {
    return fetch({
      url: '/trace-supervise/equipment/findInStorageEquipmentVOList',
      method: 'get',
      params: data
    })
  },
  getAllUseEnterpriseList() {
    return fetch({
      url: '/trace-base/enterprises/findAllUseEnterpriseList',
      method: 'get'
    })
  },
  addEquipmentGrant(data) {
    return fetch({
      url: '/trace-supervise/equipmentAdjust/addEquipmentGrant',
      method: 'post',
      data: data
    })
  },
  findVOByEquipmentAdjustId(id) {
    return fetch({
      url: '/trace-supervise/equipmentAdjust/findVOByEquipmentAdjustId/' + id,
      method: 'get'
    })
  },
  getPageQueryList() {
    return fetch({
      url: '/trace-supervise/equipmentAdjust/getPageQueryList',
      method: 'get'
    })
  }
}
