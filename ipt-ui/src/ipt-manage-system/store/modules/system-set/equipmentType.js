import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleEquipmentTypeTableData = {
  state: {
    equipmentTypeTableData: {}
  },
  getters: {
    equipmentTypeTableData: state => state.equipmentTypeTableData
  },
  actions: {
    getEquipmentTypeTableData({commit}, params) {
      Api.EquipmentType.getEquipmentTypeTableData(params).then((equipmentTypeTableData) => {
        commit(types.GET_EQUIPMENT_TYPE_TABLE_DATA, {equipmentTypeTableData})
      })
    }
  },
  mutations: {
    [types.GET_EQUIPMENT_TYPE_TABLE_DATA](state, {equipmentTypeTableData}) {
      state.equipmentTypeTableData = equipmentTypeTableData
    }
  }
}
export default {
  modules: {
    moduleEquipmentTypeTableData
  }
}
