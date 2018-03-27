<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>企业诚信管理</a></li>
      <li class="active jsh-active">诚信行为记录</li>
    </ol>
    <!--search 组件-->
    <div class="shadow-boxs">
      <!--search 搜索框 组件-->
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>企业名称</label>
            <input type="text" class="form-control search-01" placeholder="" v-model="params.enterpriseName" name="enterpriseName" >
            <!--<label>重要产品类别</label>
              <select class="form-control search-01" v-model="params.enterpriseType">
                <option selected>全部</option>
                <option v-for="option in enterpriseTypes" :value="option.value">{{ option.name }}</option>
            </select>-->
          </div>
          <div class="form-group my-group">
            <!--<button type="button" class="btn btn-reset1" data-toggle="modal" data-target="#js_add_modal"> 新增</button>-->
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
          </div>
        </form>
      </div>
    </div>
    <ipt-create id="js_add_modal" :params="params"></ipt-create>
    <ipt-edit id="js_edit_modal" :creditArchives="creditArchives" :params="params"></ipt-edit>
    <!--table 组件-->
    <!--这里的配置可以好决定列表显示获取的参数 integrityRecordTableData-->
    <div class="shadow-boxs">
      <ipt-table
        :tableData="integrityRecordTableData"
        :tableConfig="tableConfig"
        :params="params">
        <!--<th slot="afterTitle">操作</th>
        <td slot="afterBody" slot-scope="scope">
          <a href="javascript:;" class="edit-link" @click="updateBtn(scope.columnData)" data-toggle="modal" data-target="#js_edit_modal">编辑</a>
          <a href="javascript:;" class="delete-link" @click="deleteBtn(scope.columnData)">删除</a>
        </td>-->
      </ipt-table>
    </div>
  </div>
</template>
<script>
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import { mapGetters, mapActions } from 'vuex'
  /** Zhao Yun 2017/11/16 引入表格组件 */
  import IptTable from "@/components/common/table"
  /** Zhao Yun 2017/11/16 引入创建的弹窗组件 */
  import IptCreate from "./create"
  import IptEdit from "./edit"
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-supervise-help/api'
  export default {
    /** Zhao Yun 2017/11/16 将引入的组件作为子组件 */
    components: {
      IptTable, IptCreate, IptEdit
    },
    /** Zhao Yun 2017/11/16 在创建的时候进行初始化 */
    created() {
      this.init()
    },
    data() {
      return {
        /** Zhao Yun 2017/11/16 预定义搜索表单的初始值 */
        params: {
          enterpriseName:'',
          enterpriseTypes: []
        },
        enterpriseTypes: [],
        tableConfig: {
          getApi: 'getIntegrityRecordTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "",                              // [可选] 表格标题，默认不显示标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 10,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: false,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            { title: '排名', data: 'honestyRecordsId' },
            { title: '企业名称', data: 'enterpriseName' },
            { title: '诚信类型', data: 'honestyType.htName' },
            { title: '行为描述', data: 'describe' },
            { title: '添加日期', data: 'addDate' }
          ]
        },
        checkboxList: [],
        creditArchives: ''
      }
    },
    computed: mapGetters({
      /*这里的配置也影响参数显示*/
      integrityRecordTableData: 'integrityRecordTableData',
      honestyTypeEnumDate: 'honestyTypeEnumDate',
      enterpriseInfoEnumDate: 'enterpriseInfoEnumDate'
    }),
    methods: {
      init() {
        this.enterpriseTypes = [
          {name: '屠宰节点', value: 1}, {name: '批发节点', value: 2}, {name: '农贸节点', value: 3},
          {name: '超市节点', value: 4}, {name: '团体节点', value: 5}
        ]
        this.getIntegrityRecordTableData(this.params)
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      search() {
        this.getIntegrityRecordTableData(this.params)
      },
      showBtn(columnData) {
        alert('查看' + JSON.stringify(columnData))
      },
      updateBtn(columnData) {
        Api.CreditArchives.findCreditArchives(columnData.honestyRecordsId).then((data) => {
          this.creditArchives = data.data
      })
      },
      deleteBtn(columnData) {
        this.$confirm('是否删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.CreditArchives.deleteCreditArchives(columnData.honestyRecordsId).then((data) => {
          this.$message({
          type: 'success',
          message: '操作成功!'
        })
        /** yanggang 2017/12/4 更新表格分页数据 */
        this.getIntegrityRecordTableData(this.params)
      })
      })
      },
    /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getIntegrityRecordTableData: 'getIntegrityRecordTableData',
        getHonestyTypeEnumDate:'getHonestyTypeEnumDate',
        getEnterpriseInfoEnumDate: 'getEnterpriseInfoEnumDate'
      })
  }
  }
</script>
