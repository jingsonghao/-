<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>问题发现管理</a></li>
      <li class="active jsh-active">问题项管理</li>
    </ol>
    <!-- [搜索框] -->
    <!--  1. 在Vue data中预先定义所有表单model的初始值 -->
    <!--  2. 表单中预定义的数据(比如下拉选的可选值)，使用接口获取数据 -->
    <!--  3. 所有表单model的初始值需要作为一个整体对象传递给table组件作为分页的请求参数 -->
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>问题对象</label>
            <input type="text" class="form-control" placeholder="" v-model="params.name">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-dange btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
          </div>
        </form>
      </div>
    </div>
    <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
    <ipt-edit id="js_edit_modal" :questionItems="questionItems" :params="params"></ipt-edit>
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
          :tableData="questionItemsTableData"
          :tableConfig.sync="questionItemsConfig"
          :params="params">

          <th slot="afterTitle">问题级别</th>
          <td slot="afterBody" slot-scope="scope">
            <a href="javascript:;" class="edit-link" @click="updateBtn(scope.columnData)" data-toggle="modal" data-target="#js_edit_modal">维护</a>
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
  import IptEdit from "./edit"
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-supervise-help/api'

  export default {
    /** Zhao Yun 2017/11/16 将引入的组件作为子组件 */
    components: {
      IptTable, IptEdit
    },
    /** Zhao Yun 2017/11/16 在创建的时候进行初始化 */
    created() {
      this.init()
    },
    data() {
      return {
        /** Zhao Yun 2017/11/16 预定义搜索表单的初始值 */
        params: {
          name: ""
        },

        /** Zhao Yun 2017/11/16 定义表格的配置 */
        questionItemsConfig: {
          getApi: 'getQuestionItemsTableData',  // #必须# 数据的的请求Vuex的Action名
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '问题对象', data: 'name'},
            {title: '问题指标内容', data: 'indexContent'}
          ]
        },
        checkboxList: [],
        checkboxAll: false,
        questionItems: ''
      }
    },
    /** Zhao Yun 2017/11/16 获取表格需要的数据 */
    computed: mapGetters({
      questionItemsTableData: 'questionItemsTableData'
    }),
    methods: {
      init() {
        /** Zhao Yun 2017/11/16 获取表格分页数据 */
        this.getQuestionItemsTableData(this.params)
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      search() {
        this.getQuestionItemsTableData(this.params)
      },
      showBtn(columnData) {
        Api.QuestionItems.findQuestionItems(columnData.itemId).then((data) => {
          this.questionItems = data.data
        })
      },
      updateBtn(columnData) {
        Api.QuestionItems.findQuestionItems(columnData.itemId).then((data) => {
          this.questionItems = data.data
        })
      },
      auditBtn(columnData) {
        Api.QuestionItems.findQuestionItems(columnData.itemId).then((data) => {
          this.questionItems = data.data
      })
      },
      approvalBtn(columnData) {
        this.$confirm('是否审核通过?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.QuestionItems.approvalQuestionItems(columnData.itemId).then((data) => {
            this.$message({
              type: 'success',
              message: '审核成功!'
            })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this.getQuestionItemsTableData(this.params)
          })
        })
      },
      deleteBtn(columnData) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.QuestionItems.deleteQuestionItems(columnData.itemId).then((data) => {
            this.$message({
              type: 'success',
              message: '删除' + JSON.stringify(columnData.name) + '成功!'
            })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this.getQuestionItemsTableData(this.params)
          })
        })
      },
      checkAll(event) {
        var self = this
        if (!event.currentTarget.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.questionItemsTableData.data.map(item => item.itemId)
        }
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getQuestionItemsTableData: 'getQuestionItemsTableData'
      })
    },
    watch: {
      checkboxList(curVal) {
        this.checkboxAll = curVal.length === this.questionItemsConfig.display
      }
    }
  }
</script>
