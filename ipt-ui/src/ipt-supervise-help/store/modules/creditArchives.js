/**
 * Created by sqc on 2017/11/17.
 */
import Api from '@/ipt-supervise-help/api'
import * as types from './../mutation-types'

const moduleCreditArchivesTableData = {
  state: {
    creditArchivesTableData: {},
    corporateBlacklistTableData:{},
    personalBlacklistTableData:{},
    integrityRecordTableData:{},
    honestyTypeEnumDate:{},
    enterpriseInfoEnumDate:{}
  },
  getters: {
      creditArchivesTableData: state => state.creditArchivesTableData,
      corporateBlacklistTableData: state => state.corporateBlacklistTableData,
      personalBlacklistTableData: state => state.personalBlacklistTableData,
      integrityRecordTableData: state => state.integrityRecordTableData,
      honestyTypeEnumDate:state => state.honestyTypeEnumDate,
      enterpriseInfoEnumDate:state => state.enterpriseInfoEnumDate
  },
  actions: {
    getCreditArchivesTableData({commit}, params) {
      Api.CreditArchives.getCreditArchivesTableData(params).then(creditArchivesTableData => {
        commit(types.GET_CREDIT_ARCHIVES_TABLE_DATA, {creditArchivesTableData})
      })
    },
    getCorporateBlacklistTableData({commit}, params) {
      Api.CreditArchives.getCorporateBlacklistTableData(params).then(corporateBlacklistTableData => {
        commit(types.GET_CORPORATE_BLACKLIST_TABLE_DATA, {corporateBlacklistTableData})
      })
    },
    getPersonalBlacklistTableData({commit}, params) {
      Api.CreditArchives.getPersonalBlacklistTableData(params).then(personalBlacklistTableData => {
        commit(types.GET_PERSONAL_BLACKLIST_TABLE_DATA, {personalBlacklistTableData})
      })
    },
    //诚信行为记录分页
    getIntegrityRecordTableData({commit}, params) {
      Api.CreditArchives.getIntegrityRecordTableData(params).then(integrityRecordTableData => {
        commit(types.GET_INTEGRITY_RECORD_TABLE_DATA, {integrityRecordTableData})
      })
    },
    //诚信行为类型
    getHonestyTypeEnumDate({commit}) {
      Api.CreditArchives.getHonestyTypeEnumDate().then((honestyTypeEnumDate) => {
        commit(types.GET_HONESTY_TYPE_ENUM_DATE, {honestyTypeEnumDate})
      })
    },
    //企业信息枚举
    getEnterpriseInfoEnumDate({commit}) {
      Api.CreditArchives.getEnterpriseInfoEnumDate().then((enterpriseInfoEnumDate) => {
        commit(types.GET_ENTERPRISE_INFO_ENUM_DATE, {enterpriseInfoEnumDate})
      })
    }
  },
  mutations: {
    [types.GET_CREDIT_ARCHIVES_TABLE_DATA](state, {creditArchivesTableData}) {
      state.creditArchivesTableData = creditArchivesTableData
    },
    [types.GET_CORPORATE_BLACKLIST_TABLE_DATA](state, {corporateBlacklistTableData}) {
      state.corporateBlacklistTableData = corporateBlacklistTableData
    },
    [types.GET_PERSONAL_BLACKLIST_TABLE_DATA](state, {personalBlacklistTableData}) {
      state.personalBlacklistTableData = personalBlacklistTableData
    },
    [types.GET_INTEGRITY_RECORD_TABLE_DATA](state, {integrityRecordTableData}) {
      state.integrityRecordTableData = integrityRecordTableData
    },
    [types.GET_HONESTY_TYPE_ENUM_DATE](state, {honestyTypeEnumDate}) {
      state.honestyTypeEnumDate = honestyTypeEnumDate
    },
    [types.GET_ENTERPRISE_INFO_ENUM_DATE](state, {enterpriseInfoEnumDate}) {
      state.enterpriseInfoEnumDate = enterpriseInfoEnumDate
    }
  }
}
export default {
  modules: {
    moduleCreditArchivesTableData
  }
}
