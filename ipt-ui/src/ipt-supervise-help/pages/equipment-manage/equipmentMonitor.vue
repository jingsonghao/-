<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>设备管理</a></li>
      <li class="active jsh-active">设备监控管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search search2">
        <form class="form form-inline">
          <div class="form-group">
            <label>使用企业编号</label>
            <input type="text" class="form-control search-01" placeholder="请输入企业编号" style="width: 150px;"
                   v-model="equipmentMonitorTableParams.enterpriseNo">
          </div>
          <div class="form-group">
            <label>使用企业名称</label>
            <input type="text" class="form-control search-01" placeholder="请输入企业名称" style="width: 150px;"
                   v-model="equipmentMonitorTableParams.enterpriseName">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search">查询</button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置</button>
          </div>
        </form>
      </div>
    </div>
    <ipt-view id="equipmentMonitorView" :enterpriseEquipmentList="enterpriseEquipmentList"></ipt-view>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="equipmentMonitorTableData" :tableConfig.sync="equipmentMonitorTableConfig"
                   :params="equipmentMonitorTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)" data-toggle="modal" data-target="#equipmentMonitorView">查看</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptView from "@/ipt-supervise-help/components/equipment-manage/equipmentMonitorView.vue"
  import Api from '@/ipt-supervise-help/api'

  export default {
    components: {
      IptTable, IptView
    },
    created() {
      this.init()
    },
    data() {
      return {
        equipmentMonitorTableParams: {
          enterpriseNo: '',
          enterpriseName: ''
        },
        equipmentMonitorTableConfig: {
          getApi: 'getEquipmentMonitorTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "设备监控管理",             // [可选] 表格标题，默认不显示标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '企业编号', data: 'enterpriseNo'},
            {title: '企业名称', data: 'enterpriseName'},
            {title: '设备数/个', data: 'equipmentNum'}
          ]
        },
        enterpriseEquipmentList: []
      }
    },
    computed: mapGetters({
      equipmentMonitorTableData: 'equipmentMonitorTableData'
    }),
    methods: {
      init: function () {
        this.getEquipmentMonitorTableData(this.equipmentMonitorTableParams)
      },
      search: function () {
        this.getEquipmentMonitorTableData(this.equipmentMonitorTableParams)
      },
      reset: function () {
        Object.assign(this.$data.equipmentMonitorTableParams, this.$options.data().equipmentMonitorTableParams)
      },
      showBtn: function (columnData) {
        let _this = this
        Api.EquipmentMonitor.findEquipmentByEnterpriseNo(columnData.enterpriseNo).then((data) => {
          _this.enterpriseEquipmentList = data.data
        })
      },
      ...mapActions({
        getEquipmentMonitorTableData: 'getEquipmentMonitorTableData'
      })
    }
  }
</script>


