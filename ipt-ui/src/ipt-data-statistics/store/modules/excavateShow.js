import Api from '@/ipt-data-statistics/api'
import * as types from '../mutation-types'
/**
 * @描述: 大数据挖掘展示
 * @作者: Guo Ze Qiang
 * @日期: 2017/11/23
 * @时间: 13:12
 */
const moduleBigDataExcavateShow = {
  state: {
    priceTrendTableData: {}, //大数据挖掘展示  --> 价格走势
    priceForecastTableData: {}, //大数据挖掘展示  --> 价格预测
    priceComparisonTableData: {} //大数据挖掘展示  --> 宁夏追溯产品价格比对
  },
  getters: {
    priceTrendTableData: state => state.priceTrendTableData, //大数据挖掘展示  --> 价格走势
    priceForecastTableData: state => state.priceForecastTableData, //大数据挖掘展示  --> 价格预测
    priceComparisonTableData: state => state.priceComparisonTableData //大数据挖掘展示  --> 宁夏追溯产品价格比对
  },
  actions: {
    getPriceTrendTableData({commit}, params) { //大数据挖掘展示  --> 价格走势
      Api.ExcavateShow.getPriceTrendTableData({params: params}).then(priceTrendTableData => {
        commit(types.GET_PRICE_TREND_TABLE_DATA, {priceTrendTableData})
      })
    },
    getPriceForecastTableData({commit}, params) { //大数据挖掘展示  --> 价格预测
      Api.ExcavateShow.getPriceForecastTableData({params: params}).then(priceForecastTableData => {
        commit(types.GET_PRICE_FORECAST_TABLE_DATA, {priceForecastTableData})
      })
    },
    getPriceComparisonTableData({commit}, params) { //大数据挖掘展示  --> 宁夏追溯产品价格比对
      Api.ExcavateShow.getPriceComparisonTableData({params: params}).then(priceComparisonTableData => {
        commit(types.GET_PRICE_COMPARISON_TABLE_DATA, {priceComparisonTableData})
      })
    }
  },
  mutations: {
    [types.GET_PRICE_TREND_TABLE_DATA](state, {priceTrendTableData}) { //大数据挖掘展示  --> 价格走势
      state.priceTrendTableData = priceTrendTableData
    },
    [types.GET_PRICE_FORECAST_TABLE_DATA](state, {priceForecastTableData}) { //大数据挖掘展示  --> 价格预测
      state.priceForecastTableData = priceForecastTableData
    },
    [types.GET_PRICE_COMPARISON_TABLE_DATA](state, {priceComparisonTableData}) { //大数据挖掘展示  --> 宁夏追溯产品价格比对
      state.priceComparisonTableData = priceComparisonTableData
    }
  }
}
export default {
  modules: {
    moduleBigDataExcavateShow
  }
}
