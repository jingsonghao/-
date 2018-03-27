/**
 * Created by sqc on 2017/11/16.
 */
import Api from '@/ipt-supervise-help/api'
import * as types from './../mutation-types'

const moduleQuestionReportTableData = {
  state: {
    questionReportTableData: {},
    userTableData: {},
    problemReportTypes: {},
    findUser: {}
  },
  getters: {
    questionReportTableData: state => state.questionReportTableData,
    userTableData: state => state.userTableData,
    problemReportTypes: state => state.problemReportTypes,
    findUser: state => state.findUser
  },
  actions: {
    getQuestionReportTableData({commit}, params) {
      Api.QuestionReport.getQuestionReportTableData(params).then((questionReportTableData) => {
        commit(types.GET_QUESTION_REPORT_TABLE_DATA, {questionReportTableData})
      })
    },
    getUserTableData({commit}, params) {
      Api.QuestionReport.getUserTableData(params).then((userTableData) => {
        commit(types.GET_USER_TABLE_DATA, {userTableData})
      })
    },
    getProblemReportTypes({commit}, params) {
      Api.QuestionReport.getProblemReportTypes(params).then(problemReportTypes => {
        problemReportTypes = problemReportTypes.data
        commit(types.GET_PROBLEMREPORT_TYPES, {problemReportTypes})
      })
    },
    getFindUser({commit}, findUser) {
        commit(types.GET_SENDUSERLIST, {findUser})
      //console.log(userVO)
    }
  },
  mutations: {
    [types.GET_QUESTION_REPORT_TABLE_DATA](state, {questionReportTableData}) {
      state.questionReportTableData = questionReportTableData
    },
    [types.GET_USER_TABLE_DATA](state, {userTableData}) {
      state.userTableData = userTableData
    },
    [types.GET_PROBLEMREPORT_TYPES](state, {problemReportTypes}) {
      state.problemReportTypes = problemReportTypes
    },
    [types.GET_SENDUSERLIST](state, {findUser}) {
      state.findUser = findUser
    }
  }
}
export default {
  modules: {
    moduleQuestionReportTableData
  }
}
