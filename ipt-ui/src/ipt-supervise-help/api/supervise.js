import fetch from '@/utils/fetch'

export default {
  getSuperviseSystemTableData(params) {
    return fetch({
      url: '/trace-supervise/exTotal/findEtPage',
      method: 'get',
      params: params
    })
  },
  getSuperviseTopTableData(params, cb) {
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 60,
        "currentPage": 1,
        "totalPages": 1,
        "data": [
          {
            "ranking": "1",
            "enterpriseName": "黄金篮",
            "score": 99
          },
          {
            "ranking": "2",
            "enterpriseName": "名利蔬菜",
            "score": 98
          },
          {
            "ranking": "3",
            "enterpriseName": "康源蔬菜",
            "score": 96
          },
          {
            "ranking": "4",
            "enterpriseName": "润百合",
            "score": 95
          },
          {
            "ranking": "5",
            "enterpriseName": "赢泰田园",
            "score": 94
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  },
  //考核指标类型管理
  getShowAssessTypeList(params, cb) {
    return fetch({
      url: '/trace-supervise/exType/findExTypeList',
      method: 'get',
      params: params
    })
  }
}
