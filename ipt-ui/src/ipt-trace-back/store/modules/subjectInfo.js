import Api from '@/ipt-trace-back/api'
import * as types from '../mutation-types'

// initial state
const moduleNodeRecordTableData = {
  state: {
    nodeRecordList: {},
    businessesRecordList: {},
    storeRecordList: {}
  },

// getters
  getters: {
    nodeRecordList: state => state.nodeRecordList,
    businessesRecordList: state => state.businessesRecordList,
    storeRecordList: state => state.storeRecordList
  },

// actions
  actions: {
    getNodeRecordList({commit}, params) {
      Api.NodeRecord.findPage(params).then(nodeRecordList => {
        commit(types.GET_NODE_RECORD_LIST, {nodeRecordList})
      })
    },
    getBusinessesRecordList({commit}, params) {
      Api.BusinessesRecord.findPage(params).then(businessesRecordList => {
        commit(types.GET_BUSINESSES_USING_LIST, {businessesRecordList})
      })
    },
    getStoreRecordList({commit}, params) {
      Api.StoreRecord.findPage(params).then(storeRecordList => {
        commit(types.GET_STORE_RECORD_LIST, {storeRecordList})
      })
    }
  },

// mutations
  mutations: {
    [types.GET_NODE_RECORD_LIST](state, {nodeRecordList}) {
      state.nodeRecordList = nodeRecordList
    },
    [types.GET_BUSINESSES_USING_LIST](state, {businessesRecordList}) {
      state.businessesRecordList = businessesRecordList
    },
    [types.GET_STORE_RECORD_LIST](state, {storeRecordList}) {
      state.storeRecordList = storeRecordList
    }
  }
}

export default {
  modules: {
    moduleNodeRecordTableData
  }
}
