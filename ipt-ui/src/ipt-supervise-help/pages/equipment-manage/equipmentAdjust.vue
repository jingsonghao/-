<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>设备管理</a></li>
      <li class="active jsh-active">设备调整管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>重要产品类别</label>
            <select class="form-control search-01" v-model="equipmentAdjustTableParams.cateCode">
              <option value="">全部</option>
              <option v-for="option in cateList" :value="option.cateCode">{{ option.cateName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>设备类别</label>
            <select class="form-control search-01" v-model="equipmentAdjustTableParams.equipmentTypeId" @change="getEquipmentModelList">
              <option value="">全部</option>
              <option v-for="option in equipmentTypeList" :value="option.equipmentTypeId">{{ option.equipmentTypeName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>设备型号</label>
            <select class="form-control search-01" v-model="equipmentAdjustTableParams.equipmentModelId">
              <option value="">全部</option>
              <option v-for="option in equipmentModelList" :value="option.equipmentModelId">{{ option.equipmentModelName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>设备编号</label>
            <input type="text" class="form-control search-01" placeholder="请输入设备编号" style="width: 150px;"
                   v-model="equipmentAdjustTableParams.equipmentCode">
          </div>
          <div class="form-group">
            <label>设备状态</label>
            <select class="form-control search-01" v-model="equipmentAdjustTableParams.equipmentStatus">
              <option value="">全部</option>
              <option v-for="option in equipmentStatusList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>调整日期</label>
            <el-date-picker v-model="equipmentAdjustTableParams.adjustDateMin" style="width: 140px;"
                            type="date" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="equipmentAdjustTableParams.adjustDateMax" style="width: 140px;"
                            type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" data-toggle="modal" data-target="#equipmentGrant"> 发放设备
            </button>
          </div>
        </form>
      </div>
    </div>
    <ipt-grant id="equipmentGrant" :equipmentAdjustTableParams="equipmentAdjustTableParams"></ipt-grant>
    <ipt-select id="equipmentSelect"></ipt-select>
    <ipt-view id="equipmentAdjustView" :viewParams="findParams"></ipt-view>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="equipmentAdjustTableData"
                   :tableConfig.sync="equipmentAdjustTableConfig"
                   :params="equipmentAdjustTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="viewBtn(scope.columnData)" data-toggle="modal" data-target="#equipmentAdjustView">查看</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptGrant from "@/ipt-supervise-help/components/equipment-manage/equipmentGrant.vue"
  import IptSelect from "@/ipt-supervise-help/components/equipment-manage/equipmentSelect.vue"
  import IptView from "@/ipt-supervise-help/components/equipment-manage/equipmentAdjustView.vue"
  import Api from '@/ipt-supervise-help/api'

  export default {
    components: {
      IptTable, IptGrant, IptSelect, IptView
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        equipmentAdjustTableParams: {
          cateCode: '',
          equipmentTypeId: '',
          equipmentModelId: '',
          equipmentCode: '',
          equipmentStatus: '',
          adjustDateMin: '',
          adjustDateMax: ''
        },
        equipmentAdjustTableConfig: {
          getApi: 'getEquipmentAdjustTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "设备调整管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '重要产品类别', data: 'cateName'},
            {title: '设备类别', data: 'equipmentTypeName'},
            {title: '设备型号', data: 'equipmentModelName'},
            {title: '设备编号', data: 'equipmentCode'},
            {title: '设备状态', data: 'equipmentStatusName'},
            {title: '调整日期', data: 'adjustDate'},
            {title: '操作人', data: 'operateUser'}
          ]
        },
        equipmentTypeList: [],
        equipmentModelList: [],
        cateList: [],
        equipmentStatusList: [],
        findParams: {}
      }
    },
    methods: {
      init: function () {
        this.initQueryList()
        this.getEquipmentAdjustTableData(this.equipmentAdjustTableParams)
      },
      reset: function () {
        let _this = this
        Object.assign(_this.$data.equipmentAdjustTableParams, _this.$options.data().equipmentAdjustTableParams)
        _this.initQueryList()
        _this.equipmentModelList = []
      },
      initQueryList: function () {
        let _this = this
        Api.EquipmentAdjust.getPageQueryList().then((data) => {
          _this.equipmentStatusList = data.data.equipmentStatusList
        })
        Api.EquipmentManage.getEquipmentTypeList().then((data) => {
          _this.equipmentTypeList = data.data
        })
        Api.EquipmentManage.getOneLevelCateList().then((data) => {
          _this.cateList = data.data
        })
      },
      getEquipmentModelList: function () {
        let _this = this
        if (_this.equipmentAdjustTableParams.equipmentTypeId) {
          Api.EquipmentManage.getEquipmentModelList(_this.equipmentAdjustTableParams.equipmentTypeId).then((data) => {
            _this.equipmentModelList = data.data
            _this.equipmentAdjustTableParams.equipmentModelId = ''
          })
        } else {
          _this.equipmentModelList = []
        }
      },
      search: function () {
        this.getEquipmentAdjustTableData(this.equipmentAdjustTableParams)
      },
      viewBtn: function (columnData) {
        let _this = this
        Api.EquipmentAdjust.findVOByEquipmentAdjustId(columnData.equipmentAdjustId).then((data) => {
          _this.findParams = data.data
        })
      },
      ...mapActions({
        getEquipmentAdjustTableData: 'getEquipmentAdjustTableData'
      })
    },
    computed: mapGetters({
      equipmentAdjustTableData: 'equipmentAdjustTableData'
    })
  }
</script>
