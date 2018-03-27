<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>运行发现管理</a></li>
      <li class="active jsh-active">运行报告管理</li>
    </ol>
    <!-- [搜索框] -->
    <!--  1. 在Vue data中预先定义所有表单model的初始值 -->
    <!--  2. 表单中预定义的数据(比如下拉选的可选值)，使用接口获取数据 -->
    <!--  3. 所有表单model的初始值需要作为一个整体对象传递给table组件作为分页的请求参数 -->
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>运行报告名称</label>
            <input type="text" class="form-control" placeholder="" v-model="params.reportName">
          </div>
          <!--<div class="form-group">
            &lt;!&ndash;双日历插件&ndash;&gt;
            <label>运行报告时间</label>
            <div class="input-prepend input-group">
              <input id="plantStartTime1" placeholder="" type="text" class="form-control plantTime" v-model="params.reportDateMin" readonly/>
              <i class="search-right"></i>
            </div>
            <label>—</label>
            <div  class="input-prepend input-group">
              <input id="plantEndTime1" placeholder="" type="text" class="form-control plantTime" v-model="params.reportDateMax" readonly/>
              <i class="search-right"></i>
            </div>
          </div>-->
          <div class="form-group">
            <label>运行报告时间</label>
            <el-date-picker v-model="params.reportDateMin" style="width: 140px;"
                            type="date" placeholder="" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="params.reportDateMax" style="width: 140px;"
                            type="date" placeholder="" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd 23:59:59"></el-date-picker>
          </div>
          <div class="form-group">
            <label>审核结果</label>
            <el-select v-model="params.auditStatus" name="auditStatus" filterable placeholder="请选择">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in problemReportTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-dange btn-reset" @click="reset"> 重置</button>
            <button type="button" class="btn btn-reset1" data-toggle="modal" data-target="#js_add_modal"> 生成运行报告
            </button>
            <button type="button" class="btn btn-search" @click="search"> 查询</button>
          </div>
        </form>
      </div>
    </div>
    <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
    <ipt-create id="js_add_modal" :params="params"></ipt-create>
    <ipt-view id="js_show_modal" :runningReport="runningReport"></ipt-view>
    <ipt-edit id="js_edit_modal" :runningReport="runningReport" :params="params"></ipt-edit>
    <ipt-audit id="js_audit_modal" :runningReport="runningReport" :params="params"></ipt-audit>
    <ipt-auditno id="js_auditno_modal" :runningReport="runningReport" :params="params"></ipt-auditno>
    <ipt-user id="js_user_modal" :params="params"></ipt-user>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <!-- [表格] -->
        <!--  1. tableData：请求接口得到的表格的数据 -->
        <!--  2. tableConfig：表格的预定义配置 -->
        <!--  3. [可选]params：搜索框的请求参数 -->
        <!--  4. [可选]使用插槽扩展表格，##标题+内容同时使用## -->
        <!--     使用scope可以获取子组件的数据 -->
        <!--     标题/列之前[beforeTitle+beforeBody] -->
        <!--     标题/列之后[afterTitle+afterBody] -->
        <ipt-table
          :tableData="runningReportTableData"
          :tableConfig.sync="runningReportConfig"
          :params="params">
          <!-- 插槽示例 -->
          <!--<th slot="beforeTitle"><input type="checkbox" @change="checkAll" v-model="checkboxAll"></th>-->
          <!--<td slot="beforeBody" slot-scope="scope">-->
          <!--<input type="checkbox" v-model="checkboxList" :value="scope.columnData.managerId">-->
          <!--</td>-->
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a href="javascript:;" class="look-link" @click="showBtn(scope.columnData)" data-toggle="modal"
               data-target="#js_show_modal">查看</a>

            <a href="javascript:;" class="edit-link" @click="updateBtn(scope.columnData)" data-toggle="modal" v-if="scope.columnData.auditStatus == 2 && scope.columnData.authorId == loginUser.userId"
               data-target="#js_edit_modal">编辑</a>
            <a href="javascript:;" v-if="loginUser.roles[0].roleId == 1 && scope.columnData.auditStatus == 0" class="add-link" @click="auditBtn(scope.columnData)" data-toggle="modal"
               data-target="#js_audit_modal">审核</a>
            <a href="javascript:;" v-if="loginUser.roles[0].roleId == 1 || scope.columnData.auditStatus === 2 && scope.columnData.authorId === loginUser.userId" class="delete-link" @click="deleteBtn(scope.columnData)">删除</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapGetters, mapActions} from 'vuex'
  /** Zhao Yun 2017/11/16 引入表格组件 */
  import IptTable from "@/components/common/table"
  /** Zhao Yun 2017/11/16 引入创建的弹窗组件 */
  import IptCreate from "./create"
  import IptView from "./view"
  import IptEdit from "./edit"
  import IptAudit from "./audit"
  import IptAuditno from "./auditNo"
  import IptUser from "./user"
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-trace-back/api'

  export default {
    /** Zhao Yun 2017/11/16 将引入的组件作为子组件 */
    components: {
      IptTable, IptCreate, IptView, IptEdit, IptAudit, IptAuditno, IptUser
    },
    /** Zhao Yun 2017/11/16 在创建的时候进行初始化 */
    created() {
      this.init()
    },
    data() {
      return {
        /** Zhao Yun 2017/11/16 预定义搜索表单的初始值 */
        params: {
          reportName: "",
          reportDateMin: "",
          reportDateMax: "",
          auditStatus: ""
        },
        /** Zhao Yun 2017/11/16 定义表格的配置 */
        runningReportConfig: {
          getApi: 'getRunningReportTableData',  // #必须# 数据的的请求Vuex的Action名
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '运行报告名称', data: 'reportName'},
            {title: '报告生成人', data: 'authorName'},
            {title: '运行报告生成时间', data: 'sendDate'},
            {title: '审核人', data: 'auditName'},
            {title: '审核时间', data: 'auditDate'},
            {title: '审核结果', data: 'problemReportEnum.name'}
          ]
        },
        checkboxList: [],
        checkboxAll:false,
        runningReport: ''
      }
    },
    /** Zhao Yun 2017/11/16 获取表格需要的数据 */
    computed: mapGetters({
      runningReportTableData: 'runningReportTableData',
      problemReportTypes: 'problemReportTypes',
      loginUser: 'loginUser'
    }),
    methods: {
      init() {
        /** Zhao Yun 2017/11/16 获取表格分页数据 */
        this.getRunningReportTableData(this.params)
        this.getProblemReportTypes()
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      search() {
        this.getRunningReportTableData(this.params)
        this.getProblemReportTypes()
      },
      showBtn(columnData) {
        Api.RunningReport.findRunningReport(columnData.runningReportId).then((data) => {
          this.runningReport = data.data
      })
      },
      updateBtn(columnData) {
        Api.RunningReport.findRunningReport(columnData.runningReportId).then((data) => {
          this.runningReport = data.data
      })
      },
      auditBtn(columnData) {
        Api.RunningReport.findRunningReport(columnData.runningReportId).then((data) => {
          this.runningReport = data.data
        })
      },
      approvalBtn(columnData) {
        this.$confirm('是否审核通过?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.RunningReport.approvalRunningReport(columnData.runningReportId).then((data) => {
          this.$message({
            type: 'success',
            message: '审核成功!'
            })
          /** yanggang 2017/12/4 更新表格分页数据 */
          this.getRunningReportTableData(this.params)
          })
        })
      },
      deleteBtn(columnData) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.RunningReport.deleteAdminRecord(columnData.runningReportId).then((data) => {
            this.$message({
            type: 'success',
            message: '删除' + JSON.stringify(columnData.reportName) + '成功!'
            })
          /** yanggang 2017/12/4 更新表格分页数据 */
          this.getRunningReportTableData(this.params)
          })
        })
      },
      checkAll(event) {
        var self = this
        if (!event.currentTarget.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.runningReportTableData.data.map(item => item.runningReportId
        )
        }
      },
    /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getRunningReportTableData: 'getRunningReportTableData',
        getProblemReportTypes: 'getProblemReportTypes'
      })
    },
    watch: {
      checkboxList (curVal) {
        this.checkboxAll = curVal.length === this.runningReportConfig.display
      }
    }
  }
</script>
