import Api from '@/api'
import * as types from '../mutation-types'

// initial state
const moduleEnumType = {
  state: {
    businessTypes: [],
    enterpriseTypes: [],
    isConfirms: [],
    isDeletes: [],
    legalTypes: [],
    nodeTypes: [],
    properties: [],
    regionParentList: [],
    channelContentTypeEnums: [],
    channelStateEnums: [],
    channelTypeEnums: [],
    isMenuEnums: [],
    templateTypeEnums: []
  },

// getters
  getters: {
    businessTypes: state => state.businessTypes,
    enterpriseTypes: state => state.enterpriseTypes,
    isConfirms: state => state.isConfirms,
    isDeletes: state => state.isDeletes,
    legalTypes: state => state.legalTypes,
    nodeTypes: state => state.nodeTypes,
    properties: state => state.properties,
    regionParentList: state => state.regionParentList,
    channelContentTypeEnums:  state => state.channelContentTypeEnums,
    channelStateEnums:  state => state.channelStateEnums,
    channelTypeEnums:  state => state.channelTypeEnums,
    isMenuEnums:  state => state.isMenuEnums,
    templateTypeEnums:  state => state.templateTypeEnums
  },

// actions
  actions: {
    getBusinessTypes ({dispatch, commit}, params) {
      if (this.getters.businessTypes.length !== 0) {
        return
      }
      Api.EnumType.getBusinessTypes(params).then(businessTypes => {
        if (businessTypes.data) {
          commit(types.GET_BUSINESS_TYPES, {businessTypes: businessTypes.data})
          /** yanggang 2018/2/1 获取产品类别时，将节点类型也取出来 */
          dispatch('getNodeTypes', {businessTypes: businessTypes.data.map(item => item.value).join()})
        }
      })
    },
    getEnterpriseTypes ({commit}, params) {
      if (this.getters.enterpriseTypes.length !== 0) {
        return
      }
      Api.EnumType.getEnterpriseTypes(params).then(enterpriseTypes => {
        if (enterpriseTypes.data) {
          commit(types.GET_ENTERPRISE_TYPES, {enterpriseTypes: enterpriseTypes.data})
        }
      })
    },
    getIsConfirms ({commit}, params) {
      if (this.getters.isConfirms.length !== 0) {
        return
      }
      Api.EnumType.getIsConfirms(params).then(isConfirms => {
        if (isConfirms.data) {
          commit(types.GET_IS_CONFIRMS, {isConfirms: isConfirms.data})
        }
      })
    },
    getIsDeletes ({commit}, params) {
      if (this.getters.isDeletes.length !== 0) {
        return
      }
      Api.EnumType.getIsDeletes(params).then(isDeletes => {
        if (isDeletes.data) {
          commit(types.GET_IS_DELETES, {isDeletes: isDeletes.data})
        }
      })
    },
    getLegalTypes ({commit}, params) {
      if (this.getters.legalTypes.length !== 0) {
        return
      }
      Api.EnumType.getLegalTypes(params).then(legalTypes => {
        if (legalTypes.data) {
          commit(types.GET_LEGAL_TYPES, {legalTypes: legalTypes.data})
        }
      })
    },
    getNodeTypes ({commit}, params) {
      Api.EnumType.getNodeTypes(params).then(nodeTypes => {
        if (nodeTypes.data) {
          commit(types.GET_NODE_TYPES, {nodeTypes: nodeTypes.data})
        }
      })
    },
    getProperties ({commit}, params) {
      if (this.getters.properties.length !== 0) {
        return
      }
      Api.EnumType.getProperties(params).then(properties => {
        if (properties.data) {
          commit(types.GET_PROPERTIES, {properties: properties.data})
        }
      })
    },
    findRegionParentList ({commit}, params) {
      if (this.getters.regionParentList.length !== 0) {
        return
      }
      Api.EnumType.findRegionParentList(params).then(regionParentList => {
        if (regionParentList.data) {
          commit(types.FIND_REGION_PARENT_LIST, {regionParentList: regionParentList.data})
        }
      })
    },
    findChannelContentTypeEnums ({commit}, params) {
      if (this.getters.channelContentTypeEnums.length !== 0) {
        return
      }
      Api.EnumType.getChannelContentTypeEnums(params).then(channelContentTypeEnums => {
        if (channelContentTypeEnums.data) {
          commit(types.FIND_CHANNEL_CONTENT_TYPE_ENUMS, {channelContentTypeEnums: channelContentTypeEnums.data})
        }
      })
    },
    findChannelStateEnums ({commit}, params) {
      if (this.getters.channelStateEnums.length !== 0) {
        return
      }
      Api.EnumType.getChannelStateEnums(params).then(channelStateEnums => {
        if (channelStateEnums.data) {
          commit(types.FIND_CHANNEL_STATE_ENUMS, {channelStateEnums: channelStateEnums.data})
        }
      })
    },
    findChannelTypeEnums ({commit}, params) {
      if (this.getters.channelTypeEnums.length !== 0) {
        return
      }
      Api.EnumType.getChannelTypeEnums(params).then(channelTypeEnums => {
        if (channelTypeEnums.data) {
          commit(types.FIND_CHANNEL_TYPE_ENUMS, {channelTypeEnums: channelTypeEnums.data})
        }
      })
    },
    findIsMenuEnums ({commit}, params) {
      if (this.getters.isMenuEnums.length !== 0) {
        return
      }
      Api.EnumType.getIsMenuEnums(params).then(isMenuEnums => {
        if (isMenuEnums.data) {
          commit(types.FIND_IS_MENU_ENUMS, {isMenuEnums: isMenuEnums.data})
        }
      })
    },
    findTemplateTypeEnums ({commit}, params) {
      if (this.getters.templateTypeEnums.length !== 0) {
        return
      }
      Api.EnumType.getTemplateTypeEnums(params).then(templateTypeEnums => {
        if (templateTypeEnums.data) {
          commit(types.FIND_TEMPLATE_TYPE_ENUMS, {templateTypeEnums: templateTypeEnums.data})
        }
      })
    }
  },

// mutations
  mutations: {
    [types.GET_BUSINESS_TYPES] (state, {businessTypes}) {
      state.businessTypes = businessTypes
    },
    [types.GET_ENTERPRISE_TYPES] (state, {enterpriseTypes}) {
      state.enterpriseTypes = enterpriseTypes
    },
    [types.GET_IS_CONFIRMS] (state, {isConfirms}) {
      state.isConfirms = isConfirms
    },
    [types.GET_IS_DELETES] (state, {isDeletes}) {
      state.isDeletes = isDeletes
    },
    [types.GET_LEGAL_TYPES] (state, {legalTypes}) {
      state.legalTypes = legalTypes
    },
    [types.GET_NODE_TYPES] (state, {nodeTypes}) {
      state.nodeTypes = nodeTypes
    },
    [types.GET_PROPERTIES] (state, {properties}) {
      state.properties = properties
    },
    [types.FIND_REGION_PARENT_LIST] (state, {regionParentList}) {
      state.regionParentList = regionParentList
    },
    [types.FIND_CHANNEL_CONTENT_TYPE_ENUMS] (state, {channelContentTypeEnums}) {
      state.channelContentTypeEnums = channelContentTypeEnums
    },
    [types.FIND_CHANNEL_STATE_ENUMS] (state, {channelStateEnums}) {
      state.channelStateEnums = channelStateEnums
    },
    [types.FIND_CHANNEL_TYPE_ENUMS] (state, {channelTypeEnums}) {
      state.channelTypeEnums = channelTypeEnums
    },
    [types.FIND_IS_MENU_ENUMS] (state, {isMenuEnums}) {
      state.isMenuEnums = isMenuEnums
    },
    [types.FIND_TEMPLATE_TYPE_ENUMS] (state, {templateTypeEnums}) {
      state.templateTypeEnums = templateTypeEnums
    }
  }
}

export default {
  modules: {
    moduleEnumType
  }
}
