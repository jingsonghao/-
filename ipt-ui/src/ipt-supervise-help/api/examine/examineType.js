/**
 * @描述: 考核指标类别管理
 * @作者: Guo Ze Qiang
 * @日期: 2017/12/14
 * @时间: 13:12
 */
import fetch from "@/utils/fetch"

export default {
  getExamineTypeAll() { // 考核指标类别
    return fetch({
      url: '/trace-supervise/exType/findExTypeList',
      method: 'get'
    })
  },
  saveExamineType(params) { // 考核指标类别
    return fetch({
      url: '/trace-supervise/exType/saveExamineType',
      method: 'post',
      data: params
    })
  },
  saveExamineTypeWeighing(params) { // 考核指标类别权重保存
    return fetch({
      url: '/trace-supervise/exType/saveExamineTypeWeighing',
      method: 'post',
      data: params
    })
  }
}
