import Api from '@/ipt-supervise-help/api'
import * as types from '../../mutation-types'

const moduleEquipmentRepairTableData = {
  state: {
    equipmentRepairTableData: {},
    equipmentReturnSelectTableData: {},
    equipmentReturnSelectListData: {}
  },
  getters: {
    equipmentRepairTableData: state => state.equipmentRepairTableData,
    equipmentReturnSelectTableData: state => state.equipmentReturnSelectTableData,
    equipmentReturnSelectListData: state => state.equipmentReturnSelectListData
  },
  actions: {
    getEquipmentRepairTableData({commit}, params) {
      Api.EquipmentRepair.getEquipmentRepairTableData(params).then((equipmentRepairTableData) => {
        commit(types.GET_EQUIPMENT_REPAIR_TABLE_DATA, {equipmentRepairTableData})
      })
    },
    getEquipmentReturnSelectTableData({commit}, params) {
      Api.EquipmentRepair.findReturnEquipmentList(params).then((equipmentReturnSelectTableData) => {
        equipmentReturnSelectTableData = equipmentReturnSelectTableData.data
        commit(types.GET_EQUIPMENT_RETURN_SELECT_TABLE_DATA, {equipmentReturnSelectTableData})
      })
    },
    getEquipmentReturnSelectListData({commit}, equipmentReturnSelectListData) {
      commit(types.GET_EQUIPMENT_RETURN_SELECT_LIST_DATA, {equipmentReturnSelectListData})
    }
  },
  mutations: {
    [types.GET_EQUIPMENT_REPAIR_TABLE_DATA](state, {equipmentRepairTableData}) {
      state.equipmentRepairTableData = equipmentRepairTableData
    },
    [types.GET_EQUIPMENT_RETURN_SELECT_TABLE_DATA](state, {equipmentReturnSelectTableData}) {
      state.equipmentReturnSelectTableData = equipmentReturnSelectTableData
    },
    [types.GET_EQUIPMENT_RETURN_SELECT_LIST_DATA](state, {equipmentReturnSelectListData}) {
      state.equipmentReturnSelectListData = equipmentReturnSelectListData
    }
  }
}
export default {
  modules: {
    moduleEquipmentRepairTableData
  }
}
