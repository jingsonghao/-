/**
 * Created by sqc on 2017/11/16.
 */
import Api from '@/ipt-supervise-help/api'
import * as types from './../mutation-types'

const moduleQuestionItemsTableData = {
  state: {
    questionItemsTableData: {}
  },
  getters: {
    questionItemsTableData: state => state.questionItemsTableData
  },
  actions: {
    getQuestionItemsTableData({commit}, params) {
      Api.QuestionItems.getQuestionItemsTableData(params).then((questionItemsTableData) => {
        commit(types.GET_QUESTION_REPORT_TABLE_DATA, {questionItemsTableData})
      })
    }
  },
  mutations: {
    [types.GET_QUESTION_REPORT_TABLE_DATA](state, {questionItemsTableData}) {
      state.questionItemsTableData = questionItemsTableData
    }
  }
}
export default {
  modules: {
    moduleQuestionItemsTableData
  }
}
