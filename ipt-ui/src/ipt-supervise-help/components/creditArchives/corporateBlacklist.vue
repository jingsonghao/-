<template>
  <div class="main">
    <!--search 组件-->
    <div class="shadow-boxs">
      <!--search 搜索框 组件-->
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>企业名称</label>
            <input type="text" class="form-control search-01" placeholder="">
            <label>企业类型</label>
            <select class="form-control search-01">
              <option>全部</option>
              <option>食品</option>
              <option>食品</option>
              <option>食用农产品</option>
            </select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-reset"> 重置 </button>
            <button type="button" class="btn  btn-search"> 查询 </button>
          </div>
        </form>
      </div>
    </div>
    <!--table 组件-->
    <div class="shadow-boxs">
      <ipt-table
        :tableData="corporateBlacklistTableData"
        :tableConfig="tableConfig"
        :params="params">
        <!-- 插槽示例 -->
        <th slot="beforeTitle"><input type="checkbox" @change="checkAll"></th>
        <td slot="beforeBody" slot-scope="scope">
          <input type="checkbox" v-model="checkboxList" :value="scope.columnData.enterpriseId">
        </td>
        <th slot="afterTitle">操作</th>
        <td slot="afterBody" slot-scope="scope">
          <a href="javascript:;" class="look-link" @click="showBtn(scope.columnData)">查看</a>
        </td>
      </ipt-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import IptTable from "@/components/common/table"

  export default {
    components: {
      IptTable
    },
    created() {
      this.init()
    },
    data() {
      return {
        params: {
          productType: 3,
          productKind: null,
          nodeType: null,
          enterpriseName: ''
        },
        productTypes: [],
        productKinds: [],
        nodeTypes: [],
        tableConfig: {
          getApi: 'getCorporateBlacklistTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "",             // [可选] 表格标题，默认不显示标题
          display: 3,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            { title: '企业名称', data: 'companyName' },
            { title: '企业类型', data: 'companyType' },
            { title: '企业负责人', data: 'legalPerson' },
            { title: '联系方式', data: 'contactDetails' },
            { title: '诚信得分/分', data: 'creditScoring' },
            { title: '上期排名', data: 'preRanking' }
          ]
        },
        checkboxList: []
      }
    },
    computed: mapGetters({
      corporateBlacklistTableData: 'corporateBlacklistTableData'
    }),
    methods: {
      init() {
        /** Zhao Yun 2017/11/16 获取表格分页数据 */
        this.getCorporateBlacklistTableData(this.params)
      },
      search() {
        this.getCorporateBlacklistTableData(this.params)
      },
      showBtn(columnData) {
        alert('查看' + JSON.stringify(columnData))
      },
      updateBtn(columnData) {
        alert('编辑' + JSON.stringify(columnData))
      },
      deleteBtn(columnData) {
        alert('删除' + JSON.stringify(columnData))
      },
      checkAll(event) {
        var self = this
        if (!event.currentTarget.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.corporateBlacklistTableData.data.map(item => item.enterpriseId)
        }
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getCorporateBlacklistTableData: 'getCorporateBlacklistTableData'
      })
    }
  }
</script>

<style>

</style>
