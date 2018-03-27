
export default {
  getPriceTrendTableData(params, cb) {
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 60,
        "currentPage": 1,
        "totalPages": 12,
        "data": [
          {
            "enterpriseId": 40,
            "enterpriseNo": "大千农牧",
            "nodeBaseInfoId": 1510,
            "enterpriseName": "1230",
            "float": "↑",
            "orgNumber": "100%",
            "postalcode": "postalcode40"
          },
          {
            "enterpriseId": 42,
            "enterpriseNo": "大峰食品",
            "nodeBaseInfoId": 860,
            "enterpriseName": "859",
            "float": "↑",
            "orgNumber": "95%",
            "postalcode": "postalcode42"
          },
          {
            "enterpriseId": 41,
            "enterpriseNo": "万兴食品",
            "nodeBaseInfoId": 1120,
            "enterpriseName": "1111",
            "float": "↑",
            "orgNumber": "85%",
            "postalcode": "postalcode41"
          },
          {
            "enterpriseId": 43,
            "enterpriseNo": "名利蔬菜",
            "nodeBaseInfoId": 21554,
            "enterpriseName": "2009",
            "float": "↓",
            "orgNumber": "98%",
            "postalcode": "postalcode43"
          },
          {
            "enterpriseId": 44,
            "enterpriseNo": "黄金蓝",
            "nodeBaseInfoId": 6582,
            "enterpriseName": "6580",
            "float": "-",
            "orgNumber": "99%",
            "postalcode": "postalcode44"
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  },
  getPriceForecastTableData(params, cb) {
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 60,
        "currentPage": 1,
        "totalPages": 12,
        "data": [
          {
            "enterpriseId": 40,
            "enterpriseNo": "万兴食品",
            "nodeBaseInfoId": 1400,
            "enterpriseName": "1400",
            "float": "-",
            "orgNumber": "100%",
            "postalcode": "postalcode40"
          },
          {
            "enterpriseId": 41,
            "enterpriseNo": "大峰食品",
            "nodeBaseInfoId": 1230,
            "enterpriseName": "1090",
            "float": "↓",
            "orgNumber": "85%",
            "postalcode": "postalcode41"
          },
          {
            "enterpriseId": 42,
            "enterpriseNo": "大千农牧",
            "nodeBaseInfoId": 860,
            "enterpriseName": "850",
            "float": "↓",
            "orgNumber": "95%",
            "postalcode": "postalcode42"
          },
          {
            "enterpriseId": 43,
            "enterpriseNo": "黄金蓝",
            "nodeBaseInfoId": 2154,
            "enterpriseName": "1009",
            "float": "↓",
            "orgNumber": "98%",
            "postalcode": "postalcode43"
          },
          {
            "enterpriseId": 44,
            "enterpriseNo": "名利蔬菜",
            "nodeBaseInfoId": 6582,
            "enterpriseName": "6580",
            "float": "↑",
            "orgNumber": "99%",
            "postalcode": "postalcode44"
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  },
  getPriceComparisonTableData(params, cb) {
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 60,
        "currentPage": 1,
        "totalPages": 12,
        "data": [
          {
            "enterpriseId": 40,
            "enterpriseNo": "大千农牧",
            "nodeBaseInfoId": 1560,
            "enterpriseName": "2503",
            "float": "↑",
            "orgNumber": "100%",
            "postalcode": "postalcode40"
          },
          {
            "enterpriseId": 41,
            "enterpriseNo": "万兴食品",
            "nodeBaseInfoId": 1250,
            "enterpriseName": "1060",
            "float": "↑",
            "orgNumber": "85%",
            "postalcode": "postalcode41"
          },
          {
            "enterpriseId": 42,
            "enterpriseNo": "黄金蓝",
            "nodeBaseInfoId": 861,
            "enterpriseName": "856",
            "float": "-",
            "orgNumber": "95%",
            "postalcode": "postalcode42"
          },
          {
            "enterpriseId": 43,
            "enterpriseNo": "名利蔬菜",
            "nodeBaseInfoId": 2154,
            "enterpriseName": "2009",
            "float": "↑",
            "orgNumber": "98%",
            "postalcode": "postalcode43"
          },
          {
            "enterpriseId": 44,
            "enterpriseNo": "大峰食品",
            "nodeBaseInfoId": 6582,
            "enterpriseName": "650",
            "float": "↑",
            "orgNumber": "99%",
            "postalcode": "postalcode44"
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  }
}
