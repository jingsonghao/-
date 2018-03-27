import MonitorVideo from "@/ipt-supervise-help/pages/video-manage/monitorVideo"
import VideoRecord from "@/ipt-supervise-help/pages/video-manage/videoRecord"
import SuperviseSystem from "@/ipt-supervise-help/pages/superviseSystem"
import TotalExamine from "@/ipt-supervise-help/pages/check/totalExamine"
import QuestionItems from "./questionItems"
import QuestionCount from "@/ipt-supervise-help/pages/question-find-manage/questionCount"
import ExamineTypeManage from "@/ipt-supervise-help/pages/check/examineTypeManage"
import IntegrityRecord from "@/ipt-supervise-help/pages/creditArchives/integrityRecord"
import CreditArchives from "@/ipt-supervise-help/pages/creditArchives/creditArchives"
// 设备管理 设备管理
import EquipmentManage from "@/ipt-supervise-help/pages/equipment-manage/equipmentManage"
// 设备管理 设备调整管理
import EquipmentAdjust from "@/ipt-supervise-help/pages/equipment-manage/equipmentAdjust"
// 设备管理 设备监控管理
import EquipmentMonitor from "@/ipt-supervise-help/pages/equipment-manage/equipmentMonitor"
// 设备管理 设备维护管理
import EquipmentRepair from "@/ipt-supervise-help/pages/equipment-manage/equipmentRepair"
// 工作流通节点单期考核的数据分析
import SingleExamineNode from "@/ipt-supervise-help/pages/check/singleExamineNode"
// 企业工作考核详情
import EnterpriseCheckNormManage from "@/ipt-supervise-help/pages/check/enterpriseCheckNormManage"
// 工作指标排名
import SingleExamineIndex from "@/ipt-supervise-help/pages/check/singleExamineIndex"
// 企业名称排名
import SingleExamineEnterprise from "@/ipt-supervise-help/pages/check/singleExamineEnterprise"
// 企业诚信详情查看
import ShowCred from "@/ipt-supervise-help/pages/creditArchives/showCred"
// 设备管理 设备库存管理
import EquipmentStorage from "./equipmentStorage"
import CheckManage from "./checkManage"
import BlackList from "./blacklistManage"
import QuestionReport from "./questionReport"
import Emergency from "./emergency"
import EmergencyCity from "./emergencyCity"

const routes = [
  {
    path: '/superviseHelp/',
    redirect: '/superviseHelp/superviseSystem'
  },
  {
    path: '/superviseHelp/monitorVideo',
    component: MonitorVideo
  },
  {
    path: '/superviseHelp/videoRecord',
    component: VideoRecord
  },
  {
    path: '/superviseHelp/superviseSystem',
    component: SuperviseSystem
  },
  {
    path: '/superviseHelp/check/totalExamine',
    component: TotalExamine
  },
  CheckManage,
  QuestionItems,
  QuestionReport,
  {
    path: '/superviseHelp/questionCount',
    component: QuestionCount
  },
  {
    path: '/superviseHelp/check/examineTypeManage',
    component: ExamineTypeManage
  },
  {
    path:'/superviseHelp/creditArchives/creditArchives',
    component: CreditArchives
  },
  {
    path:'/superviseHelp/creditArchives/integrityRecord',
    component: IntegrityRecord
  },
  BlackList,
  // 设备管理 设备管理
  {
    path:'/superviseHelp/equipmentManage/equipmentManage',
    component: EquipmentManage
  },
  // 设备管理 设备调整管理
  {
    path:'/superviseHelp/equipmentManage/equipmentAdjust',
    component: EquipmentAdjust
  },
  // 设备管理 设备监控管理
  {
    path:'/superviseHelp/equipmentManage/equipmentMonitor',
    component: EquipmentMonitor
  },
  // 设备管理 设备维护管理
  {
    path:'/superviseHelp/equipmentManage/equipmentRepair',
    component: EquipmentRepair
  },
  //工作流通节点单期考核的数据分析
  {
    path: '/superviseHelp/check/singleExamineNode',
    component: SingleExamineNode
  },
  //企业工作考核指标
  {
    path: '/superviseHelp/check/enterpriseCheckNormManage',
    component: EnterpriseCheckNormManage
  },
  // 工作指标排名
  {
    path: '/superviseHelp/check/singleExamineIndex',
    component: SingleExamineIndex
  },
  // 企业名称排名
  {
    path: '/superviseHelp/check/singleExamineEnterprise',
    component: SingleExamineEnterprise
  },
  //企业诚信详情查看
  {
    path: '/superviseHelp/creditArchives/showCred',
    component: ShowCred
  },
  // 设备管理 设备库存管理
  EquipmentStorage,
  ...Emergency,
  ...EmergencyCity
]

export default routes
