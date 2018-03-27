import ReportAnalysis from './reportAnalysis'
import ReviewMonitor from './review_monitor/reviewMonitor'
import BigDataFirst from '@/ipt-data-statistics/pages/bigDataFirst'
import ExcavateShow from './excavateShow'

const routes = [
  {
    path: '/dataStatistics',
    redirect: '/dataStatistics/bigDataFirst'
  },
  {
    path: '/dataStatistics/bigDataFirst',
    component: BigDataFirst
  },
  ReportAnalysis,       //大数据报表分析
  ExcavateShow,         //大数据挖掘展示
  ReviewMonitor         //大数据审核监测
]

export default routes
