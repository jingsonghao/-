/**
 * @描述: 考核指标管理
 * @作者: Guo Ze Qiang
 * @日期: 2017/12/14
 * @时间: 13:12
 */
import fetch from '@/utils/fetch'

export default {
  getIndexBaseTableData(params) { //考核指标管理页面列表数据
    return fetch({
      url: '/trace-supervise/exIndex/findExIndexPage',
      method: 'get',
      params: params
    })
  },
  getShowIndex(params) { //工作考核管理  -->综合性考核 -->单期考核详情 --> 按企业排名 -->查看
    return fetch({
      url: '/trace-supervise/exBase/findByEnterpriseShowPage',
      method: 'get',
      params: params
    })
  },
  getNodeTypeShowIndex(params) { //工作考核管理  -->综合性考核 -->单期考核详情 --> 按流通节点类型排名 -->查看
    return fetch({
      url: '/trace-supervise/exBase/findByNodeTypeShowPage',
      method: 'get',
      params: params
    })
  },
  //删除考核指标管理
  deleteIndexBase(id) {
    return fetch({
      url: '/trace-supervise/exIndex/deleteExType/' + id,
      method: 'delete'
    })
  },
  //查询详情
  findIndexBase(id) {
    return fetch({
      url: '/trace-supervise/exIndex/findOne/' + id,
      method: 'get'
    })
  },
  //考核指标类别枚举
  getExamineTypeEnum(params) {
    return fetch({
      url: '/trace-supervise/exType/findExTypeList',
      method: 'get',
      params: params
    })
  },
  getExamineLevelAll() { // 单期考核详情中考核等级下拉列表数据
    return fetch({
      url: '/trace-supervise/examineLevel/getExamineLevelAll',
      method: 'get'
    })
  },
  getExamineIndexAll() { // 单期考核详情中考核指标名称下拉列表数据
    return fetch({
      url: '/trace-supervise/exIndex/findExIndexList',
      method: 'get'
    })
  },
  getIndexNumberCount() { // 启用指标数、禁用指标数
    return fetch({
      url: '/trace-supervise/exIndex/getIndexNumberCount',
      method: 'get'
    })
  },
  getOneLevelCateList() { // 全部重要产品类别(一级产品类别)
    return fetch({
      url: '/admin/cate/getOneLevelCateList',
      method: 'get'
    })
  },
  saveExamineIndex(data) { // 保存
    return fetch({
      url: '/trace-supervise/exIndex/saveExamineIndex',
      method: 'post',
      data: data
    })
  },
  saveExamineLevel(data) { // 保存考核等级分数划分
    return fetch({
      url: '/trace-supervise/examineLevel/saveExamineLevel',
      method: 'post',
      data: data
    })
  }
}
