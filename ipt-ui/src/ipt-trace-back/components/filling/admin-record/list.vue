<template>
  <div>
    <!-- [搜索框] -->
    <!--  1. 在Vue data中预先定义所有表单model的初始值 -->
    <!--  2. 表单中预定义的数据(比如下拉选的可选值)，使用接口获取数据 -->
    <!--  3. 所有表单model的初始值需要作为一个整体对象传递给table组件作为分页的请求参数 -->
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>管理者姓名</label>
            <input type="text" class="form-control search-01" placeholder="" v-model="params.managerName">
            <label>电子邮件</label>
            <input type="text" class="form-control search-01" placeholder="" v-model="params.managerJob">
          </div>
          <div class="form-group">
            <label>所属企业</label>
            <input type="text" class="form-control search-01" placeholder="" v-model="params.enterpriseName">
            <label>审核结果</label>
            <el-select v-model="params.isConfirm" name="isConfirm" filterable placeholder="请选择">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in isConfirms"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-dange btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset1" data-toggle="modal" data-target="#js_add_modal"> 新增</button>
          </div>
        </form>
      </div>
    </div>
    <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
    <ipt-create id="js_add_modal" :params="params"></ipt-create>
    <ipt-view id="js_show_modal" :managerId="managerId"></ipt-view>
    <ipt-edit id="js_edit_modal" :managerId="managerId" :params="params"></ipt-edit>
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
          :tableData="adminRecordTableData"
          :tableConfig.sync="adminRecordConfig"
          :params="params">
          <!-- 插槽示例 -->
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a href="javascript:;" class="look-link" data-toggle="modal" data-target="#js_show_modal"
               @click="managerId = scope.columnData.managerId">查看</a>
            <a href="javascript:;" class="edit-link" data-toggle="modal" data-target="#js_edit_modal"
               @click="managerId = scope.columnData.managerId"
               v-if="scope.columnData.isConfirm === 2">编辑</a>
            <a href="javascript:;" class="delete-link"
               @click="deleteBtn(scope.columnData)"
               v-if="scope.columnData.isConfirm !== 1">删除</a>
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
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-trace-back/api'

  export default {
    /** Zhao Yun 2017/11/16 将引入的组件作为子组件 */
    components: {
      IptTable, IptCreate, IptView, IptEdit
    },
    /** Zhao Yun 2017/11/16 在创建的时候进行初始化 */
    created() {
      this.init()
    },
    data() {
      return {
        /** Zhao Yun 2017/11/16 预定义搜索表单的初始值 */
        params: {
          enterpriseName: "",
          enterpriseType: "",
          isConfirm: ""
        },
        /** Zhao Yun 2017/11/16 定义表格的配置 */
        adminRecordConfig: {
          getApi: 'getAdminRecordTableData',  // #必须# 数据的的请求Vuex的Action名
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '管理者姓名', data: 'managerName'},
            {title: '管理者职务', data: 'managerJob'},
            {title: '所属企业', data: 'enterpriseName'},
            {title: '联系方式', data: 'phone'},
            {title: '邮箱', data: 'email'},
            {title: '备案日期', data: 'recordDate'},
            {title: '审核结果', data: 'isConfirmEnum.name'}
          ]
        },
        checkboxList: [],
        checkboxAll: false,
        managerId: ''
      }
    },
    methods: {
      init() {
        /** Zhao Yun 2017/11/16 获取表格分页数据 */
        this.getAdminRecordTableData(this.params)
        this.getIsConfirms()
        this.getProperties()
        this.findRegionParentList()
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      search() {
        this.getAdminRecordTableData(this.params)
      },
      approvalBtn(columnData) {
        this.$confirm('是否审核通过?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.AdminRecord.approval(columnData.managerId).then((data) => {
            this.$message({
              type: 'success',
              message: '审核成功!'
            })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this.getAdminRecordTableData(this.params)
          })
        })
      },
      deleteBtn(columnData) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.AdminRecord.deleteOne(columnData.managerId).then((data) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this.getAdminRecordTableData(this.params)
          })
        })
      },
      checkAll(event) {
        var self = this
        if (!event.currentTarget.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.adminRecordTableData.data.map(item => item.managerId)
        }
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getAdminRecordTableData: 'getAdminRecordTableData',
        getIsConfirms: 'getIsConfirms',
        getProperties: 'getProperties',
        findRegionParentList: 'findRegionParentList'
      })
    },
    /** Zhao Yun 2017/11/16 获取表格需要的数据 */
    computed: mapGetters({
      isConfirms: 'isConfirms',
      adminRecordTableData: 'adminRecordTableData'
    }),
    watch: {
      checkboxList(curVal) {
        this.checkboxAll = curVal.length === this.adminRecordConfig.display
      }
    }
  }
</script>
