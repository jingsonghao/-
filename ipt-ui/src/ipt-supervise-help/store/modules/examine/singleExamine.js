/**
 * @描述: 工作考核管理  -->综合性考核 -->单期考核详情 -->按企业排名+按流通节点排名+按考核指标排名
 * @作者: Guo Ze Qiang
 * @日期: 2017/12/14
 * @时间: 13:12
 */
import Api from "@/ipt-supervise-help/api"
import * as types from "./../../mutation-types"

const moduleSingleExamines = {
  state: {
    singleEnterpriseEnterprise: {}, //按企业排名
    singleExamineNode: {},  //按流通节点类型排名
    singleExamineIndex: {},  //按考核指标排名
    singleExamineEnterpriseEtDate: ''
  },
  getters: {
    singleEnterpriseEnterprise: state => state.singleEnterpriseEnterprise, //按企业排名
    singleExamineNode: state => state.singleExamineNode,  //按流通节点类型排名
    singleExamineIndex: state => state.singleExamineIndex,  //按考核指标排名
    singleExamineEnterpriseEtDate: state => state.singleExamineEnterpriseEtDate  //时间参数
  },
  actions: {
    getSingleEnterpriseEnterprise({commit}, params) { //按企业排名
      Api.SingleExamine.getSingleEnterpriseEnterprise(params).then((singleEnterpriseEnterprise) => {
        commit(types.SINGLE_EXAMINE, {singleEnterpriseEnterprise})
      })
    },
    getSingleExamineNode({commit}, params) { //按流通节点类型排名
      Api.SingleExamine.getSingleExamineNode(params).then((singleExamineNode) => {
        commit(types.GET_SINGLE_EXAMINE_NODE_TABLE_DATA, {singleExamineNode})
      })
    },
    getSingleExamineIndex({commit}, params) { //按考核指标排名
      Api.SingleExamine.getSingleExamineIndex(params).then((singleExamineIndex) => {
        commit(types.GET_SINGLE_EXAMINE_INDEX, {singleExamineIndex})
      })
    },
    setSingleExamineEnterpriseEtDate({commit}, singleExamineEnterpriseEtDate) { //时间参数
      commit(types.SET_SINGLE_EXAMINE_ENTERPRISE_ET_DATE, {singleExamineEnterpriseEtDate})
    }
  },
  mutations: {
    [types.SINGLE_EXAMINE](state, {singleEnterpriseEnterprise}) { //按企业排名
      state.singleEnterpriseEnterprise = singleEnterpriseEnterprise
    },
    [types.GET_SINGLE_EXAMINE_NODE_TABLE_DATA](state, {singleExamineNode}) { //按流通节点类型排名
      state.singleExamineNode = singleExamineNode
    },
    [types.GET_SINGLE_EXAMINE_INDEX](state, {singleExamineIndex}) { //按考核指标排名
      state.singleExamineIndex = singleExamineIndex
    },
    [types.SET_SINGLE_EXAMINE_ENTERPRISE_ET_DATE](state, {singleExamineEnterpriseEtDate}) { //时间参数
      state.singleExamineEnterpriseEtDate = singleExamineEnterpriseEtDate
    }
  }
}
export default {
  modules: {
    moduleSingleExamines
  }
}
