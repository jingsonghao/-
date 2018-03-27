import Api from '@/ipt-supervise-help/api'
import * as types from '../../mutation-types'

const moduleEquipmentTableData = {
  state: {
    equipmentTableData: {}
  },
  getters: {
    equipmentTableData: state => state.equipmentTableData
  },
  actions: {
    getEquipmentTableData({commit}, params) {
      Api.EquipmentManage.getEquipmentTableData(params).then((equipmentTableData) => {
        commit(types.GET_EQUIPMENT_TABLE_DATA, {equipmentTableData})
      })
    }
  },
  mutations: {
    [types.GET_EQUIPMENT_TABLE_DATA](state, {equipmentTableData}) {
      state.equipmentTableData = equipmentTableData
    }
  }
}
export default {
  modules: {
    moduleEquipmentTableData
  }
}
