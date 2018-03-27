<template>
    <div>
      <ol class="breadcrumb">
        <li><a>监管辅助系统</a></li>
        <li><a>应急事件管理</a></li>
        <li class="active jsh-active">应急预案管理</li>
      </ol>
      <div class="main">
        <div class="shadow-boxs">
          <!--search 搜索框 组件-->
          <div class="r-search search2">
            <form class="form form-inline">
              <div class="form-group">
                <label>应急预案名称</label>
                <input type="text" class="form-control search-01" placeholder=""
                       v-model="params.planName">
                <label>应急预案主题</label>
                <input type="text" class="form-control search-01" placeholder=""
                       v-model="params.theme">
              </div>
              <div class="form-group my-group">
                <button type="button" class="btn btn-reset" @click="reset"> 重置</button>
                <button type="button" class="btn btn-search" @click="search"> 查询</button>
                <button type="button" class="btn btn-reset1" data-toggle="modal" data-target="#js_add_modal"> 新增
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- 弹窗 -->
        <ipt-add id="js_add_modal" :params="params"></ipt-add>
        <ipt-view id="js_show_modal" :singleData="singleData"></ipt-view>
        <ipt-edit id="js_edit_modal" :singleData="singleData" :params="params"></ipt-edit>
        <div class="shadow-boxs">
          <div class="col-lg-12">
            <!-- [表格] -->
            <ipt-table :tableData="emergencyPlanTableData"
                       :tableConfig="tableConfig"
                       :params="params">
              <th slot="afterTitle">操作</th>
              <td slot="afterBody" slot-scope="scope">
                <a class="look-link" @click="getOne(scope.columnData)" data-toggle="modal" data-target="#js_show_modal">查看</a>
                <a class="edit-link" @click="getOne(scope.columnData)" data-toggle="modal" data-target="#js_edit_modal">编辑</a>
                <a class="delete-link" @click="deleteBtn(scope.columnData)">删除</a>
              </td>
            </ipt-table>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  /** 引入表格组件 */
  import IptTable from "@/components/common/table"
  /** 引入创建的弹窗组件 */
  import IptAdd from "@/ipt-supervise-help/components/emergency-events/emergencyPlanAdd.vue"
  import IptEdit from "@/ipt-supervise-help/components/emergency-events/emergencyPlanEdit.vue"
  import IptView from "@/ipt-supervise-help/components/emergency-events/emergencyPlanView.vue"
  import Api from '@/ipt-supervise-help/api'

  export default {
    components: {
      IptTable, IptAdd, IptEdit, IptView
    },
    created: function () {
      this.init()
    },
    data() {
      return {
        /** 预定义搜索表单的初始值 */
        params: {
          planName: '',
          theme: ''
        },
        types: [],
        /** 定义表格的配置 */
        tableConfig: {
          getApi: 'getEmergencyPlanTableData',  // #必须# 数据的的请求Vuex的Action名
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '应急预案名称', data: 'planName'},
            {title: '应急预案主题 ', data: 'theme'},
            {title: '创建时间', data: 'createDate'},
            {title: '最后修改时间 ', data: 'uploadDate'}
          ]
        },
        singleData: {}
      }
    },
    methods: {
      init() {
        this.getEmergencyPlanTableData(this.params)
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      search() {
        this.getEmergencyPlanTableData(this.params)
      },
      getOne(columnData) {
        Api.EmergencyPlan.getOne(columnData.planId).then((data) => {
          this.singleData = data.data
        })
      },
      deleteBtn(columnData) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.EmergencyPlan.deleteOne(columnData.planId).then((data) => {
            this.$message({ type: 'success', message: data.msg })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this.getEmergencyPlanTableData(this.params)
          })
        })
      },
      /** 获取请求数据的action */
      ...mapActions({
        getEmergencyPlanTableData: 'getEmergencyPlanTableData'
      })
    },
    /** 获取表格需要的数据 */
    computed: mapGetters({
      emergencyPlanTableData: 'emergencyPlanTableData'
    })
  }
</script>

<style>

</style>
