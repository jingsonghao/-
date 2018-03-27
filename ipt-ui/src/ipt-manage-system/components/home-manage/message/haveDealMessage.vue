<template>
  <div class="main">
    <!--search 组件 start-->
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>留言类型</label>
            <select class="form-control search-01" v-model="params.messageType">
              <option value="">全部</option>
              <option v-for="option in haveDealMessageTableData.messageType" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>留言问题</label>
            <input type="text" class="form-control search-01" placeholder="" v-model="params.question">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn  btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-dange btn-reset" @click="reset"> 重置 </button>
          </div>
        </form>
      </div>
    </div>
    <!--search 组件 end-->
    <ipt-view id="js_show_modal" :record="record"></ipt-view>
    <!--table 组件 start-->
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
        <ipt-table :tableData="haveDealMessageTableData"
                   :tableConfig="haveDealMessageTableDataConfig"
                   :params="params">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)" data-toggle="modal" data-target="#js_show_modal">查看</a>
            <a class="delete-link" @click="deleteBtn(scope.columnData)">删除</a>
          </td>
        </ipt-table>
      </div>
    </div>
    <!--table 组件 end-->
  </div>
</template>
<script>
  /** 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapGetters, mapActions} from 'vuex'
  /** 引入表格组件 */
  import IptTable from "@/components/common/table"
  import IptView from "@/ipt-manage-system/components/home-manage/message/messageView.vue"
  import Api from "@/ipt-manage-system/api"
  export default {
    /** 将引入的组件作为子组件 */
    components: {
      IptTable, IptView, Api
    },
    /** 在创建的时候进行初始化 */
    created: function () {
      this.init()
    },
    data: function () {
      return {
        /** 预定义搜索表单的初始值 */
        params: {
          messageType: '',
          question: '',
          reviewStatusNot: 0
        },
        record:{
        },
        /** 定义表格的配置 */
        haveDealMessageTableDataConfig: {
          getApi: 'getHaveDealMessageTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "已处理留言管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '留言类型', data: 'messageTypeName'},
            {title: '留言问题', data: 'question'},
            {title: '提交时间', data: 'createTime'},
            {title: '审核状态', data: 'reviewStatusName'}
          ]
        }
      }
    },
    methods: {
      init: function () {
        /** 获取表格分页数据 */
        this.getHaveDealMessageTableData(this.params)
      },
      reset: function () {
        this.params = {
          messageType: '',
          question: '',
          reviewStatusNot: 0
        }
      },
      search: function () {
        this.getHaveDealMessageTableData(this.params)
      },
      showBtn: function (columnData) {
        this.record = columnData
      },
      deleteBtn: function (columnData) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.LeaveMessage.deleteMessage(columnData.messageId).then((data) => {
          this.$message({
          type: 'success',
          message: '删除' + JSON.stringify(columnData.question) + '成功!'
        })
        /** yanggang 2017/12/4 更新表格分页数据 */
        this.getHaveDealMessageTableData(this.params)
      })
      })
      },
      updateBtn: function (columnData) {
        this.record = columnData
      },
    /** 获取请求数据的action */
      ...mapActions({
        getHaveDealMessageTableData: 'getHaveDealMessageTableData'
      })
  },
  /** 获取表格需要的数据 */
  computed: mapGetters({
    haveDealMessageTableData: 'haveDealMessageTableData'
  })
  }
</script>
