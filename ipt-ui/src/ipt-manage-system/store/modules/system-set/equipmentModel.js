import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleEquipmentModelTableData = {
  state: {
    equipmentModelTableData: {}
  },
  getters: {
    equipmentModelTableData: state => state.equipmentModelTableData
  },
  actions: {
    getEquipmentModelTableData({commit}, params) {
      Api.EquipmentModel.getEquipmentModelTableData(params).then((equipmentModelTableData) => {
        commit(types.GET_EQUIPMENT_MODEL_TABLE_DATA, {equipmentModelTableData})
      })
    }
  },
  mutations: {
    [types.GET_EQUIPMENT_MODEL_TABLE_DATA](state, {equipmentModelTableData}) {
      state.equipmentModelTableData = equipmentModelTableData
    }
  }
}
export default {
  modules: {
    moduleEquipmentModelTableData
  }
}
