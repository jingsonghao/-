import fetch from '@/utils/fetch'

export default {
  /** yanggang 2017/12/5 经营类型 */
  getBusinessTypes(params) {
    return fetch({
      url: '/common-api/common/findBusinessTypeJson',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 法人责任主体类型 */
  getEnterpriseTypes(params) {
    return fetch({
      url: '/common-api/common/findEnterpriseTypeJson',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 审核状态 */
  getIsConfirms(params) {
    return fetch({
      url: '/common-api/common/findReviewStatusJson',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 是否删除 */
  getIsDeletes(params) {
    return fetch({
      url: '/common-api/common/findIsDeleteJson',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 法人责任主体类型 */
  getLegalTypes(params) {
    return fetch({
      url: '/common-api/common/findLegalTypeJson',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 获取节点类型 */
  getNodeTypes(params) {
    return fetch({
      url: '/trace-base/types/nodeTypes',
      method: 'get',
      params: params
    })
  },
  /** yanggang 2017/12/5 经营者性质 */
  getProperties(params) {
    return fetch({
      url: '/common-api/common/findPropertyJson',
      method: 'get',
      params: params
    })
  },
  /** Guo Ze Qiang 2017-12-15 企业类型(0种植(养殖)企业,1超市单位,2团消单位,3特色企业) */
  getEnterpriseType() {
    return fetch({
      url: '/common-api/common/findEnterpriseTypeJson',
      method: 'get'
    })
  },
  /** Zhao Yun 2017/12/19  */
  getEventStates() {
    return fetch({
      url: '/common-api/common/findEventStateJson',
      method: 'get'
    })
  },
  /** yanggang 2017/12/21  城市编码 （ 获取全部的市级(区县的父级)）*/
  findRegionParentList() {
    return fetch({
      url: '/common-api/region/findRegionParentList',
      method: 'get'
    })
  },
  /** yanggang 2017/12/21  获取市级(区县的父级)下的区县集合 371700*/
  findByParentIdList(params) {
    return fetch({
      url: '/common-api/region/findByParentIdList',
      method: 'get',
      params: params
    })
  },
  /** Guo Ze Qiang 2017-12-15 考核指标状态 禁用/启用  （1：启用；0：禁用） */
  getExamineIndexState() {
    return fetch({
      url: '/common-api/common/findIndexStateEnumJson',
      method: 'get'
    })
  },
  getChannelContentTypeEnums() {
    return fetch({
      url: '/common-api/common/findChannelContentTypeEnumJson',
      method: 'get'
    })
  },
  getChannelStateEnums() {
    return fetch({
      url: '/common-api/common/findChannelStateEnumJson',
      method: 'get'
    })
  },
  getChannelTypeEnums() {
    return fetch({
      url: '/common-api/common/findChannelTypeEnumJson',
      method: 'get'
    })
  },
  getIsMenuEnums() {
    return fetch({
      url: '/common-api/common/findIsMenuEnumJson',
      method: 'get'
    })
  },
  getTemplateTypeEnums() {
    return fetch({
      url: '/common-api/common/findTemplateTypeEnumJson',
      method: 'get'
    })
  }

}
