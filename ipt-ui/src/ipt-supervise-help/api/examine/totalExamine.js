/**
 * @描述: 工作考核管理  --> 综合性考核
 * @作者: Guo Ze Qiang
 * @日期: 2017/12/14
 * @时间: 13:12
 */
import fetch from "@/utils/fetch"

export default {
  getTotalExamine(params) { //获取符合条件的列表数据
    return fetch({
      url: '/trace-supervise/exTotal/findEtPage',
      method: 'get',
      params: params
    })
  },

  getExamineEchart() {  //Echart图数据
    return fetch({
      url: '/trace-supervise/exTotal/findExamineEchart',
      method: 'get'
    })
  }

}
