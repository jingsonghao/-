<template>
  <div class="main">
    <!--table 组件-->
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>信用档案管理</a></li>
      <li class="active jsh-active">诚信行为记录</li>
      <a href="javascript:;" type="button" style="margin-left:78%;" class="btn btn-search" @click="back()"> 关闭</a>
    </ol>
    <div class="shadow-boxs">
      <ipt-table
        :tableData="integrityRecordTableData"
        :tableConfig="tableConfig"
        :params="params">
      </ipt-table>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import IptTable from "@/components/common/table"
  import IptCreate from "./create"
  export default {
    components: {
      IptTable, IptCreate
    },
    /** Zhao Yun 2017/11/16 在创建的时候进行初始化 */
    created() {
      this.init()
    },
    data() {
      return {
        /** Zhao Yun 2017/11/16 预定义搜索表单的初始值 */
        params: {
          enterpriseNo:this.$route.query.EnterpriseNo
        },
        tableConfig: {
          getApi: 'getIntegrityRecordTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "",                              // [可选] 表格标题，默认不显示标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 10,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            { title: '诚信类型', data: 'honestyType.htName' },
            { title: '行为描述', data: 'describe' },
            { title: '添加日期', data: 'addDate' }
          ]
        },
        checkboxList: [],
        enterpriseNo:this.$route.query.EnterpriseNo
      }
    },
    computed: mapGetters({
      /*这里的配置也影响参数显示*/
      integrityRecordTableData: 'integrityRecordTableData'
    }),
    methods: {
      init() {
        this.getIntegrityRecordTableData(this.params)
      },
      back() {
        this.$router.push('creditArchives')
      },
    /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getIntegrityRecordTableData: 'getIntegrityRecordTableData'
      })
  }
  }
</script>
