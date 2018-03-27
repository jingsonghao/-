/**
 * @描述 :  监管辅助系统 > 应急事件管理
 * @作者 :  Zhao Yun
 * @日期 :  2017/12/19
 * @时间 :  16:22
 */
import EmergencyHandle from "@/ipt-supervise-help/pages/emergency-events/emergencyHandle"
import EmergencyRecord from "@/ipt-supervise-help/pages/emergency-events/emergencyRecord"
import EmergencyPlan from "@/ipt-supervise-help/pages/emergency-events/emergencyPlan"
import GenerateReport from "@/ipt-supervise-help/components/emergency-events/emergencyHandleReportGenerate"
import EditReport from "@/ipt-supervise-help/components/emergency-events/emergencyHandleReportEdit"
import ApprovalReport from "@/ipt-supervise-help/components/emergency-events/emergencyHandleReportApproval"
import EmergencyRecordView from "@/ipt-supervise-help/components/emergency-events/emergencyRecordView"

export default [
  {
    path: '/superviseHelp/emergencyHandle',
    component: EmergencyHandle
  },
  {
    path: "/superviseHelp/emergencyHandle/generateReport",
    component: GenerateReport
  },
  {
    path: "/superviseHelp/emergencyHandle/editReport",
    component: EditReport
  },
  {
    path: "/superviseHelp/emergencyHandle/approvalReport",
    component: ApprovalReport
  },
  {
    path: '/superviseHelp/emergencyRecord',
    component: EmergencyRecord
  },
  {
    path: '/superviseHelp/emergencyRecord/emergencyRecordView',
    component: EmergencyRecordView
  },
  {
    path: '/superviseHelp/emergencyPlan',
    component: EmergencyPlan
  }
]
