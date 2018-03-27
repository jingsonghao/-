import fetch from '@/utils/fetch'

export default {
  getDataTypes() {
    return fetch({
      url:  '/trace-base/traceInformation/dataTypes',
      method: 'get'
    })
  }
  , getPageData(id, params) {
    return fetch({
      url:  '/trace-base/traceInformation/dataTypes/' + id,
      method: 'get',
      params: params
    })
  }
}
