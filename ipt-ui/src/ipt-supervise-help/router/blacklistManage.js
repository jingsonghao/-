/**
 * Created by sqc on 2017/11/17.
 */
import BlackList from "@/ipt-supervise-help/pages/creditArchives/blackList"
import CorporateBlacklist from "@/ipt-supervise-help/components/creditArchives/corporateBlacklist"
import PersonalBlacklist from "@/ipt-supervise-help/components/creditArchives/personalBlacklist"

export default {
  path: '/superviseHelp/blackList',
  component: BlackList,
  redirect: "/superviseHelp/blackList/corporateBlacklist",
  children: [
    {
      path: "corporateBlacklist",
      component: CorporateBlacklist
    },
    {
      path: "personalBlacklist",
      component: PersonalBlacklist
    }
  ]
}
