import Api from '@/ipt-supervise-help/api'
import * as types from '../../mutation-types'

const moduleEquipmentAdjustTableData = {
  state: {
    equipmentAdjustTableData: {},
    equipmentSelectListData: {},
    equipmentSelectTableData: {}
  },
  getters: {
    equipmentAdjustTableData: state => state.equipmentAdjustTableData,
    equipmentSelectListData: state => state.equipmentSelectListData,
    equipmentSelectTableData: state => state.equipmentSelectTableData
  },
  actions: {
    getEquipmentAdjustTableData({commit}, params) {
      Api.EquipmentAdjust.getEquipmentAdjustTableData(params).then((equipmentAdjustTableData) => {
        commit(types.GET_EQUIPMENT_ADJUST_TABLE_DATA, {equipmentAdjustTableData})
      })
    },
    getEquipmentSelectTableData({commit}, params) {
      Api.EquipmentAdjust.getEquipmentList(params).then((equipmentSelectTableData) => {
        equipmentSelectTableData = equipmentSelectTableData.data
        commit(types.GET_EQUIPMENT_SELECT_TABLE_DATA, {equipmentSelectTableData})
      })
    },
    getEquipmentSelectListData({commit}, equipmentSelectListData) {
      commit(types.GET_EQUIPMENT_SELECT_LIST_DATA, {equipmentSelectListData})
    }
  },
  mutations: {
    [types.GET_EQUIPMENT_ADJUST_TABLE_DATA](state, {equipmentAdjustTableData}) {
      state.equipmentAdjustTableData = equipmentAdjustTableData
    },
    [types.GET_EQUIPMENT_SELECT_TABLE_DATA](state, {equipmentSelectTableData}) {
      state.equipmentSelectTableData = equipmentSelectTableData
    },
    [types.GET_EQUIPMENT_SELECT_LIST_DATA](state, {equipmentSelectListData}) {
      state.equipmentSelectListData = equipmentSelectListData
    }
  }
}
export default {
  modules: {
    moduleEquipmentAdjustTableData
  }
}
