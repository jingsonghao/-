import leaveMessage from "@/ipt-manage-system/pages/home-manage/leaveMessage"
import notDealMessage from "@/ipt-manage-system/components/home-manage/message/notDealMessage"
import haveDealMessage from "@/ipt-manage-system/components/home-manage/message/haveDealMessage"

export default {
  path: '/manageSystem/homeManage/leaveMessage',
  component: leaveMessage,
  redirect: "/manageSystem/homeManage/leaveMessage/notDealMessage",
  children: [
    {
      path: "notDealMessage",
      component: notDealMessage
    },
    {
      path: "haveDealMessage",
      component: haveDealMessage
    }
  ]
}
