<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>设备管理</a></li>
      <li class="active jsh-active">设备维护管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>重要产品类别</label>
            <select class="form-control search-01" v-model="equipmentRepairTableParams.cateCode">
              <option value="">全部</option>
              <option v-for="option in cateList" :value="option.cateCode">{{ option.cateName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>设备类别</label>
            <select class="form-control search-01" v-model="equipmentRepairTableParams.equipmentTypeId"
                    @change="getEquipmentModelList">
              <option value="">全部</option>
              <option v-for="option in equipmentTypeList" :value="option.equipmentTypeId">
                {{ option.equipmentTypeName}}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>设备型号</label>
            <select class="form-control search-01" v-model="equipmentRepairTableParams.equipmentModelId">
              <option value="">全部</option>
              <option v-for="option in equipmentModelList" :value="option.equipmentModelId">{{ option.equipmentModelName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>设备编号</label>
            <input type="text" class="form-control search-01" placeholder="请输入设备编号" style="width: 150px;"
                   v-model="equipmentRepairTableParams.equipmentCode">
          </div>
          <div class="form-group">
            <label>使用企业</label>
            <select class="form-control search-01" v-model="equipmentRepairTableParams.enterpriseNo">
              <option value="">全部</option>
              <option v-for="option in enterpriseList" :value="option.enterpriseNo">{{ option.enterpriseName }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>修理状态</label>
            <select class="form-control search-01" v-model="equipmentRepairTableParams.repairStatus">
              <option value="">全部</option>
              <option v-for="option in repairStatusList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>送还日期</label>
            <el-date-picker v-model="equipmentRepairTableParams.returnDateMin" style="width: 140px;"
                            type="date" placeholder="开始日期" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="equipmentRepairTableParams.returnDateMax" style="width: 140px;"
                            type="date" placeholder="结束日期" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" data-toggle="modal" data-target="#equipmentReturn"> 添加维护设备
            </button>
          </div>
        </form>
      </div>
    </div>
    <ipt-return id="equipmentReturn" :equipmentRepairTableParams="equipmentRepairTableParams"></ipt-return>
    <ipt-select id="equipmentReturnSelect"></ipt-select>
    <ipt-view id="equipmentRepairView" :viewParams="findParams"></ipt-view>
    <ipt-edit id="equipmentRepairEdit" :equipmentRepairTableParams="equipmentRepairTableParams"
              :editParams="findParams"></ipt-edit>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="equipmentRepairTableData"
                   :tableConfig.sync="equipmentRepairTableConfig"
                   :params="equipmentRepairTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="viewBtn(scope.columnData)" data-toggle="modal"
               data-target="#equipmentRepairView">查看</a>
            <a class="edit-link" v-if="scope.columnData.repairStatus == NOT_REPAIR.value"
               @click="repairBtn(scope.columnData)" data-toggle="modal" data-target="#equipmentRepairEdit">维护</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptReturn from "@/ipt-supervise-help/components/equipment-manage/equipmentReturn.vue"
  import IptSelect from "@/ipt-supervise-help/components/equipment-manage/equipmentReturnSelect.vue"
  import IptEdit from "@/ipt-supervise-help/components/equipment-manage/equipmentRepairEdit.vue"
  import IptView from "@/ipt-supervise-help/components/equipment-manage/equipmentRepairView.vue"
  import Api from '@/ipt-supervise-help/api'

  export default {
    components: {
      IptTable, IptSelect, IptReturn, IptEdit, IptView
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        equipmentRepairTableParams: {
          cateCode: '',
          equipmentTypeId: '',
          equipmentModelId: '',
          enterpriseNo: '',
          equipmentCode: '',
          repairStatus: '',
          returnDateMin: '',
          returnDateMax: ''
        },
        equipmentRepairTableConfig: {
          getApi: 'getEquipmentRepairTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "设备维护管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '重要产品类别', data: 'cateName'},
            {title: '设备类别', data: 'equipmentTypeName'},
            {title: '设备型号', data: 'equipmentModelName'},
            {title: '设备编号', data: 'equipmentCode'},
            {title: '使用企业', data: 'enterpriseName'},
            {title: '修理状态', data: 'repairStatusName'},
            {title: '送还日期', data: 'returnDate'},
            {title: '维护日期', data: 'repairDate'}
          ]
        },
        equipmentTypeList: [],
        equipmentModelList: [],
        enterpriseList: [],
        cateList: [],
        repairStatusList: [],
        findParams: {},
        NOT_REPAIR: []
      }
    },
    methods: {
      init: function () {
        this.initQueryList()
        this.getEquipmentRepairTableData(this.equipmentRepairTableParams)
      },
      reset: function () {
        Object.assign(this.$data.equipmentRepairTableParams, this.$options.data().equipmentRepairTableParams)
        this.initQueryList()
      },
      initQueryList: function () {
        let _this = this
        Api.EquipmentRepair.getPageQueryList().then((data) => {
          _this.repairStatusList = data.data.repairStatusList
          _this.NOT_REPAIR = data.data.NOT_REPAIR
        })
        Api.EquipmentManage.getEquipmentTypeList().then((data) => {
          _this.equipmentTypeList = data.data
        })
        Api.EquipmentManage.getOneLevelCateList().then((data) => {
          _this.cateList = data.data
        })
        Api.EquipmentAdjust.getAllUseEnterpriseList().then((data) => {
          _this.enterpriseList = data.data
        })
      },
      getEquipmentModelList: function () {
        let _this = this
        if (_this.equipmentRepairTableParams.equipmentTypeId) {
          Api.EquipmentManage.getEquipmentModelList(_this.equipmentRepairTableParams.equipmentTypeId).then((data) => {
            _this.equipmentModelList = data.data
            _this.equipmentRepairTableParams.equipmentModelId = ''
          })
        } else {
          _this.equipmentModelList = []
        }
      },
      search: function () {
        this.getEquipmentRepairTableData(this.equipmentRepairTableParams)
      },
      viewBtn: function (columnData) {
        let _this = this
        Api.EquipmentRepair.findVOByEquipmentRepairId(columnData.equipmentRepairId).then((data) => {
          _this.findParams = data.data
        })
      },
      repairBtn: function (columnData) {
        let _this = this
        Api.EquipmentRepair.findByEquipmentRepairId(columnData.equipmentRepairId).then((data) => {
          _this.findParams = data.data
        })
      },
      ...mapActions({
        getEquipmentRepairTableData: 'getEquipmentRepairTableData'
      })
    },
    computed: mapGetters({
      equipmentRepairTableData: 'equipmentRepairTableData'
    })
  }
</script>
