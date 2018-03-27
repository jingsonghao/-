// 菜单管理
import MenuManage from '@/ipt-manage-system/pages/menuManage'
// 接口管理
import InterfaceManage from '@/ipt-manage-system/pages/interfaceManage'
//组织权限管理 用户管理
import UserManage from '@/ipt-manage-system/pages/org-manage/userManage'
//组织权限管理 用户管理 部门管理
import DepartmentManage from '@/ipt-manage-system/pages/org-manage/departmentManage'
//组织权限管理 角色管理
import RoleManage from '@/ipt-manage-system/pages/org-manage/roleManage'
//组织权限管理 权限管理
import PermissionManage from '@/ipt-manage-system/pages/org-manage/permissionManage'
//流通节点数据管理
import circulationNodeData from '@/ipt-manage-system/pages/trace-info/circulationNodeData'
//重要产品类型
import productType from '@/ipt-manage-system/pages/trace-info/productType'
//流通节点类型管理
import circulationNode from '@/ipt-manage-system/pages/trace-info/circulationNode'
// 日志管理 用户操作日志
import UserOptLog from '@/ipt-manage-system/pages/log-manage/userOptLog'
// 日志管理 系统运行日志
import SystemRunLog from '@/ipt-manage-system/pages/log-manage/systemRunLog'
// 门户管理 信息发布管理
import InfoPublish from '@/ipt-manage-system/pages/home-manage/infoPublish'
// 门户管理 信息发布管理 - 添加
import InfoPublishAdd from "@/ipt-manage-system/components/home-manage/infoPublish/infoPublishAdd.vue"
// 门户管理 追溯企业
import BackEnterprise from '@/ipt-manage-system/pages/home-manage/backEnterprise'
// 门户管理 电商链接
import EcommerceLinks from '@/ipt-manage-system/pages/home-manage/ecommerceLinks'
// 门户管理 栏目管理
import ChannelManage from '@/ipt-manage-system/pages/home-manage/channelManage'
// 门户管理 模板管理
import TemplateManage from '@/ipt-manage-system/pages/home-manage/templateManage'
// 系统设置 设备类别管理
import EquipmentType from '@/ipt-manage-system/pages/system-set/equipmentType'
// 系统设置 设备类别管理
import EquipmentModel from '@/ipt-manage-system/pages/system-set/equipmentModel'
// 系统设置 设备类别管理
import EquipmentMonitorOption from '@/ipt-manage-system/pages/system-set/equipmentMonitorOption'
// 系统设置 诚信评级管理
import IntegrityRate from '@/ipt-manage-system/pages/system-set/integrityRate'
// 门户管理 公众留言管理
import LeaveMessage from './leaveMessage'
// 系统内部权限
import SystemInnerPermission from '@/ipt-manage-system/pages/systemInnerPermission'

const routes = [
  {
    path: '/manageSystem/',
    redirect: '/manageSystem/orgManage/userManage'
  },
  // 菜单管理
  {
    path: '/manageSystem/menuManage',
    component: MenuManage
  },
  // 接口管理
  {
    path: '/manageSystem/InterfaceManage',
    component: InterfaceManage
  },
  //组织权限管理 用户管理
  {
    path: '/manageSystem/orgManage/userManage',
    component: UserManage
  },
  {
    //组织权限管理 用户管理 部门管理
    path: '/manageSystem/orgManage/departmentManage',
    component: DepartmentManage
  },
  //组织权限管理 角色管理
  {
    path: '/manageSystem/orgManage/roleManage',
    component: RoleManage
  },
  //组织权限管理 权限管理
  {
    path: '/manageSystem/orgManage/permissionManage',
    component: PermissionManage
  },
  //流通节点数据管理
  {
    path: '/manageSystem/circulationNodeData',
    component: circulationNodeData
  },
  //重要产品类型管理
  {
    path: '/manageSystem/productType',
    component: productType
  },
  //流通节点类型管理
  {
    path: '/manageSystem/circulationNode',
    component: circulationNode
  },
  // 日志管理 用户操作日志
  {
    path: '/manageSystem/logManage/userOptLog',
    component: UserOptLog
  },
  // 日志管理 系统运行日志
  {
    path: '/manageSystem/logManage/systemRunLog',
    component: SystemRunLog
  },
  // 门户管理 信息发布管理
  {
    path: '/manageSystem/homeManage/infoPublish',
    component: InfoPublish
  },
  {
    path: '/manageSystem/homeManage/infoPublishAdd',
    component: InfoPublishAdd
  },
  // 门户管理 追溯企业
  {
    path: '/manageSystem/homeManage/backEnterprise',
    component: BackEnterprise
  },
  // 门户管理 电商链接
  {
    path: '/manageSystem/homeManage/ecommerceLinks',
    component: EcommerceLinks
  },
  // 门户管理 模板管理
  {
    path: '/manageSystem/homeManage/templateManage',
    component: TemplateManage
  },
  // 门户管理 栏目故那里
  {
    path: '/manageSystem/homeManage/channelManage',
    component: ChannelManage
  },
  // 门户管理 公众留言管理
  LeaveMessage,
  // 系统设置 设备类别管理
  {
    path: '/manageSystem/systemSet/equipmentType',
    component: EquipmentType
  },
  // 系统设置 设备型号管理
  {
    path: '/manageSystem/systemSet/equipmentModel',
    component: EquipmentModel
  },
  // 系统设置 设备监控项管理
  {
    path: '/manageSystem/systemSet/equipmentMonitorOption',
    component: EquipmentMonitorOption
  },
  // 系统设置 诚信评级管理
  {
    path: '/manageSystem/systemSet/credibilityGradeManage',
    component: IntegrityRate
  },
  // 系统内部权限
  {
    path: '/manageSystem/systemInnerPermission',
    component: SystemInnerPermission
  }
]
export default routes
