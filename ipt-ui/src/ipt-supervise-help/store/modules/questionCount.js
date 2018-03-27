/**
 * Created by sqc on 2017/11/16.
 */
import Api from '@/ipt-supervise-help/api'
import * as types from './../mutation-types'

const moduleQuestionCountTableData = {
  state: {
    questionCountTableData: {}
  },
  getters: {
    questionCountTableData: state => state.questionCountTableData
  },
  actions: {
    getQuestionCountTableData({commit}, params) {
      Api.QuestionCount.getQuestionCountTableData(params, questionCountTableData => {
        commit(types.GET_QUESTION_COUNT_TABLE_DATA, {questionCountTableData})
      })
    }
  },
  mutations: {
    [types.GET_QUESTION_COUNT_TABLE_DATA](state, {questionCountTableData}) {
      state.questionCountTableData = questionCountTableData
    }
  }
}
export default {
  modules: {
    moduleQuestionCountTableData
  }
}
