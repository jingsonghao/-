/**
 * @描述  监管辅助系统 --> 视频集中管理
 * @作者 Guo Ze Qiang
 * @日期 2017-12-7
 * @时间 14:01:41
 */
export default {
  getVideoListData(params, cb) {   //  监控视频 --> 监控视频画面
    return new Promise(function(resolve) {
      resolve({
        "listSize": 9,
        "status": 200,
        "msg": "获取列表成功",
        "sources": [
          {
            "id": "1",
            "name": "家家悦超市-101",
            "src": "http://lwipt.qa.dppc.org/upload/video/supermarket.mp4",
            "type": "video/mp4"
          },
          {
            "id": "2",
            "name": "生产配送-601",
            "src": "http://lwipt.qa.dppc.org/upload/video/production_and_distribution.mp4",
            "type": "video/mp4"
          },
          {
            "id": "3",
            "name": "玉林鸭子-21",
            "src": "http://lwipt.qa.dppc.org/upload/video/duck.mp4",
            "type": "video/mp4"
          },
          {
            "id": "4",
            "name": "家家悦超市-119",
            "src": "http://lwipt.qa.dppc.org/upload/video/supermarket2.mp4",
            "type": "video/mp4"
          },
          {
            "id": "5",
            "name": "生产配送-632",
            "src": "http://lwipt.qa.dppc.org/upload/video/production_and_distribution2.mp4",
            "type": "video/mp4"
          },
          {
            "id": "6",
            "name": "玉林鸭子-28",
            "src": "http://lwipt.qa.dppc.org/upload/video/duck.mp4",
            "type": "video/mp4"
          },
          {
            "id": "7",
            "name": "家家悦超市-169",
            "src": "http://lwipt.qa.dppc.org/upload/video/supermarket.mp4",
            "type": "video/mp4"
          },
          {
            "id": "8",
            "name": "生产配送-627",
            "src": "http://lwipt.qa.dppc.org/upload/video/production_and_distribution.mp4",
            "type": "video/mp4"
          },
          {
            "id": "9",
            "name": "玉林鸭子-23",
            "src": "http://lwipt.qa.dppc.org/upload/video/duck.mp4",
            "type": "video/mp4"
          }
        ]
      })
    })
  },
  getMonitorVideoTableData(params, cb) {  //  监控视频 --> 监控视频信息列表
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 9,
        "currentPage": 1,
        "totalPages": 1,
        "status": 200,
        "msg": "获取列表成功",
        "data": [
          {
            "deviceName": "家家悦超市-101",
            "channelName": "通道001",
            "startTime": "2017-12-7 14:15:47",
            "endTime": "2017-12-7 14:15:47",
            "fileSize": "1024M"
          },
          {
            "deviceName": "生产配送-601",
            "channelName": "通道002",
            "startTime": "2017-12-7 14:20:11",
            "endTime": "2017-12-7 14:55:47",
            "fileSize": "1024M"
          },
          {
            "deviceName": "玉林鸭子-21",
            "channelName": "通道003",
            "startTime": "2017-12-7 15:10:17",
            "endTime": "2017-12-7 15:45:41",
            "fileSize": "1024M"
          },
          {
            "deviceName": "家家悦超市-119",
            "channelName": "通道004",
            "startTime": "2017-12-7 16:12:13",
            "endTime": "2017-12-7 16:52:40",
            "fileSize": "1024M"
          },
          {
            "deviceName": "生产配送-632",
            "channelName": "通道005",
            "startTime": "2017-12-7 17:02:07",
            "endTime": "2017-12-7 15:35:42",
            "fileSize": "1024M"
          },
          {
            "deviceName": "玉林鸭子-28",
            "channelName": "通道006",
            "startTime": "2017-12-7 18:21:18",
            "endTime": "2017-12-7 18:59:31",
            "fileSize": "1024M"
          },
          {
            "deviceName": "家家悦超市-169",
            "channelName": "通道007",
            "startTime": "2017-12-7 18:21:18",
            "endTime": "2017-12-7 18:59:31",
            "fileSize": "1024M"
          },
          {
            "deviceName": "生产配送-627",
            "channelName": "通道008",
            "startTime": "2017-12-7 18:21:18",
            "endTime": "2017-12-7 18:59:31",
            "fileSize": "1024M"
          },
          {
            "deviceName": "玉林鸭子-23",
            "channelName": "通道009",
            "startTime": "2017-12-7 18:21:18",
            "endTime": "2017-12-7 18:59:31",
            "fileSize": "1024M"
          }
        ]
      })
    })
  },
  findVideoById(id) {   //  监控视频 --> 播放
    return fetch({
      url: '/api/videoData' + id,
      method: 'get'
    })
  },
  getVideoRecordTableData(params, cb) {  // 监控记录
    return new Promise(function(resolve) {
      resolve({
        "totalRecords": 25,
        "currentPage": 1,
        "totalPages": 5,
        "data": [
          {
            "enterpriseId": "黄金蓝种植合作社",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          },
          {
            "enterpriseId": "名利特色蔬菜种植合作社",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          },
          {
            "enterpriseId": "家家悦超市门店021",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          },
          {
            "enterpriseId": "家家悦超市门店025",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          },
          {
            "enterpriseId": "家家悦超市门店023",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          },
          {
            "enterpriseId": "黄金蓝种植合作社",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          },
          {
            "enterpriseId": "黄金蓝种植合作社",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          },
          {
            "enterpriseId": "黄金蓝种植合作社",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          },
          {
            "enterpriseId": "黄金蓝种植合作社",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          },
          {
            "enterpriseId": "黄金蓝种植合作社",
            "enterpriseNo": "种植(养殖)企业",
            "nodeBaseInfoId": 852
          }
        ],
        "status": 200,
        "msg": "获取列表成功"
      })
    })
  }
}
