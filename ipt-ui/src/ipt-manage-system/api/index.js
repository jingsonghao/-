import CategoryInfo from '@/ipt-manage-system/api/trace-info/categoryInfo'
// 门户管理 信息发布管理
import InfoPublish from '@/ipt-manage-system/api/home-manage/infoPublish'
// 门户管理 追溯企业
import BackEnterprise from '@/ipt-manage-system/api/home-manage/backEnterprise'
// 门户管理 电商链接
import EcommerceLinks from '@/ipt-manage-system/api/home-manage/ecommerceLinks'
import CirNoDateInfo from '@/ipt-manage-system/api/trace-info/cirNoDateInfo'
import ProTypeInfo from '@/ipt-manage-system/api/trace-info/proTypeInfo'
import SonProInfo from '@/ipt-manage-system/api/trace-info/sonProInfo'
import SonCatInfo from '@/ipt-manage-system/api/trace-info/sonCatInfo'
import NodeTypeRelation from '@/ipt-manage-system/api/trace-info/nodeTypeRelation'
// 门户管理 公众留言反馈
import LeaveMessage from '@/ipt-manage-system/api/home-manage/leaveMessage'
// 门户管理 模板管理
import TemplateManage from '@/ipt-manage-system/api/home-manage/templateManage'
// 门户管理 栏目管理
import ChannelManage from '@/ipt-manage-system/api/home-manage/channelManage'
// 系统设置 设备类别管理
import EquipmentType from '@/ipt-manage-system/api/system-set/equipmentType'
// 系统设置 设备型号管理
import EquipmentModel from '@/ipt-manage-system/api/system-set/equipmentModel'
// 系统设置 设备监控项管理
import EquipmentMonitorOption from '@/ipt-manage-system/api/system-set/equipmentMonitorOption'
// 组织权限管理 用户管理
import UserManage from '@/ipt-manage-system/api/org-manage/userManage'
// 组织权限管理 角色管理
import RoleManage from '@/ipt-manage-system/api/org-manage/roleManage'
// 组织权限管理 权限管理
import PermissionManage from '@/ipt-manage-system/api/org-manage/permissionManage'
// 组织权限管理 用户管理 部门管理
import DepartmentManage from '@/ipt-manage-system/api/org-manage/departmentManage'
// 日志管理 用户操作日志 系统运行日志
import LogManage from '@/ipt-manage-system/api/log-manage/logManage'
// 系统内部权限
import SystemInnerPermission from '@/ipt-manage-system/api/systemInnerPermission'
// 菜单管理
import MenuManage from '@/ipt-manage-system/api/menuManage'

export default {
  RoleManage,
  InfoPublish,
  BackEnterprise,
  EcommerceLinks,
  CirNoDateInfo,
  ProTypeInfo,
  CategoryInfo,
  SonProInfo,
  SonCatInfo,
  NodeTypeRelation,
  LeaveMessage,
  TemplateManage,
  ChannelManage,
  EquipmentType,
  EquipmentModel,
  EquipmentMonitorOption,
  LogManage,
  UserManage,
  DepartmentManage,
  PermissionManage,
  SystemInnerPermission,
  MenuManage
}
