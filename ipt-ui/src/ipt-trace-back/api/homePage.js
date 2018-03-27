import fetch from '@/utils/fetch'

export default {
  getEnterpriseRecordsStat() {
    return fetch({
      url: '/trace-base/traceHomePage/enterpriseRecordsStat',
      method: 'get'
    })
  },
  traceDataAnalysisData() {
    return fetch({
      url: '/trace-base/traceHomePage/traceDataAnalysis',
      method: 'get'
    })
  },
  traceDataCountAnalysisData() {
    return fetch({
      url: '/trace-base/traceHomePage/traceDataNumCountAnalysis',
      method: 'get'
    })
  }
}
