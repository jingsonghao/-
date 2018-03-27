export default {
  getReportAnalysisTableData(params, cb) {
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 60,
        "currentPage": 7,
        "totalPages": 12,
        "data": [
          {
            "number": 1,
            "name": "万兴生姜",
            "type": "生姜",
            "consumption": 1859,
            "proportion": "15%"
          },
          {
            "number": 2,
            "name": "玉林鸭子",
            "type": "鸭子",
            "consumption": 464,
            "proportion": "15% "
          },
          {
            "number": 3,
            "name": "五福茶叶",
            "type": "茶叶",
            "consumption": 120,
            "proportion": "15% "
          },
          {
            "number": 4,
            "name": "松鹤黑猪",
            "type": "黑猪",
            "consumption": 124,
            "proportion": "15% "
          },
          {
            "number": 5,
            "name": "宁夏香肠",
            "type": "香肠",
            "consumption": 872,
            "proportion": "15% "
          },
          {
            "number": 6,
            "name": "郎野蜂蜜",
            "type": "蜂蜜",
            "consumption": 453,
            "proportion": "15% "
          },
          {
            "number": 7,
            "name": "大峰蛋糕",
            "type": "奶油蛋糕",
            "consumption": 1508,
            "proportion": "15% "
          },
          {
            "number": 8,
            "name": "万邦山楂",
            "type": "山楂",
            "consumption": 457,
            "proportion": "15% "
          },
          {
            "number": 9,
            "name": "营昊超市",
            "type": "樱桃",
            "consumption": 1587,
            "proportion": "15% "
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  },
  getTraceabilityTableData(params, cb) {
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 60,
        "currentPage": 7,
        "totalPages": 12,
        "data": [
          {
            "number": 1,
            "name": "万兴生姜",
            "type": "生姜",
            "consumption": 1859,
            "proportion": "15%"
          },
          {
            "number": 2,
            "name": "玉林鸭子",
            "type": "鸭子",
            "consumption": 464,
            "proportion": "15% "
          },
          {
            "number": 3,
            "name": "五福茶叶",
            "type": "茶叶",
            "consumption": 120,
            "proportion": "15% "
          },
          {
            "number": 4,
            "name": "松鹤黑猪",
            "type": "黑猪",
            "consumption": 124,
            "proportion": "15% "
          },
          {
            "number": 5,
            "name": "宁夏香肠",
            "type": "香肠",
            "consumption": 872,
            "proportion": "15% "
          },
          {
            "number": 6,
            "name": "郎野蜂蜜",
            "type": "蜂蜜",
            "consumption": 453,
            "proportion": "15% "
          },
          {
            "number": 7,
            "name": "大峰蛋糕",
            "type": "奶油蛋糕",
            "consumption": 1508,
            "proportion": "15% "
          },
          {
            "number": 8,
            "name": "万邦山楂",
            "type": "山楂",
            "consumption": 457,
            "proportion": "15% "
          },
          {
            "number": 9,
            "name": "营昊超市",
            "type": "樱桃",
            "consumption": 1587,
            "proportion": "15% "
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  }
}
