import RetrospectManages from "@/ipt-trace-back/pages/retrospectManages"
import FileStatistics from "@/ipt-trace-back/pages/subject-manage/fileStatistics"
import ChainSynthesis from "@/ipt-trace-back/pages/trace-info/chainSynthesis"
import ChainSynthesisTree from "@/ipt-trace-back/pages/trace-info/chainSynthesisTree"
import DeleteRecover from '@/ipt-trace-back/pages/trace-info/deleteRecover'
import DeleteStatistics from '@/ipt-trace-back/pages/trace-info/deleteStatistics'
import Circulation from './circulation'
import Filling from "./filling"
import FillingAudit from "./fillingAudit"
import RunningReport from "./runningReport"

const routes = [
  {
    path: '/traceBack/',
    redirect: '/traceBack/retrospectManages'
  },
  {
    path: '/traceBack/retrospectManages',
    component: RetrospectManages
  },
  {
    path: '/traceBack/fileStatistics',
    component: FileStatistics
  },
  Filling,
  FillingAudit,
  RunningReport,
  {
    path: '/traceBack/chainSynthesis',
    component: ChainSynthesis
  },
  {
    path: '/traceBack/chainSynthesis/chainSynthesisTree',
    component: ChainSynthesisTree
  },
  Circulation,
  {
    path: '/traceBack/deleteRecover',
    component: DeleteRecover
  },
  {
    path: '/traceBack/deleteStatistics',
    component: DeleteStatistics
  }
]

export default routes
