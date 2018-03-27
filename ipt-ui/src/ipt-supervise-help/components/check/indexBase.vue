<template>
  <div class="main">
    <div>
      <div style="text-align:center;font-size: 26px;">
        <span>启用指标数：{{enabledNumber}}</span>
        <span>禁用指标数：{{forbiddenNumber}}</span>
      </div>
      <div class="shadow-boxs">
        <!--search 搜索框 组件-->
        <div class="r-search">
          <form class="form form-inline">
            <div class="form-group">
              <label>指标名称 </label>
              <input type="text" class="form-control search-01" placeholder="" v-model="params.eiName" name="eiName">
            </div>
            <div class="form-group">
              <label>指标类别</label>
              <select class="form-control search-01" v-model="params.examineTypeId">
                <option value="">全部</option>
                <option v-for="examineType in examineTypes"
                        :value="examineType.id">{{examineType.etName}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>指标状态</label>
              <select class="form-control search-01" v-model="params.eiState">
                <option value="">全部</option>
                <option v-for="examineIndexState in examineIndexStates"
                        :value="examineIndexState.value">{{examineIndexState.name}}
                </option>
              </select>
            </div>
            <div class="form-group my-group">
              <button type="button" class="btn btn-search" @click="search"> 查询</button>
              <button type="button" class="btn btn-reset" @click="reset"> 重置</button>
            </div>
          </form>
        </div>
      </div>
      <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
      <ipt-show id="js_show_modal" :examineIndexShow="examineIndexShow"></ipt-show>
      <ipt-edit id="js_edit_modal" :examineIndexEdit="examineIndexEdit" :params="params"></ipt-edit>
      <div class="shadow-boxs">
        <div class="col-lg-12">
          <ipt-table
            :tableData="indexBaseTableData"
            :tableConfig="getIndexBaseConfig"
            :params="params">
            <th slot="afterTitle">操作</th>
            <td slot="afterBody" slot-scope="scope">
              <a class="look-link" @click="showBtn(scope.columnData)" data-toggle="modal" data-target="#js_show_modal">查看</a>
              <a class="edit-link" @click="updateBtn(scope.columnData)" data-toggle="modal"
                 data-target="#js_edit_modal">编辑</a>
            </td>
          </ipt-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Api from '@/ipt-supervise-help/api'
  import CommonApi from '@/api'
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  /** 引入创建的弹窗组件 */
  import IptShow from "./examineIndexShow"
  import IptEdit from "./examineIndexEdit"
  export default {
    components: {
      IptTable, IptEdit, CommonApi, Api, IptShow
    },
    created() {
      this.init()
    },
    data() {
      return {
        params: {
          examineTypeId: '',
          eiState: '',
          eiName: ''
        },
        examineTypes: [],  //搜索条件：考核类别(下拉菜单)
        examineIndexStates: [],  //搜索条件：考核指标状态(下拉菜单)
        enabledNumber: 0,
        forbiddenNumber: 0,
        examineIndexShow: {},
        examineIndexEdit: {},
        examineIndex: {
          eiNo: '',
          eiName: '',
          examineTypeId: '',
          cateCode: '',
          nodeTypeNo: '',
          eiContent: '',
          settingNumber: '',
          eiState: '',
          examineType: {etName: ''},
          cate: {cateName: ''},
          nodeType: {nodeTypeName: ''}
        },
        getIndexBaseConfig: {
          getApi: 'getIndexBaseTableData',
          title: "",
          display: 10,
          pagegroup: 5,
          checkboxShow: false,
          sequenceShow: true,
          columns: [
            {title: '指标编号', data: 'eiNo'},
            {title: '指标名称', data: 'eiName'},
            {title: '指标类别', data: 'examineType.etName'},
            {title: '产品类别', data: 'cate.cateName'},
            {title: '流通节点类型', data: 'nodeType.nodeTypeName'},
            {title: '指标状态', data: 'indexStateStr'}
          ]
        }
      }
    },
    computed: mapGetters({
      indexBaseTableData: 'indexBaseTableData'
    }),
    watch: {
      indexBaseTableData() {
        let obj = this
        Api.ExamineManage.getIndexNumberCount().then((data) => { //启用指标数、禁用指标数
          obj.enabledNumber = data.data.enabledNumber
          obj.forbiddenNumber = data.data.forbiddenNumber
        })
      }
    },
    methods: {
      init() {
        let obj = this
        obj.examineIndexShow = obj.examineIndex
        obj.examineIndexEdit = obj.examineIndex
        CommonApi.EnumType.getExamineIndexState().then((data) => {  //考核指标状态
          obj.examineIndexStates = data.data
        })
        Api.ExamineType.getExamineTypeAll().then((data) => { //考核指标类别
          obj.examineTypes = data.data
        })
        Api.ExamineManage.getIndexNumberCount().then((data) => { //启用指标数、禁用指标数
          obj.enabledNumber = data.data.enabledNumber
          obj.forbiddenNumber = data.data.forbiddenNumber
        })
        obj.examineIndexShow = obj.examineIndex
        obj.examineIndexEdit = obj.examineIndex
        /** 获取表格分页数据 */
        obj.getIndexBaseTableData(this.params)
      },
      search() {
        this.getIndexBaseTableData(this.params)
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      showBtn(columnData) {
        Api.ExamineManage.findIndexBase(columnData.id).then((data) => {
          this.examineIndexShow = data.data
        })
      },
      updateBtn(columnData) {
        Api.ExamineManage.findIndexBase(columnData.id).then((data) => {
          this.examineIndexEdit = data.data
        })
      },
      /** 获取请求数据的action */
      ...mapActions({
        getIndexBaseTableData: 'getIndexBaseTableData'
      })
    }
  }
</script>


