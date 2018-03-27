import Api from '@/ipt-supervise-help/api'
import * as types from '../../mutation-types'

const moduleEquipmentMonitorTableData = {
  state: {
    equipmentMonitorTableData: {}
  },
  getters: {
    equipmentMonitorTableData: state => state.equipmentMonitorTableData
  },
  actions: {
    getEquipmentMonitorTableData({commit}, params) {
      Api.EquipmentMonitor.getEquipmentMonitorTableData(params).then((equipmentMonitorTableData) => {
        commit(types.GET_EQUIPMENT_MONITOR_TABLE_DATA, {equipmentMonitorTableData})
      })
    }
  },
  mutations: {
    [types.GET_EQUIPMENT_MONITOR_TABLE_DATA](state, {equipmentMonitorTableData}) {
      state.equipmentMonitorTableData = equipmentMonitorTableData
    }
  }
}
export default {
  modules: {
    moduleEquipmentMonitorTableData
  }
}
