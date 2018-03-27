import NormalEquipmentStorage from "@/ipt-supervise-help/components/equipment-manage/normalEquipmentStorage"
import AbnormalEquipmentStorage from "@/ipt-supervise-help/components/equipment-manage/abnormalEquipmentStorage"
import EquipmentStorage from "@/ipt-supervise-help/pages/equipment-manage/equipmentStorage"

export default {
  path: '/superviseHelp/equipmentManage/equipmentStorage',
  component: EquipmentStorage,
  redirect: "/superviseHelp/equipmentManage/equipmentStorage/normalEquipmentStorage",
  children: [
    {
      path: "normalEquipmentStorage",
      component: NormalEquipmentStorage
    },
    {
      path: "abnormalEquipmentStorage",
      component: AbnormalEquipmentStorage
    }
  ]
}
