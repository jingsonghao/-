import SuperviseSystem from './modules/superviseSystem'
import EaarlyWaring2 from './modules/earlyWarning'
import Question2 from './modules/questionRepory'
import QuestionItems from './modules/questionItems'
import CreditArchives from './modules/creditArchives'
import VideoManage from './modules/videoManage'
import QuestionCount from './modules/questionCount'
import EmergencyPlan from './modules/emergency-events/emergencyPlan'
import EmergencyRecord from './modules/emergency-events/emergencyRecord'
import EmergencyHandle from './modules/emergency-events/emergencyHandle'
// 设备管理 设备管理
import EquipmentManage from './modules/equipment-manage/equipmentManage'
// 设备管理 设备调整管理
import EquipmentAdjust from './modules/equipment-manage/equipmentAdjust'
// 设备管理 设备监控管理
import EquipmentMonitor from './modules/equipment-manage/equipmentMonitor'
// 设备管理 设备维护管理
import EquipmentRepair from './modules/equipment-manage/equipmentRepair'
// 设备管理 设备库存管理
import EquipmentStorage from './modules/equipment-manage/equipmentStorage'
// 综合性工作考核
import TotalExamine from './modules/examine/totalExamine'
// 工作考核按企业、流通节点类型、指标排名
import SingleExamine from './modules/examine/singleExamine'
// 工作考核管理  -->综合性考核 -->单期考核详情 -->查看
import ExamineManage from './modules/examine/examineManage'
import EmergencyCityRecord from './modules/emergency-events-city/emergencyRecord'
import EmergencyCityHandle from './modules/emergency-events-city/emergencyHandle'

export default {
  modules: {
    SuperviseSystem,
    EaarlyWaring2,
    Question2,
    QuestionItems,
    CreditArchives,
    VideoManage,
    QuestionCount,
    EmergencyPlan,
    EmergencyRecord,
    EmergencyHandle,
    EquipmentManage,
    EquipmentAdjust,
    EquipmentMonitor,
    EquipmentRepair,
    EquipmentStorage,
    TotalExamine,
    SingleExamine,
    ExamineManage,
    EmergencyCityRecord,
    EmergencyCityHandle
  }
}
