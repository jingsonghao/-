<template>
  <div>
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>跨城市应急事件管理</a></li>
      <li class="active jsh-active">跨城市应急事件报告</li>
    </ol>
    <div class="main">
      <!-- [搜索框] -->
      <!--  1. 在Vue data中预先定义所有表单model的初始值 -->
      <!--  2. 表单中预定义的数据(比如下拉选的可选值)，使用接口获取数据 -->
      <!--  3. 所有表单model的初始值需要作为一个整体对象传递给table组件作为分页的请求参数 -->
      <!--search 组件-->
      <div class="shadow-boxs">
        <!--search 搜索框 组件-->
        <div class="r-search search2">
          <form class="form form-inline">
            <div class="form-group">
              <label>流通节点类型 </label>
              <el-select v-model="params.nodeTypeNo"
                         filterable placeholder="请选择" @change="getEnterprises">
                <el-option key="" label="全部" value=""></el-option>
                <el-option
                  v-for="item in nodeTypes"
                  :key="item.nodeTypeNo"
                  :label="item.nodeTypeName"
                  :value="item.nodeTypeNo">
                </el-option>
              </el-select>
              <label>企业名称 </label>
              <el-select v-model="params.enterpriseNo" filterable placeholder="请选择">
                <el-option key="" label="全部" value=""></el-option>
                <el-option
                  v-for="item in enterprises"
                  :key="item.enterpriseNo"
                  :label="item.enterpriseName"
                  :value="item.enterpriseNo">
                </el-option>
              </el-select>
            </div>
            <div class="form-group">
              <!--双日历插件-->
              <label>上报时间</label>
              <div class="input-prepend input-group">
                <el-date-picker v-model="params.startTime" type="datetime"
                                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择开始时间">
                </el-date-picker>
              </div>
              <label>—</label>
              <div class="input-prepend input-group">
                <el-date-picker v-model="params.endTime" type="datetime"
                                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择结束时间">
                </el-date-picker>
              </div>
            </div>
            <div class="form-group">
              <label>应急事件状态 </label>
              <el-select v-model="params.eventState" filterable placeholder="请选择">
                <el-option key="" label="全部" value=""></el-option>
                <el-option
                  v-for="item in eventStates"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="form-group my-group">
              <button type="button" class="btn btn-reset" @click="reset">重置</button>
              <button type="button" class="btn btn-search" @click="search">查询</button>
            </div>
          </form>
        </div>
      </div>
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
            :tableData="emergencyCityHandleList"
            :tableConfig="cityEmsDealConfig"
            :params="params">
            <th slot="afterTitle">操作</th>
            <td slot="afterBody" slot-scope="scope">
              <a class="look-link" @click="viewReport(scope.columnData)">查看</a>
            </td>
          </ipt-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapGetters, mapActions} from 'vuex'
  /** Zhao Yun 2017/11/16 引入表格组件 */
  import IptTable from "@/components/common/table"
  /** Zhao Yun 2017/11/17 引入API接口 */
  import TraceBackApi from '@/ipt-trace-back/api'
  import CommonApi from '@/api'
  /** Zhao Yun 2017/11/16 弹窗组件 */
  import IptView from "@/ipt-supervise-help/components/emergency-events-city/emergencyPlanView.vue"

  export default {
    /** Zhao Yun 2017/11/16 将引入的组件作为子组件 */
    components: {
      IptTable, IptView
    },
    /** Zhao Yun 2017/11/16 在创建的时候进行初始化 */
    created() {
      this.init()
    },
    data() {
      return {
        /** Zhao Yun 2017/11/16 预定义搜索表单的初始值 */
        params: {
          startTime: '',
          endTime: '',
          enterpriseNo: '',
          nodeTypeNo: ''
        },
        /** Zhao Yun 2017/11/16 定义表格的配置 */
        cityEmsDealConfig: {
          getApi: 'getEmergencyCityHandleTableData',  // #必须# 数据的的请求Vuex的Action名
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '来源城市', data: 'sourceCity'},
            {title: '应急事件报告名称', data: 'emergencyName'},
            {title: '应急信息上报时间', data: 'createDate'},
            {title: '上报人', data: 'name'},
            {title: '流通节点类型', data: 'nodeType.nodeTypeName'},
            {title: '企业名称', data: 'enterpriseInfo.enterpriseName'},
            {title: '应急事件状态', data: 'eventStateName'}
          ]
        },
        nodeTypes: [],
        enterprises: [],
        eventStates: [],
        singleData: {}
      }
    },
    methods: {
      init() {
        /** Zhao Yun 2017/11/16 获取表格分页数据 */
        this.getEmergencyCityHandleTableData(this.params)
        CommonApi.EnumType.getBusinessTypes({}).then(data => {
          CommonApi.EnumType.getNodeTypes({ businessTypes: data.data.map(item => item.value).join() }).then(nestedData => {
            this.nodeTypes = nestedData.data
          })
        })
        CommonApi.EnumType.getEventStates({}).then(data => {
          this.eventStates = data.data
        })
        this.getEnterprises()
      },
      getEnterprises() {
        TraceBackApi.SubjectInfo.getNodeRecordList({
          size: -1,
          nodeTypeNo: this.params.nodeTypeNo
        }).then(data => {
          this.enterprises = data.data
        })
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      search() {
        this.getEmergencyCityHandleTableData(this.params)
      },
      viewReport(columnData) {
        this.$router.push({
          path: `/superviseHelp/emergencyPlanReport/emergencyRecordView`,
          query: {id: columnData.crossCityEmergencyId}
        })
      },
      ...mapActions({
        getEmergencyCityHandleTableData: 'getEmergencyCityHandleTableData'
      })
    },
    computed: mapGetters({
      emergencyCityHandleList: 'emergencyCityHandleList'
    })
  }
</script>
<style>
</style>
