import FillingAudit from "@/ipt-trace-back/pages/subject-manage/fillingAudit"
import NodeRecord from "@/ipt-trace-back/components/filling-audit/node-record/list"
import StoreRecord from "@/ipt-trace-back/components/filling-audit/store-record/list"
import BusinessRecord from "@/ipt-trace-back/components/filling-audit/business-record/list"
import AdminRecord from "@/ipt-trace-back/components/filling-audit/admin-record/list"

export default {
  path: '/traceBack/fillingAudit',
  component: FillingAudit,
  redirect: "/traceBack/fillingAudit/nodeRecord",
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
