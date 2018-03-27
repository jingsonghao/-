import fetch from '@/utils/fetch'

//应急事件报告
export default {
  apiUrl: '/trace-supervise/crossCityEmergency/crossCityEmergencyList',
  findPage(params) {
    return fetch({
      url: this.apiUrl,
      method: 'get',
      params: params
    }).then(data => {
      if (data.code !== 200) {
        return Promise.reject(new Error(data.msg))
      }
      return Promise.resolve(data)
    }).then(() => {
    }, () => {
      return Promise.resolve({
        "totalRecords": 60,
        "currentPage": 1,
        "totalPages": 6,
        "data": [
          {
            "createDate": "2017-05-07-15:30：00",
            "name": "张三",
            "sourceCity": "济南",
            "parentCateName": "食用农产品",
            "cateName": "西红柿",
            "circulateCode": "产地",
            "biz_Name": "xxx超市",
            "eventState": "待处理"
          },
          {
            "createDate": "2017-05-07-15:30：00",
            "name": "张三",
            "sourceCity": "济南",
            "parentCateName": "食用农产品",
            "cateName": "西红柿",
            "circulateCode": "产地",
            "biz_Name": "xxx超市",
            "eventState": "待处理"
          },
          {
            "createDate": "2017-05-07-15:30：00",
            "name": "张三",
            "sourceCity": "济南",
            "parentCateName": "食用农产品",
            "cateName": "西红柿",
            "circulateCode": "产地",
            "biz_Name": "xxx超市",
            "eventState": "待处理"
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  },
  create(params) {
    return fetch({
      url: this.apiUrl,
      method: 'post',
      data: params
    })
  },
  getOne(id) {
    return fetch({
      url: this.apiUrl + '/' + id,
      method: 'get'
    })
  },
  deleteOne(id) {
    return fetch({
      url: this.apiUrl + '/' + id,
      method: 'delete'
    })
  },
  update(id, params) {
    return fetch({
      url: this.apiUrl + '/' + id,
      method: 'patch',
      data: params
    })
  },
  approval(id) {
    return fetch({
      url: this.apiUrl + '/' + id + '/approval',
      method: 'patch'
    })
  }
}
