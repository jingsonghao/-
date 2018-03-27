import ReportAnalysis from '@/ipt-data-statistics/api/rop-analy/reportAnalysis'
import ReviewMonitor from '@/ipt-data-statistics/api/review_monitor/reviewMonitor' //大数据审核监测 --> 节点数据审核 + 采集客户端数据监测
import ProductPlace from '@/ipt-data-statistics/api/review_monitor/node_monitor/productPlace' //大数据审核监测 --> 节点数据监测 --> 产地
import Abattoir from '@/ipt-data-statistics/api/review_monitor/node_monitor/abattoir' //大数据审核监测 --> 节点数据监测 --> 屠宰场
import Process from '@/ipt-data-statistics/api/review_monitor/node_monitor/process' //大数据审核监测 --> 节点数据监测 --> 加工
import WholesaleMarket from '@/ipt-data-statistics/api/review_monitor/node_monitor/wholesaleMarket' //大数据审核监测 --> 节点数据监测 --> 批发市场
import RetailMarket from '@/ipt-data-statistics/api/review_monitor/node_monitor/retailMarket' //大数据审核监测 --> 节点数据监测 --> 零售市场
import Supermarket from '@/ipt-data-statistics/api/review_monitor/node_monitor/supermarket' //大数据审核监测 --> 节点数据监测 --> 超市
import GroupPurchasingUnit from '@/ipt-data-statistics/api/review_monitor/node_monitor/groupPurchasingUnit' //大数据审核监测 --> 节点数据监测 --> 团体采购单位
import ExcavateShow from '@/ipt-data-statistics/api/excavateShow' //大数据挖掘展示

export default {
  ExcavateShow,    //大数据挖掘展示
  ReportAnalysis,
  ReviewMonitor,          //节点数据审核 + 采集客户端数据监测
  ProductPlace,           //产地
  Abattoir,               //屠宰场
  Process,                //加工
  WholesaleMarket,        //批发市场
  RetailMarket,           //零售市场
  Supermarket,            //超市
  GroupPurchasingUnit     //团体采购单位
}
