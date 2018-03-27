/**
 * Created by sqc on 2017/11/16.
 */
import InvestigateManagementTarget from "@/ipt-supervise-help/pages/check/investigateManagementTarget"
import IndexBase from "@/ipt-supervise-help/components/check/indexBase"
import IndexSettings from "@/ipt-supervise-help/components/check/indexSettings"

export default {
  path: '/superviseHelp/investigateManagementTarget',
  component: InvestigateManagementTarget,
  redirect: "/superviseHelp/investigateManagementTarget/indexBase",
  children: [
    {
      path: "indexBase",
      component: IndexBase
    },
    {
      path: "indexSettings",
      component: IndexSettings
    }
  ]
}
