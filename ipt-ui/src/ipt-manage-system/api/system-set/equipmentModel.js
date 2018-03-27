import fetch from '@/utils/fetch'

export default {
  getEquipmentModelTableData (params) {
    return fetch({
      url: '/admin/equipmentModel/findPage',
      method: 'get',
      params: params
    })
  },
  addEquipmentModel (data) {
    return fetch({
      url: '/admin/equipmentModel/addEquipmentModel',
      method: 'post',
      data: data
    })
  },
  disableEquipmentModel (id) {
    return fetch({
      url: '/admin/equipmentModel/disableEquipmentModel/' + id,
      method: 'patch'
    })
  },
  enableEquipmentModel (id) {
    return fetch({
      url: '/admin/equipmentModel/enableEquipmentModel/' + id,
      method: 'patch'
    })
  },
  findEquipmentModel (id) {
    return fetch({
      url: '/admin/equipmentModel/findByEquipmentModelId/' + id,
      method: 'get'
    })
  },
  modifyEquipmentModel (id, data) {
    return fetch({
      url: '/admin/equipmentModel/modifyEquipmentModel/' + id,
      method: 'patch',
      data: data
    })
  }
}
