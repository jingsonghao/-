import CirNoDateInfo from './modules/trace-info/cirNoDateInfo'
// 门户管理 信息发布管理
import InfoPublish from './modules/home-manage/infoPublish'
// 门户管理 追溯企业
import BackEnterprise from './modules/home-manage/backEnterprise'
// 门户管理 追溯企业
import EcommerceLinks from './modules/home-manage/ecommerceLinks'
import ProTypeInfo from './modules/trace-info/proTypeInfo'
import CategoryInfo from './modules/trace-info/categoryInfo'
import SonProInfo from './modules/trace-info/sonProInfo'
import SonCatInfo from './modules/trace-info/sonCatInfo'
// 门户管理 公众留言反馈
import ChannelManage from './modules/home-manage/channelManage'
// 门户管理 公众留言反馈
import TemplateManage from './modules/home-manage/templateManage'
// 门户管理 公众留言反馈
import LeaveMessage from './modules/home-manage/leaveMessage'
// 系统设置 设备类别管理
import EquipmentType from './modules/system-set/equipmentType'
// 设备管理 设备型号管理
import EquipmentModel from './modules/system-set/equipmentModel'
// 设备管理 设备监控项管理
import EquipmentMonitorOption from './modules/system-set/equipmentMonitorOption'
// 组织权限管理 用户管理
import UserManage from './modules/org-manage/userManage'
// 组织权限管理 用户管理 部门管理
import DepartmentManage from './modules/org-manage/departmentManage'
// 组织权限管理 角色管理
import RoleManage from './modules/org-manage/roleManage'
// 组织权限管理 权限管理
import PermissionManage from './modules/org-manage/permissionManage'
// 日志管理 用户操作日志 系统运行日志
import LogManage from './modules/log-manage/logManage'
// 系统内部权限
import SystemInnerPermission from './modules/systemInnerPermission'
// 菜单管理
import MenuManage from './modules/menuManage'

export default {
  modules: {
    RoleManage,
    InfoPublish,
    BackEnterprise,
    EcommerceLinks,
    CirNoDateInfo,
    ProTypeInfo,
    CategoryInfo,
    SonProInfo,
    SonCatInfo,
    LeaveMessage,
    ChannelManage,
    TemplateManage,
    LogManage,
    EquipmentType,
    EquipmentModel,
    EquipmentMonitorOption,
    UserManage,
    DepartmentManage,
    PermissionManage,
    SystemInnerPermission,
    MenuManage
  }
}
