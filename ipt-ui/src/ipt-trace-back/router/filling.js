import Filling from "@/ipt-trace-back/pages/subject-manage/filling"
import NodeRecord from "@/ipt-trace-back/components/filling/node-record/list"
import BusinessRecord from "@/ipt-trace-back/components/filling/business-record/list"
import AdminRecord from "@/ipt-trace-back/components/filling/admin-record/list"
import StoreRecord from "@/ipt-trace-back/components/filling/store-record/list"

export default {
  path: '/traceBack/filling',
  component: Filling,
  redirect: "/traceBack/filling/nodeRecord",
  children: [
    {
      path: "nodeRecord",
      component: NodeRecord
    },
    {
      path: "storeRecord",
      component: StoreRecord
    },
    {
      path: "businessRecord",
      component: BusinessRecord
    },
    {
      path: "adminRecord",
      component: AdminRecord
    }
  ]
}
