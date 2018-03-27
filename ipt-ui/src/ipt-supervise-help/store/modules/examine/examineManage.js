/**
 * @描述: 考核指标管理
 * @作者: Guo Ze Qiang
 * @日期: 2017/12/14
 * @时间: 13:12
 */
import Api from '@/ipt-supervise-help/api'
import * as types from './../../mutation-types'

const moduleExamineManage = {
  state: {
    indexBaseTableData: {},
    showIndex: {},  //工作考核管理  -->综合性考核 -->单期考核详情 --> 按企业排名 -->查看
    nodeTypeShowIndex: {},  //工作考核管理  -->综合性考核 -->单期考核详情 --> 按流通节点类型排名 -->查看
    showIndexData: "" //页面之间传递的参数
  },
  getters: {
    indexBaseTableData: state => state.indexBaseTableData,
    showIndex: state => state.showIndex,  //工作考核管理  -->综合性考核 -->单期考核详情 --> 按企业排名 -->查看
    nodeTypeShowIndex: state => state.nodeTypeShowIndex,  //工作考核管理  -->综合性考核 -->单期考核详情 --> 按流通节点类型排名 -->查看
    showIndexData: state => state.showIndexData  //
  },
  actions: {
    getIndexBaseTableData({commit}, params) {
      Api.ExamineManage.getIndexBaseTableData(params).then((indexBaseTableData) => {
        commit(types.GET_INDEX_BASE_TABLE_DATA, {indexBaseTableData})
      })
    },
    getShowIndex({commit}, params) { //工作考核管理  -->综合性考核 -->单期考核详情 --> 按企业排名 -->查看
      Api.ExamineManage.getShowIndex(params).then((showIndex) => {
        commit(types.GET_SHOW_INDEX, {showIndex})
      })
    },
    getNodeTypeShowIndex({commit}, params) { //工作考核管理  -->综合性考核 -->单期考核详情 --> 按流通节点类型排名 -->查看
      Api.ExamineManage.getNodeTypeShowIndex(params).then((nodeTypeShowIndex) => {
        commit(types.GET_NODE_TYPE_SHOW_INDEX, {nodeTypeShowIndex})
      })
    },
    setShowIndexData({commit}, showIndexData) {
      commit(types.SET_SHOWINDEX_DATA, {showIndexData})
    }
  },
  mutations: {
    [types.GET_INDEX_BASE_TABLE_DATA](state, {indexBaseTableData}) {
      state.indexBaseTableData = indexBaseTableData
    },
    [types.GET_SHOW_INDEX](state, {showIndex}) { //工作考核管理  -->综合性考核 -->单期考核详情 --> 按企业排名 -->查看
      state.showIndex = showIndex
    },

    [types.GET_NODE_TYPE_SHOW_INDEX](state, {nodeTypeShowIndex}) {
      state.nodeTypeShowIndex = nodeTypeShowIndex //工作考核管理  -->综合性考核 -->单期考核详情 --> 按流通节点类型排名 -->查看
    },
    [types.SET_SHOWINDEX_DATA](state, {showIndexData}) { //
      state.showIndexData = showIndexData
    }
  }
}
export default {
  modules: {
    moduleExamineManage
  }
}
