import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleEquipmentMonitorOptionTableData = {
  state: {
    equipmentMonitorOptionTableData: {}
  },
  getters: {
    equipmentMonitorOptionTableData: state => state.equipmentMonitorOptionTableData
  },
  actions: {
    getEquipmentMonitorOptionTableData({commit}, params) {
      Api.EquipmentMonitorOption.getEquipmentMonitorOptionTableData(params).then((equipmentMonitorOptionTableData) => {
        commit(types.GET_EQUIPMENT_MONITOR_OPTION_TABLE_DATA, {equipmentMonitorOptionTableData})
      })
    }
  },
  mutations: {
    [types.GET_EQUIPMENT_MONITOR_OPTION_TABLE_DATA](state, {equipmentMonitorOptionTableData}) {
      state.equipmentMonitorOptionTableData = equipmentMonitorOptionTableData
    }
  }
}
export default {
  modules: {
    moduleEquipmentMonitorOptionTableData
  }
}
