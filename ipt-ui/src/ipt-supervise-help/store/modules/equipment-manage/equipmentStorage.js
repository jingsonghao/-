import Api from '@/ipt-supervise-help/api'
import * as types from '../../mutation-types'

const moduleEquipmentStorageTableData = {
  state: {
    normalEquipmentStorageTableData: {},
    abnormalEquipmentStorageTableData: {},
    normalEquipmentModelViewDetail: {},
    abnormalEquipmentModelViewDetail: {}
  },
  getters: {
    normalEquipmentStorageTableData: state => state.normalEquipmentStorageTableData,
    abnormalEquipmentStorageTableData: state => state.abnormalEquipmentStorageTableData,
    normalEquipmentModelViewDetail: state => state.normalEquipmentModelViewDetail,
    abnormalEquipmentModelViewDetail: state => state.abnormalEquipmentModelViewDetail
  },
  actions: {
    getNormalEquipmentStorageTableData({commit}, params) {
      Api.EquipmentStorage.getNormalEquipmentStorageTableData(params).then((normalEquipmentStorageTableData) => {
        commit(types.GET_NORMAL_EQUIPMENT_STORAGE_TABLE_DATA, {normalEquipmentStorageTableData})
      })
    },
    getAbnormalEquipmentStorageTableData({commit}, params) {
      Api.EquipmentStorage.getAbnormalEquipmentStorageTableData(params).then((abnormalEquipmentStorageTableData) => {
        commit(types.GET_ABNORMAL_EQUIPMENT_STORAGE_TABLE_DATA, {abnormalEquipmentStorageTableData})
      })
    },
    findNormalEquipmentModelViewDetail({commit}, params) {
      Api.EquipmentStorage.findNormalEquipmentModelViewDetail(params).then((normalEquipmentModelViewDetail) => {
        normalEquipmentModelViewDetail = normalEquipmentModelViewDetail.data
        commit(types.FIND_NORMAL_EQUIPMENT_MODEL_VIEW_DETAIL, {normalEquipmentModelViewDetail})
      })
    },
    findAbnormalEquipmentModelViewDetail({commit}, params) {
      Api.EquipmentStorage.findAbnormalEquipmentModelViewDetail(params).then((abnormalEquipmentModelViewDetail) => {
        abnormalEquipmentModelViewDetail = abnormalEquipmentModelViewDetail.data
        commit(types.FIND_ABNORMAL_EQUIPMENT_MODEL_VIEW_DETAIL, {abnormalEquipmentModelViewDetail})
      })
    }
  },
  mutations: {
    [types.GET_NORMAL_EQUIPMENT_STORAGE_TABLE_DATA](state, {normalEquipmentStorageTableData}) {
      state.normalEquipmentStorageTableData = normalEquipmentStorageTableData
    },
    [types.GET_ABNORMAL_EQUIPMENT_STORAGE_TABLE_DATA](state, {abnormalEquipmentStorageTableData}) {
      state.abnormalEquipmentStorageTableData = abnormalEquipmentStorageTableData
    },
    [types.FIND_NORMAL_EQUIPMENT_MODEL_VIEW_DETAIL](state, {normalEquipmentModelViewDetail}) {
      state.normalEquipmentModelViewDetail = normalEquipmentModelViewDetail
    },
    [types.FIND_ABNORMAL_EQUIPMENT_MODEL_VIEW_DETAIL](state, {abnormalEquipmentModelViewDetail}) {
      state.abnormalEquipmentModelViewDetail = abnormalEquipmentModelViewDetail
    }
  }
}
export default {
  modules: {
    moduleEquipmentStorageTableData
  }
}
