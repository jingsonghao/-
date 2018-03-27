import Api from '@/ipt-supervise-help/api'
import * as types from '../mutation-types'

/**
 * @描述  监管辅助系统 --> 视频集中管理
 * @作者 Guo Ze Qiang
 * @日期 2017-12-7
 * @时间 14:01:41
 */
const moduleVideoManageData = {
  state: {
    videoListData: {},  //  监控视频 --> 监控视频画面
    monitorVideoTableData: {},  //  监控视频 --> 监控视频信息列表
    videoRecordTableData: {}  // 监控记录
  },
  getters: {
    videoListData: state => state.videoListData, //  监控视频 --> 监控视频画面
    monitorVideoTableData: state => state.monitorVideoTableData,  //  监控视频 --> 监控视频信息列表
    videoRecordTableData: state => state.videoRecordTableData  // 监控记录
  },
  actions: {
    getVideoListData({commit}, params) { //  监控视频 --> 监控视频画面
      Api.VideoManage.getVideoListData(params).then(videoListData => {
        commit(types.GET_VIDEO_LIST_DATA, {videoListData})  // 监控记录
      })
    },
    getMonitorVideoTableData({commit}, params) {  //  监控视频 --> 监控视频信息列表
      Api.VideoManage.getMonitorVideoTableData(params).then(monitorVideoTableData => {
        commit(types.GET_MONITOR_VIDEO_TABLE_DATA, {monitorVideoTableData})
      })
    },
    getVideoRecordTableData({commit}, params) {  // 监控记录
      Api.VideoManage.getVideoRecordTableData(params).then(videoRecordTableData => {
        commit(types.GET_VIDEO_RECORD_TABLE_DATA, {videoRecordTableData})
      })
    }
  },
  mutations: {
    [types.GET_VIDEO_LIST_DATA](state, {videoListData}) { //  监控视频 --> 监控视频画面
      state.videoListData = videoListData
    },
    [types.GET_MONITOR_VIDEO_TABLE_DATA](state, {monitorVideoTableData}) {  //  监控视频 --> 监控视频信息列表
      state.monitorVideoTableData = monitorVideoTableData
    },
    [types.GET_VIDEO_RECORD_TABLE_DATA](state, {videoRecordTableData}) {  // 监控记录
      state.videoRecordTableData = videoRecordTableData
    }
  }
}
export default {
  modules: {
    moduleVideoManageData
  }
}
