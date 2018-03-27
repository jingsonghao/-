<template>

  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>企业诚信管理</a></li>
      <li class="active jsh-active">信用档案管理</li>
    </ol>
    <!--search 组件-->
    <div class="shadow-boxs">
      <!--search 搜索框 组件-->
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>企业名称</label>
            <input type="text" class="form-control search-01" placeholder="" v-model="params.eName" name="eName">
            <label>诚信评级</label>
            <select class="form-control search-01" v-model="params.cfCreditScore">
              <option>全部</option>
              <option value="90">优秀</option>
              <option value="80">良好</option>
              <option value="70">合格</option>
              <option value="60">差</option>
              <!--<option value="50">黑名单</option>-->
            </select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" @click.sync="search"> 查询 </button>
          </div>
        </form>
      </div>
    </div>
    <!--table 组件-->
    <div class="shadow-boxs">
      <ipt-table
        :tableData="creditArchivesTableData"
        :tableConfig="tableConfig"
        :params="params">
        <th slot="afterTitle">操作</th>
        <td slot="afterBody" slot-scope="scope">
          <a href="javascript:;" class="look-link" @click="showBtn(scope.columnData.eno)" data-toggle="modal">查看</a>
        </td>
      </ipt-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import IptTable from "@/components/common/table"
  /* likai 2017/12/05 引入创建的弹窗组件*/
  import IptCreate from "./showCred"

  export default {
    /** likai 2017/12/05 将引入的组件作为子组件 */
    components: {
      IptTable, IptCreate//, IptView, IptEdit
    },
    created() {
      this.init()
    },
    data() {
      return {
        params: {
          productType: 3,
          enterpriseNo: null,
          nodeType: null,
          enterpriseName: ''
        },
        productTypes: [],
        productKinds: [],
        nodeTypes: [],
        tableConfig: {
          getApi: 'getCreditArchivesTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "",                             // [可选] 表格标题，默认不显示标题
          display: 10,                          // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                         // [可选] 分页号码显示个数，默认10条
          sequenceShow: false,                   // [可选] 是否显示序号
          columns: [                           // [必须] 表格每列取JSON数据的哪个值
            { title: '排名', data: 'id' },
            { title: '企业名称', data: 'ename' },
            { title: '诚信评级', data: 'cfCreditName' },
            { title: '诚信率/%', data: 'cfCreditScore' },
            { title: '排名变动', data: 'cfSort' }
          ]
        },
        checkboxList: [],
        checkboxAll: false,
        CreditArchives: ''
      }
    },
    computed: mapGetters({
      creditArchivesTableData: 'creditArchivesTableData'
    }),
    methods: {
      init() {
        this.getCreditArchivesTableData(this.params)
      },
      //搜索条件查询重置方法
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      //top模糊查询方法
      search() {
        this.getCreditArchivesTableData(this.params)
      },
      showBtn(enterpriseNo) {
        this.$router.push({path: 'showCred', query: { EnterpriseNo: enterpriseNo }})
      },
      checkAll(event) {
        var self = this
        if (!event.currentTarget.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.creditArchivesTableData.data.map(item => item.enterpriseId)
        }
      },
    /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getCreditArchivesTableData: 'getCreditArchivesTableData'
      })
    }
  }
</script>
