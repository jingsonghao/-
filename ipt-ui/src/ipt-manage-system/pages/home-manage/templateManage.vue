<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>门户管理</a></li>
      <li class="active jsh-active">模板管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>模板名称</label>
            <input type="text" name="enterpriseName" v-model="params.templateName" class="form-control search-01"
                   placeholder="">
          </div>
          <div class="form-group">
            <label>模板类型</label>
            <el-select v-model="params.templateType" name="templateType" filterable placeholder="请选择">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in templateTypeEnums"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="reset" class="btn btn-dange btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" data-toggle="modal" data-target="#js_add_modal"> 新增 </button>
          </div>
        </form>
      </div>
    </div>
    <!--table 组件 start-->
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <!-- [弹窗]引入弹窗，指定id与触发按钮关联 -->
        <ipt-add id="js_add_modal" :params="params"></ipt-add>
        <ipt-edit id="js_edit_modal" :params="params" :singleData="singleData"></ipt-edit>
        <ipt-table
          :tableData="tableData"
          :tableConfig="tableConfig"
          :params="params">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="edit-link" @click="updateBtn(scope.columnData)" data-toggle="modal" data-target="#js_edit_modal">编辑</a>
            <!--<a class="delete-link" @click="deleteBtn(scope.columnData)">删除</a>-->
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
  import IptAdd from "@/ipt-manage-system/components/home-manage/template/create"
  import IptEdit from "@/ipt-manage-system/components/home-manage/template/edit"
  import Api from '@/ipt-manage-system/api'

  export default {
    /** 将引入的组件作为子组件 */
    components: {
      IptTable, IptAdd, IptEdit
    },
    /** 在创建的时候进行初始化 */
    created () {
      this.init()
    },
    data () {
      return {
        /** 预定义搜索表单的初始值 */
        params: {
          templateName: '',
          templateType: ''
        },
        /** 定义表格的配置 */
        tableConfig: {
          getApi: 'getTemplateManageTableData',  // #必须# 数据的的请求Vuex的Action名
          display: 10,                           // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                          // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                    // [可选] 是否显示序号
          columns: [                             // [必须] 表格每列取JSON数据的哪个值
            {title: '模板名称', data: 'templateName'},
            {title: '模板类型', data: 'templateTypeEnum.name'},
            {title: '模板路径', data: 'templatePath'},
            {title: '模板内容', data: 'templateContent'}
          ]
        },
        // 复选框条件
        checkboxList: [],
        singleData: ''
      }
    },
    methods: {
      init () {
        /** 获取表格分页数据 */
        this.getTemplateManageTableData(this.params)
        this.findTemplateTypeEnums()
      },
      reset () {
        Object.assign(this.$data, this.$options.data())
      },
      search () {
        this.getTemplateManageTableData(this.params)
      },
      updateBtn (columnData) {
        this.singleData = columnData
      },
      deleteBtn (columnData) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.TemplateManage.deleteOne(columnData.templateId).then((data) => {
            this.$message({
              type: 'success',
              message: '删除' + JSON.stringify(columnData.enterpriseName) + '成功!'
            })
            this.getTemplateManageTableData(this.params)
          })
        })
      },
      /** 获取请求数据的action */
      ...mapActions({
        getTemplateManageTableData: 'getTemplateManageTableData',
        findTemplateTypeEnums: 'findTemplateTypeEnums'
      })
    },
    /** 获取表格需要的数据 */
    computed: mapGetters({
      tableData: 'templateManageTableData',
      templateTypeEnums: 'templateTypeEnums'
    })
  }
</script>
<style>
</style>
