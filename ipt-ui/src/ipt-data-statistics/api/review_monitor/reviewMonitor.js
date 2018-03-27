/**
 * @描述: 大数据审核监测  --> 节点数据审核 + 采集客户端数据监测
 * @作者: Guo Ze Qiang
 * @日期: 2017/11/23
 * @时间: 13:12
 */

export default {
  getNodeAuditTableData(params, cb) { //节点数据审核
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 60,
        "currentPage": 1,
        "totalPages": 12,
        "status": 200,
        "msg": "获取列表成功",
        "data": [
          {
            "id": 1,
            "month": "1",
            "repetitionNumber": 35,
            "errorNumber": "53"
          },
          {
            "id": 2,
            "month": "2",
            "repetitionNumber": 52,
            "errorNumber": "63"
          }
        ]
      })
    })
  },
  getCollectClientMonitorTableData(params, cb) { //采集客户端数据监测
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 60,
        "currentPage": 1,
        "totalPages": 12,
        "status": 200,
        "msg": "获取列表成功",
        "data": [
          {
            "enterpriseId": 1,
            "enterpriseCode": "A10010",
            "enterpriseName": "银座超市",
            "enterpriseType": 1,
            "enterpriseTypeStr": "超市",
            "currentNodeType": 1,
            "currentNodeTypeStr": "种植节点",
            "interfaceName": "种植交易接口",
            "interfaceType": 1,
            "interfaceTypeStr": "Restful",
            "uploadNumber": 100
          },
          {
            "enterpriseId": 2,
            "enterpriseCode": "A10011",
            "enterpriseName": "宁夏大千农牧有限公司",
            "enterpriseType": 1,
            "enterpriseTypeStr": "屠宰",
            "currentNodeType": 1,
            "currentNodeTypeStr": "屠宰节点",
            "interfaceName": "屠宰进场接口",
            "interfaceType": 1,
            "interfaceTypeStr": "Restful",
            "uploadNumber": 100
          }
        ]
      })
    })
  }
}
