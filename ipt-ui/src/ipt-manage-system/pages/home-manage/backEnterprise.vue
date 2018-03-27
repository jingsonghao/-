<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>门户管理</a></li>
      <li class="active jsh-active">追溯企业</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>企业名称</label>
            <input type="text" name="enterpriseName" v-model="backEnterpriseParams.enterpriseName" class="form-control search-01" placeholder="">
          </div>
          <div class="form-group">
            <!--双日历插件-->
            <label>提交日期</label>
            <el-date-picker v-model="backEnterpriseParams.startTime" type="datetime" placeholder="开始日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="backEnterpriseParams.endTime" type="datetime" placeholder="结束日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
           </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="reset" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" data-toggle="modal" data-target="#backEnterpriseAdd"> 新增 </button>
          </div>
        </form>
      </div>
    </div>
    <!--search 组件 end-->

    <!--table 组件 start-->
    <div class="shadow-boxs">
      <div class="col-lg-12">

        <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
        <ipt-add id="backEnterpriseAdd" :paramsParent="backEnterpriseParams" :enterpriseTypeEnum="backEnterpriseTableData.enterpriseTypeEnum"></ipt-add>
        <ipt-detail id="backEnterpriseDetail" :backEnterpriseRecord="backEnterpriseRecord"></ipt-detail>
        <ipt-edit id="backEnterpriseEdit" :params="backEnterpriseParams" :editRecord="backEnterpriseRecord" :enterpriseTypeEnum="backEnterpriseTableData.enterpriseTypeEnum"></ipt-edit>
        <!-- [表格] -->
        <!--  1. tableData：请求接口得到的表格的数据 -->
        <!--  2. tableConfig：表格的预定义配置 -->
        <!--  3. [可选]params：搜索框的请求参数 -->
        <!--  4. [可选]使用插槽扩展表格，##标题+内容同时使用## -->
        <!--     使用scope可以获取子组件的数据 -->
        <!--     标题/列之前[beforeTitle+beforeBody] -->
        <!--     标题/列之后[afterTitle+afterBody] -->
        <ipt-table :tableData="backEnterpriseTableData"
                   :tableConfig="backEnterpriseTableConfig"
                   :params="backEnterpriseParams">
          <!-- 表格插槽 复选框-->
          <!--<th slot="beforeTitle">-->
            <!--&lt;!&ndash; 全选框 &ndash;&gt;-->
            <!--<input type="checkbox" @click="checkAll">-->
          <!--</th>-->
          <!--&lt;!&ndash; 表格复选框 &ndash;&gt;-->
          <!--<td slot="beforeBody" slot-scope="scope">-->
            <!--<input type="checkbox" v-model="checkboxList" :value="scope.columnData.awardEnterpriseId">-->
          <!--</td>-->
          <!-- 表格操作按钮 -->
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)" data-toggle="modal" data-target="#backEnterpriseDetail">查看</a>
            <a class="edit-link" @click="updateBtn(scope.columnData)" data-toggle="modal" data-target="#backEnterpriseEdit">编辑</a>
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
  import IptAdd from "@/ipt-manage-system/components/home-manage/backEnterprise/backEnterpriseAdd"
  import IptDetail from "@/ipt-manage-system/components/home-manage/backEnterprise/backEnterpriseDetail"
  import IptEdit from "@/ipt-manage-system/components/home-manage/backEnterprise/backEnterpriseEdit"
  import Api from '@/ipt-manage-system/api'

  export default {
    /** 将引入的组件作为子组件 */
    components: {
      IptTable, IptAdd, IptDetail, IptEdit
    },
    /** 在创建的时候进行初始化 */
    created: function () {
      this.init()
    },
    data: function () {
      return {
        /** 预定义搜索表单的初始值 */
        backEnterpriseParams: {
          enterpriseName: '',
          startTime: '',
          endTime: ''
        },
        // 下拉查询条件
//        types: [],
//        productKinds: [],
//        nodeTypes: [],
        /** 定义表格的配置 */
        backEnterpriseTableConfig: {
          getApi: 'getBackEnterpriseTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "追溯企业",                 // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '企业名称', data: 'enterpriseName'},
            {title: '企业介绍', data: 'introduce'},
            {title: '时间', data: 'createTime'}
          ]
        },
        backEnterpriseRecord: {
          enterpriseTypeName: ''
        },
        // 复选框条件
        checkboxList: []
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
        this.getBackEnterpriseTableData(this.backEnterpriseParams)
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      search: function () {
        this.getBackEnterpriseTableData(this.backEnterpriseParams)
      },
      showBtn: function (columnData) {
        Api.BackEnterprise.findBackEnterpriseRecord(columnData.awardEnterpriseId).then((data) => {
          this.backEnterpriseRecord = data.data
          if (data.data.enterpriseType === 0) {
            this.backEnterpriseRecord.enterpriseTypeName = "种养殖企业"
          }
          if (data.data.enterpriseType === 1) {
            this.backEnterpriseRecord.enterpriseTypeName = "超市单位"
          }
          if (data.data.enterpriseType === 2) {
            this.backEnterpriseRecord.enterpriseTypeName = "团销单位"
          }
          if (data.data.enterpriseType === 3) {
            this.backEnterpriseRecord.enterpriseTypeName = "特色企业"
          }
        })
        console.log("-----------------------------------------------------------------")
        console.log(this.backEnterpriseRecord)
      },
      updateBtn: function (columnData) {
        Api.BackEnterprise.findBackEnterpriseRecord(columnData.awardEnterpriseId).then((data) => {
          this.backEnterpriseRecord = data.data
        })
      },
      deleteBtn: function (columnData) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            Api.BackEnterprise.deleteBackEnterpriseRecord(columnData.awardEnterpriseId).then((data) => {
              this.$message({
              type: 'success',
              message: '删除' + JSON.stringify(columnData.enterpriseName) + '成功!'
            })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this.getBackEnterpriseTableData(this.backEnterpriseParams)
          })
        })
      },
      // 全选框
      checkAll: function (event) {
        console.log(event)
        var self = this
        if (!event.target.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.backEnterpriseTableData.data.map(item => item.awardEnterpriseId)
          console.log(self.checkboxList)
        }
      },
      /** 获取请求数据的action */
      ...mapActions({
        getBackEnterpriseTableData: 'getBackEnterpriseTableData'
      })
    },
    /** 获取表格需要的数据 */
    computed: mapGetters({
      backEnterpriseTableData: 'backEnterpriseTableData'
    })
  }
</script>
