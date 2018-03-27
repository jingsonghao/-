<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>门户管理</a></li>
      <li class="active jsh-active">信息发布</li>
    </ol>
    <!--search 组件 start-->
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>所属频道</label>
            <select class="form-control search-01" v-model="params.channel">
              <option value="">全部</option>
              <option v-for="option in infoPublishTableData.newsEnums.channel" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>新闻标题</label>
            <input type="text" class="form-control search-01" placeholder=""
                   v-model="params.title">
          </div>
          <div class="form-group">
            <!--双日历插件-->
            <label>发布日期</label>
            <el-date-picker v-model="params.startTime" type="datetime" placeholder="开始日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="params.endTime" type="datetime" placeholder="结束日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn  btn-search" @click="search"> 查询 </button>
            <button type="reset" class="btn btn-dange btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn  btn-search" data-toggle="modal" data-target="#js_add_modal"> 新增 </button>
            <button type="reset" class="btn btn-dange btn-reset" @click="deleteBatch"> 批量删除</button>
          </div>
        </form>
      </div>
    </div>
    <!--search 组件 end-->

    <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
    <ipt-add id="js_add_modal" :newsEnums="infoPublishTableData.newsEnums" v-on:complete="search"></ipt-add>
    <ipt-view id="js_show_modal" :record="record" v-on:complete="search"></ipt-view>
    <ipt-edit id="js_edit_modal" :newsEnums="infoPublishTableData.newsEnums" :record="record" v-on:complete="search"></ipt-edit>
    <ipt-review id="js_review_modal" :newsEnums="infoPublishTableData.newsEnums" :record="record" v-on:complete="search"></ipt-review>
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
        <ipt-table :tableData="infoPublishTableData"
                   :tableConfig="infoPublishTableConfig"
                   :params="params">
          <!-- 表格插槽 复选框-->
         <th slot="beforeTitle">
            多选
            <input type="checkbox" @change="checkAll">
          </th>
          <!-- 表格复选框 -->
          <td slot="beforeBody" slot-scope="scope">
            <input type="checkbox" v-model="checkboxList" :value="scope.columnData.newsId">
          </td>
          <!-- 表格操作按钮 -->
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)" data-toggle="modal" data-target="#js_show_modal">查看</a>
            <a class="edit-link" @click="updateBtn(scope.columnData)" data-toggle="modal" data-target="#js_edit_modal">编辑</a>
            <a class="add-link" @click="reviewBtn(scope.columnData)" v-if="scope.columnData.reviewStatus == 0" data-toggle="modal" data-target="#js_review_modal">审核</a>
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
  /** 引入创建的弹窗组件 */
  import IptAdd from "@/ipt-manage-system/components/home-manage/infoPublish/infoPublishAdd.vue"
  import IptEdit from "@/ipt-manage-system/components/home-manage/infoPublish/infoPublishEdit.vue"
  import IptView from "@/ipt-manage-system/components/home-manage/infoPublish/infoPublishView.vue"
  import IptReview from "@/ipt-manage-system/components/home-manage/infoPublish/infoPublishReview.vue"

  import Api from '@/ipt-manage-system/api'

  export default {
    /** 将引入的组件作为子组件 */
    components: {
      IptTable, IptAdd, IptEdit, IptView, IptReview
    },
    /** 在创建的时候进行初始化 */
    created: function () {
      this.init()
    },
    data: function () {
      return {
        /** 预定义搜索表单的初始值 */
        params: {
          channel: '',
          title: '',
          startTime: '',
          endTime: ''
        },
        record:{
        },
        // 下拉查询条件
//        productKinds: [],
//        nodeTypes: [],
        /** 定义表格的配置 */
        infoPublishTableConfig: {
          getApi: 'getInfoPublishTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "信息发布管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '所属频道', data: 'channelName'},
            {title: '新闻标题', data: 'title'},
            {title: '发布人', data: 'createUser.name'},
            {title: '发布时间', data: 'createTime'},
            {title: '审核人', data: 'reviewUser.name'},
            {title: '审核时间', data: 'reviewTime'},
            {title: '审核结果', data: 'reviewStatusName'}
          ]
        },
        // 复选框条件
        checkboxList: []
      }
    },
    methods: {
      init: function () {
        /** 获取表格分页数据 */
        this.getInfoPublishTableData(this.params)
      },
      search: function () {
        this.getInfoPublishTableData(this.params)
      },
      showBtn: function (columnData) {
        this.record = columnData
        if (columnData.isTop === 1) {
          this.record.isTopName = "是"
        }
        if (columnData.isTop === 0) {
          this.record.isTopName = "否"
        }
        //alert('查看' + JSON.stringify(columnData))
      },
      updateBtn: function (columnData) {
        this.record = columnData
        //alert('编辑' + JSON.stringify(columnData))
      },
      reviewBtn: function (columnData) {
        this.record = columnData
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      deleteBtn(columnData) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.InfoPublish.deleteInfoPublish(columnData.newsId).then((data) => {
          this.$message({
            type: 'success',
            message: '删除' + JSON.stringify(columnData.title) + '成功!'
          })
          /** yanggang 2017/12/4 更新表格分页数据 */
          this.getInfoPublishTableData(this.params)
          })
        })
      },
      deleteBatch() {
        var that = this
        this.$confirm('此操作将永久删除被选数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.InfoPublish.deleteBatchInfoPublish(that.checkboxList).then((data) => {
          this.$message({
          type: 'success',
          message: '删除数据成功!'
        })
        /** yanggang 2017/12/4 更新表格分页数据 */
        this.getInfoPublishTableData(this.params)
        })
        })
      },
      // 全选框
      checkAll: function (event) {
        var self = this
        if (!event.target.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.infoPublishTableData.data.map(item => item.newsId)
        }
      },
      /** 获取请求数据的action */
      ...mapActions({
        getInfoPublishTableData: 'getInfoPublishTableData'
      })
    },
    /** 获取表格需要的数据 */
    computed: mapGetters({
      infoPublishTableData: 'infoPublishTableData'
    })
  }
</script>
