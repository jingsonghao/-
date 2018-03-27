import OdeCodeSystem from "@/ipt-coding-system/pages/odeCodeSystem"
import ApprovalManage from "@/ipt-coding-system/pages/approvalManage"
import InfoStatistics from "@/ipt-coding-system/pages/infoStatistics"

const routes = [
  {
    path: '/codingSystem/',
    redirect: '/codingSystem/odeCodeSystem'
  },
  // 接口管理
  {
    path: '/codingSystem/odeCodeSystem',
    component: OdeCodeSystem
  },
  {
    //赋码审批管理
    path: '/codingSystem/approvalManage',
    component: ApprovalManage
  },
  {
    //赋码信息统计
    path: '/codingSystem/infoStatistics',
    component: InfoStatistics
  }
]

export default routes
