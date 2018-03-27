import fetch from '@/utils/fetch'

export default {
  /*显示page分页的数据*/
  getCreditArchivesTableData(params) {
    return fetch({
      url: '/trace-supervise/creditFile/findCreditFilePage',
      method: 'get',
      params: params
    })
  },
  getCorporateBlacklistTableData(params, cb) {
    return new Promise(function (resolve) {
      resolve({
        "totalRecords": 35,
        "currentPage": 1,
        "totalPages": 5,
        "data": [
          {
            "companyName": "宁夏赢泰有机农业科技发展有限公司",
            "companyType": "种植（养殖）企业",
            "legalPerson": "王伟宁",
            "contactDetails": "18600235156",
            "creditScoring": "92.25",
            "preRanking": "3↑"
          },
          {
            "companyName": "润百合现代农业有限公司",
            "companyType": "种植（养殖）企业",
            "legalPerson": "周琦",
            "contactDetails": "15025152561",
            "creditScoring": "91.46",
            "preRanking": "2-"
          },
          {
            "companyName": "家家悦超市",
            "companyType": "超市单位",
            "legalPerson": "刘伟",
            "contactDetails": "18825662356",
            "creditScoring": "92.25",
            "preRanking": "3↑"
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  },
  getPersonalBlacklistTableData(params, cb) {
    return new Promise(function (resolve) {
      resolve({
        "totalRecords": 35,
        "currentPage": 1,
        "totalPages": 5,
        "data": [
          {
            "companyName": "宁夏赢泰有机农业科技发展有限公司",
            "companyType": "种植（养殖）企业",
            "legalPerson": "王伟宁",
            "contactDetails": "18600235156",
            "creditScoring": "92.25",
            "preRanking": "3↑"
          },
          {
            "companyName": "润百合现代农业有限公司",
            "companyType": "种植（养殖）企业",
            "legalPerson": "周琦",
            "contactDetails": "15025152561",
            "creditScoring": "91.46",
            "preRanking": "2-"
          },
          {
            "companyName": "家家悦超市",
            "companyType": "超市单位",
            "legalPerson": "刘伟",
            "contactDetails": "18825662356",
            "creditScoring": "92.25",
            "preRanking": "3↑"
          },
          {
            "companyName": "宁夏赢泰有机农业科技发展有限公司",
            "companyType": "种植（养殖）企业",
            "legalPerson": "王伟宁",
            "contactDetails": "18600235156",
            "creditScoring": "92.25",
            "preRanking": "3↑"
          },
          {
            "companyName": "润百合现代农业有限公司",
            "companyType": "种植（养殖）企业",
            "legalPerson": "周琦",
            "contactDetails": "15025152561",
            "creditScoring": "91.46",
            "preRanking": "2-"
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  },
  //企业诚信管理->诚信行为记录
  getIntegrityRecordTableData(params) {
    return fetch({
      url: '/trace-supervise/hr/findHrPage',
      method: 'get',
      params: params
    })
  },
  //企业诚信管理->诚信行为记录->弹出新增页面的诚信评级类型枚举
  getHonestyTypeEnumDate(params) {
    return fetch({
      url: '/admin/honestyType/findHonestyTypeList',
      method: 'get',
      params: params
    })
  },
  //企业诚信管理->诚信行为记录->弹出新增页面,企业信息枚举
  getEnterpriseInfoEnumDate(params) {
    return fetch({
      url: '/trace-base/enterprises/findEnterprisesList',
      method: 'get',
      params: params
    })
  },
  //增加企业行为记录
  getAddCreditArchives(params) {
    return fetch({
      url: '/trace-supervise/hr/addHrType',
      method: 'post',
      data: params
    })
  },
  //查询详情
  findCreditArchives(id) {
    return fetch({
      url: '/trace-supervise/hr/findOne/' + id,
      method: 'get'
    })
  },
  //信用管理查看企业信用记录
  showCreditArchives(id) {
    return fetch('/trace-supervise/hr/findHrPage?enterpriseNo=' + id, {
      method: 'GET',
      headers: {}
    }).then().catch()
  }
}
