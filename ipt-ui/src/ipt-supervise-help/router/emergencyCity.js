/**
 * @描述 :  监管辅助系统 > 应急事件管理
 * @作者 :  Zhao Yun
 * @日期 :  2017/12/19
 * @时间 :  16:22
 */
import EmergencyHandle from "@/ipt-supervise-help/pages/emergency-events-city/emergencyHandle"
import EmergencyRecord from "@/ipt-supervise-help/pages/emergency-events-city/emergencyRecord"
import GenerateReport from "@/ipt-supervise-help/components/emergency-events-city/emergencyHandleReportGenerate"
import EditReport from "@/ipt-supervise-help/components/emergency-events-city/emergencyHandleReportEdit"
import ApprovalReport from "@/ipt-supervise-help/components/emergency-events-city/emergencyHandleReportApproval"
import EmergencyRecordView from "@/ipt-supervise-help/components/emergency-events-city/emergencyRecordView"

export default [
  {
    path: '/superviseHelp/emergencyPlanCross',
    component: EmergencyHandle
  },
  {
    path: "/superviseHelp/emergencyPlanCross/generateReport",
    component: GenerateReport
  },
  {
    path: "/superviseHelp/emergencyPlanCross/editReport",
    component: EditReport
  },
  {
    path: "/superviseHelp/emergencyPlanCross/approvalReport",
    component: ApprovalReport
  },
  {
    path: '/superviseHelp/emergencyPlanReport',
    component: EmergencyRecord
  },
  {
    path: '/superviseHelp/emergencyPlanReport/emergencyRecordView',
    component: EmergencyRecordView
  }
]
