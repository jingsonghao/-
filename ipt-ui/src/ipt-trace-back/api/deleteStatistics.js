import fetch from '@/utils/fetch'

export default {
  getDeleteStatisticsTableData(year) {
    return fetch({
      url: '/trace-base/rejectInfoStat/' + year,
      method: 'get'
    })
  }
}
