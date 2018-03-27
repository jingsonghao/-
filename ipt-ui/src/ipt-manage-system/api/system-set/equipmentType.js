import fetch from '@/utils/fetch'

export default {
  getEquipmentTypeTableData (params) {
    return fetch({
      url: '/admin/equipmentType/findPage',
      method: 'get',
      params: params
    })
  },
  addEquipmentType (data) {
    return fetch({
      url: '/admin/equipmentType/addEquipmentType',
      method: 'post',
      data: data
    })
  },
  findEquipmentType (id) {
    return fetch({
      url: '/admin/equipmentType/findByEquipmentTypeId/' + id,
      method: 'get'
    })
  },
  modifyEquipmentType (id, data) {
    return fetch({
      url: '/admin/equipmentType/modifyEquipmentType/' + id,
      method: 'patch',
      data: data
    })
  },
  disableEquipmentType (id) {
    return fetch({
      url: '/admin/equipmentType/disableEquipmentType/' + id,
      method: 'patch'
    })
  },
  enableEquipmentType (id) {
    return fetch({
      url: '/admin/equipmentType/enableEquipmentType/' + id,
      method: 'patch'
    })
  },
  getPageQueryList () {
    return fetch({
      url: '/admin/equipmentType/getPageQueryList',
      method: 'get'
    })
  },
  getEquipmentTypeList () {
    return fetch({
      url: '/admin/equipmentType/findAllEquipmentTypeList',
      method: 'get'
    })
  }
}
