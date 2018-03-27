import reportAnalysis from "@/ipt-data-statistics/pages/rop-analy/reportAnalysis"
import conStructure from "@/ipt-data-statistics/components/rop-analy/conStructure"
import marketRun from "@/ipt-data-statistics/components/rop-analy/marketRun"

export default {
  path: '/dataStatistics/ropAnaly/reportAnalysis',
  component: reportAnalysis,
  redirect: "/dataStatistics/ropAnaly/reportAnalysis/conStructure",
  children: [
    {
      path: "conStructure",
      component: conStructure
    },
    {
      path: "marketRun",
      component: marketRun
    }
  ]
}
