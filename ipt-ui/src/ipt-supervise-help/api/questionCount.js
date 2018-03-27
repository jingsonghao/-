import fetch from '@/utils/fetch'

export default {
  getQuestionCountTableData(params) {
    return fetch({
      url: '/api/questionCountTableData',
      method: 'get',
      params: params
    })
  }
}
