import ExcavateShow from "@/ipt-data-statistics/pages/excavateShow"
import PriceTrend from "@/ipt-data-statistics/components/excavate_show/priceTrend"
import PriceForecast from "@/ipt-data-statistics/components/excavate_show/priceForecast"
import PriceComparison from "@/ipt-data-statistics/components/excavate_show/priceComparison"
/**
 * @描述: 大数据分析系统 --> 大数据挖掘展示 菜单配置子路由
 * @作者: Guo Ze Qiang
 * @日期: 2017/12/4
 * @时间: 16:10
 */
export default {
  path: '/dataStatistics/excavateShow',
  component: ExcavateShow,
  redirect: "/dataStatistics/excavateShow/priceTrend",
  children: [
    {
      path: "priceTrend",   //价格走势
      component: PriceTrend
    },
    {
      path: "priceForecast",  //价格预测
      component: PriceForecast
    },
    {
      path: "priceComparison",  //宁夏追溯产品价格比对
      component: PriceComparison
    }
  ]
}
