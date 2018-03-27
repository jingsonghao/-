/**
 * @描述: 工作考核管理  -->综合性考核 -->单期考核详情 -->按企业排名+按流通节点类型排名+按考核指标排名
 * @作者: Guo Ze Qiang
 * @日期: 2017/12/14
 * @时间: 13:12
 */
import fetch from "@/utils/fetch"

export default {
  getSingleEnterpriseEnterprise(params) {  // 按企业排名 --> 获取符合条件的列表数据
    return fetch({
      url: '/trace-supervise/exBase/findEbPage',
      method: 'get',
      params: params
    })
  },
  getSingleExamineNode(params) {  // 按流通节点类型排名 --> 获取符合条件的列表数据
    return fetch({
      url: '/trace-supervise/exBase/findEbPage',
      method: 'get',
      params: params
    })
  },
  getSingleExamineIndex(params) {  // 按考核指标排名 --> 获取符合条件的列表数据
    return fetch({
      url: '/trace-supervise/exBase/findEbPage',
      method: 'get',
      params: params
    })
  },
  getTypeRankEChartsData(params) {  //  ECharts数据
    return fetch({
      url: '/trace-supervise/exBase/getTypeRankEChartsData',
      method: 'get',
      params: params
    })
  }
}
