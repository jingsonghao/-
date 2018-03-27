import SuperviseSystem from '@/ipt-supervise-help/api/supervise'
import EarlyWaring1 from '@/ipt-supervise-help/api/earlyWarning'
import QuestionReport from '@/ipt-supervise-help/api/questionReport'
import QuestionItems from '@/ipt-supervise-help/api/questionItems'
import CreditArchives from '@/ipt-supervise-help/api/creditArchives'
import VideoManage from '@/ipt-supervise-help/api/videoManage'
import QuestionCount from '@/ipt-supervise-help/api/questionCount'
import EmergencyPlan from '@/ipt-supervise-help/api/emergency-events/emergencyPlan'
import EmergencyRecord from '@/ipt-supervise-help/api/emergency-events/emergencyRecord'
import EmergencyHandle from '@/ipt-supervise-help/api/emergency-events/emergencyHandle'
// 设备管理 设备管理
import EquipmentManage from '@/ipt-supervise-help/api/equipment-manage/equipmentManage'
// 设备管理 设备调整管理
import EquipmentAdjust from '@/ipt-supervise-help/api/equipment-manage/equipmentAdjust'
// 设备管理 设备监控管理
import EquipmentMonitor from '@/ipt-supervise-help/api/equipment-manage/equipmentMonitor'
// 设备管理 设备维护管理
import EquipmentRepair from '@/ipt-supervise-help/api/equipment-manage/equipmentRepair'
// 设备管理 设备库存管理
import EquipmentStorage from '@/ipt-supervise-help/api/equipment-manage/equipmentStorage'
// 综合性工作考核
import TotalExamine from '@/ipt-supervise-help/api/examine/totalExamine'
// 工作考核按企业、流通节点类型、指标排名
import SingleExamine from '@/ipt-supervise-help/api/examine/singleExamine'
//考核指标管理
import ExamineManage from '@/ipt-supervise-help/api/examine/examineManage'
//考核指标管理
import ExamineType from '@/ipt-supervise-help/api/examine/examineType'
//跨城市应急事件
import EmergencyCityRecord from '@/ipt-supervise-help/api/emergency-events-city/emergencyRecord'
import EmergencyCityHandle from '@/ipt-supervise-help/api/emergency-events-city/emergencyHandle'

export default {
  SuperviseSystem,
  EarlyWaring1,
  QuestionReport,
  QuestionItems,
  CreditArchives,
  VideoManage,
  QuestionCount,
  EmergencyPlan,
  EmergencyRecord,
  EmergencyHandle,
  EquipmentManage,
  ExamineType,
  EquipmentAdjust,
  EquipmentMonitor,
  EquipmentRepair,
  EquipmentStorage,
  TotalExamine,
  SingleExamine,
  EmergencyCityRecord,
  EmergencyCityHandle,
  ExamineManage
}
