<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>门户管理</a></li>
      <li class="active jsh-active">电商链接</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>企业名称</label>
            <input type="text" name="enterpriseName" v-model="ecommerceLinksParams.enterpriseName" class="form-control search-01" placeholder="">
          </div>
          <div class="form-group">
            <!--双日历插件-->
            <el-date-picker v-model="ecommerceLinksParams.startTime" type="datetime" placeholder="开始日期"format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="ecommerceLinksParams.endTime" type="datetime" placeholder="结束日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn  btn-search" @click="search"> 查询 </button>
            <button type="reset" class="btn btn-dange btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn  btn-search" data-toggle="modal" data-target="#ecommerceLinksAdd"> 新增 </button>
            <button type="reset" class="btn btn-dange btn-reset" @click="deleteBatchE"> 批量删除</button>
          </div>
        </form>
      </div>
    </div>
    <!--search 组件 end-->

    <!--table 组件 start-->
    <div class="shadow-boxs">
      <div class="col-lg-12">

        <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
        <ipt-add id="ecommerceLinksAdd" :paramsParent="ecommerceLinksParams"></ipt-add>
        <ipt-edit id="ecommerceLinksEdit" :params="ecommerceLinksParams" :linksRecord="linksRecords"></ipt-edit>
        <ipt-detail id="ecommerceLinksDetail" :linkRecord="linksRecords"></ipt-detail>
        <!-- [表格] -->
        <!--  1. tableData：请求接口得到的表格的数据 -->
        <!--  2. tableConfig：表格的预定义配置 -->
        <!--  3. [可选]params：搜索框的请求参数 -->
        <!--  4. [可选]使用插槽扩展表格，##标题+内容同时使用## -->
        <!--     使用scope可以获取子组件的数据 -->
        <!--     标题/列之前[beforeTitle+beforeBody] -->
        <!--     标题/列之后[afterTitle+afterBody] -->
        <ipt-table :tableData="ecommerceLinksTableData"
                   :tableConfig="ecommerceLinksTableConfig"
                   :params="ecommerceLinksParams">
          <!-- 表格插槽 复选框-->
         <th slot="beforeTitle">
            <!-- 全选框 -->
           多选
            <input type="checkbox" @change="checkAll">
         </th>
          <!-- 表格复选框 -->
          <td slot="beforeBody" slot-scope="scope">
            <input type="checkbox" v-model="checkboxList" :value="scope.columnData.ecommerceLinkId">
          </td>
           表格操作按钮
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)" data-toggle="modal" data-target="#ecommerceLinksDetail">查看</a>
            <a class="edit-link" @click="updateBtn(scope.columnData)" data-toggle="modal" data-target="#ecommerceLinksEdit">编辑</a>
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
  import IptAdd from "@/ipt-manage-system/components/home-manage/ecommerceLinks/ecommerceLinksAdd"
  import IptEdit from "@/ipt-manage-system/components/home-manage/ecommerceLinks/ecommerceLinksEdit"
  import IptDetail from "@/ipt-manage-system/components/home-manage/ecommerceLinks/ecommerceLinksDetail"
  import Api from '@/ipt-manage-system/api'

  export default {
    /** 将引入的组件作为子组件 */
    components: {
      IptTable, IptAdd, IptEdit, IptDetail
    },
    /** 在创建的时候进行初始化 */
    created: function () {
      this.init()
    },
    data: function () {
      return {
        /** 预定义搜索表单的初始值 */
        ecommerceLinksParams: {
          enterpriseName: '',
          timeStart: '',
          timeEnd: ''
        },
        // 下拉查询条件
//        types: [],
//        productKinds: [],
//        nodeTypes: [],
        /** 定义表格的配置 */
        ecommerceLinksTableConfig: {
          getApi: 'getEcommerceLinksTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "电商链接",                 // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '企业名称', data: 'enterpriseName'},
            {title: '企业网址', data: 'enterpriseUrl'},
            {title: '创建日期', data: 'createTime'}
          ]
        },
        // 复选框条件
        checkboxList: [],
        linksRecords: ''
      }
    },
    methods: {
      init: function () {
        /** 获取搜索参数的预定义数据，TODO 从后台接口获取 */
//        this.types = [{name: '行业动态', value: 1}, {name: '热点新闻', value: 2}, {name: '最新政策', value: 3}]
//        this.productKinds = [ { name: '猪头', value: 1 }, { name: '大蒜', value: 2 }, { name: '花生', value: 3 } ]
//        this.nodeTypes = [
//          { name: '屠宰节点', value: 1 }, { name: '批发节点', value: 2 }, { name: '农贸节点', value: 3 },
//          { name: '超市节点', value: 4 }, { name: '团体节点', value: 5 }
//        ]
        /** 获取表格分页数据 */
        this.getEcommerceLinksTableData(this.ecommerceLinksParams)
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      search() {
        this.getEcommerceLinksTableData(this.ecommerceLinksParams)
      },
      deleteBatchE() {
        var that = this
        if (this.checkboxList.length === 0) {
          this.$confirm('尚未选中条目，请选中后进行此操作!', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
        } else {
          this.$confirm('此操作将永久删除被选数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            Api.EcommerceLinks.deleteBatchECommerceLink(that.checkboxList).then((data) => {
            this.$message({
            type: 'success',
            message: '删除数据成功!'
          })
          /**更新表格分页数据 */
          this.getEcommerceLinksTableData(this.params)
        })
        })
        }
      },
      showBtn(columnData) {
          Api.EcommerceLinks.findECommerceLinkRecord(columnData.ecommerceLinkId).then((data) => {
            this.linksRecords = data.data
        })
      },
      updateBtn(columnData) {
        Api.EcommerceLinks.findECommerceLinkRecord(columnData.ecommerceLinkId).then((data) => {
          this.linksRecords = data.data
        })
      },
      deleteBtn(columnData) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.EcommerceLinks.deleteECommerceLinkRecord(columnData.ecommerceLinkId).then((data) => {
            this.$message({
            type: 'success',
            message: '删除' + JSON.stringify(columnData.enterpriseName) + '成功!'
            })
          this.getEcommerceLinksTableData(this.ecommerceLinksParams)
          })
      })
      },
      // 全选框
      checkAll(event) {
        var self = this
        if (!event.target.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.ecommerceLinksTableData.data.map(item => item.ecommerceLinkId)
        }
      },
      /** 获取请求数据的action */
      ...mapActions({
        getEcommerceLinksTableData: 'getEcommerceLinksTableData'
      })
    },
    /** 获取表格需要的数据 */
    computed: mapGetters({
      ecommerceLinksTableData: 'ecommerceLinksTableData'
    })
  }
</script>
<style>
  .choose-personnel input{
    display: inline-block;
  }
  .show-info{
    position: relative;
    display: inline-block;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
  .show-info p{
    position: absolute;
    top: 28px;
    left: 0;
    display: none;
    padding: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background: #31708f;
  }
  .show-info:hover p{
    display: inline-block;
  }
</style>
