export default {
  getCategoryInfoTableData(params, cb) {
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 1,
        "currentPage": 1,
        "totalPages": 1,
        data: [
          {
            "catLevel":"一级",
            "catName":"食用农产品",
            "catType":"01"
          },
          {
            "catLevel":"一级",
            "catName":"食品",
            "catType":"02"
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  }
}
