import fetch from '@/utils/fetch'

export default {
  getEquipmentTableData(params) {
    return fetch({
      url: '/trace-supervise/equipment/findPage',
      method: 'get',
      params: params
    })
  },
  getPageQueryList() {
    return fetch({
      url: '/trace-supervise/equipment/getPageQueryList',
      method: 'get'
    })
  },
  getEquipmentTypeList() {
    return fetch({
      url: '/admin/equipmentType/findAllEquipmentTypeList',
      method: 'get'
    })
  },
  getOneLevelCateList() {
    return fetch({
      url: '/admin/cate/getOneLevelCateList',
      method: 'get'
    })
  },
  addEquipment(data) {
    return fetch({
      url: '/trace-supervise/equipment/addEquipment',
      method: 'post',
      data: data
    })
  },
  modifyEquipment(id, data) {
    return fetch({
      url: '/trace-supervise/equipment/modifyEquipment/' + id,
      method: 'patch',
      data: data
    })
  },
  getEquipmentModelList(equipmentTypeId) {
    return fetch({
      url: '/admin/equipmentModel/findModelListByEquipmentTypeId/' + equipmentTypeId,
      method: 'get'
    })
  },
  findByEquipmentId(id) {
    return fetch({
      url: '/trace-supervise/equipment/findVOByEquipmentId/' + id,
      method: 'get'
    })
  },
  deleteEquipment(id) {
    return fetch({
      url: '/trace-supervise/equipment/deleteEquipment/' + id,
      method: 'patch'
    })
  }
}
