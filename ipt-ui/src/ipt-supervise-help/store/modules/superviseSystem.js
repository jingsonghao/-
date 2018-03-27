/**
 * Created by sqc on 2017/11/16.
 */
import Api from '@/ipt-supervise-help/api'
import * as types from './../mutation-types'

const moduleSuperviseSystemTableData = {
  state: {
    superviseSystemTableData: {},
    superviseTopTableData: {},
    showAssessTypeList: {}
  },
  getters: {
    superviseSystemTableData: state => state.superviseSystemTableData,
    superviseTopTableData: state => state.superviseTopTableData,
    showAssessTypeList: state => state.showAssessTypeList
  },
  actions: {
    getSuperviseSystemTableData({commit}, params) {
      Api.SuperviseSystem.getSuperviseSystemTableData(params).then(superviseSystemTableData => {
        commit(types.GET_SUPERVISE_SYSTEM_TABLE_DATA, {superviseSystemTableData})
      })
    },
    getSuperviseTopTableData({commit}, params) {
      Api.SuperviseSystem.getSuperviseTopTableData(params).then(superviseTopTableData => {
        commit(types.GET_SUPERVISE_TOP_TABLE_DATA, {superviseTopTableData})
      })
    },
    getShowAssessTypeList({commit}, params) {
      Api.SuperviseSystem.getShowAssessTypeList(params).then(showAssessTypeList => {
        commit(types.GET_SHOW_ASSESS_TYPE_LIST, {showAssessTypeList})
      })
    }
  },
  mutations: {
    [types.GET_SUPERVISE_SYSTEM_TABLE_DATA](state, {superviseSystemTableData}) {
      state.superviseSystemTableData = superviseSystemTableData
    },
    [types.GET_SUPERVISE_TOP_TABLE_DATA](state, {superviseTopTableData}) {
      state.superviseTopTableData = superviseTopTableData
    },
    [types.GET_SHOW_ASSESS_TYPE_LIST](state, {showAssessTypeList}) {
      state.showAssessTypeList = showAssessTypeList
    }
  }
}
export default {
  modules: {
    moduleSuperviseSystemTableData
  }
}
