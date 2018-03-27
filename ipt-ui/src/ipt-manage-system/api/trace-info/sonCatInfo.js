
export default {
  getSonCatInfoTableDate(params, cb) {
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 1,
        "currentPage": 1,
        "totalPages": 1,
        data: [
          {
            "catLevel":"二级",
            "catName":"团体消费单位",
            "catType":"7"
          },
          {
            "catLevel":"二级",
            "catName":"种植",
            "catType":"1"
          },
          {
            "catLevel":"二级",
            "catName":"养殖",
            "catType":"2"
          },
          {
            "catLevel":"二级",
            "catName":"屠宰节点",
            "catType":"3"
          },
          {
            "catLevel":"二级",
            "catName":"加工节点",
            "catType":"4"
          },
          {
            "catLevel":"二级",
            "catName":"仓储配送",
            "catType":"5"
          },
          {
            "catLevel":"二级",
            "catName":"超市",
            "catType":"6"
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  }
}
