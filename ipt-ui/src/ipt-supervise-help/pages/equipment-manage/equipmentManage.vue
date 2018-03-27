<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>设备管理</a></li>
      <li class="active jsh-active">设备入库管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>重要产品类别</label>
            <select class="form-control search-01" v-model="equipmentTableParams.cateCode">
              <option value="">全部</option>
              <option v-for="option in cateList" :value="option.cateCode">{{ option.cateName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>设备类别</label>
            <select class="form-control search-01" v-model="equipmentTableParams.equipmentTypeId"
                    @change="getEquipmentModelList">
              <option value="">全部</option>
              <option v-for="option in equipmentTypeList" :value="option.equipmentTypeId">
                {{ option.equipmentTypeName}}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>设备型号</label>
            <select class="form-control search-01" v-model="equipmentTableParams.equipmentModelId">
              <option value="">全部</option>
              <option v-for="option in equipmentModelList" :value="option.equipmentModelId">{{ option.equipmentModelName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>设备编号</label>
            <input type="text" class="form-control search-01" placeholder="请输入设备编号" style="width: 150px;"
                   v-model="equipmentTableParams.equipmentCode">
          </div>
          <div class="form-group">
            <label>设备状态</label>
            <select class="form-control search-01" v-model="equipmentTableParams.equipmentStatus">
              <option value="">全部</option>
              <option v-for="option in equipmentStatusList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>修理状态</label>
            <select class="form-control search-01" v-model="equipmentTableParams.repairStatus">
              <option value="">全部</option>
              <option v-for="option in repairStatusList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>入库日期</label>
            <el-date-picker v-model="equipmentTableParams.inStorageDateMin" style="width: 140px;"
                            type="date" placeholder="开始日期" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="equipmentTableParams.inStorageDateMax" style="width: 140px;"
                            type="date" placeholder="结束日期" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" data-toggle="modal"
                    data-target="#equipmentAdd"> 添加设备
            </button>
            <router-link :to="'/manageSystem/systemSet/equipmentType'">
              <button type="button" class="btn btn-reset">设备类别管理</button>
            </router-link>
            <router-link :to="'/manageSystem/systemSet/equipmentModel'">
              <button type="button" class="btn btn-reset">设备型号管理</button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
    <ipt-add id="equipmentAdd" :equipmentTableParams="equipmentTableParams"></ipt-add>
    <!--<ipt-edit id="equipmentEdit" :equipmentTableParams="equipmentTableParams" :editParams="findParams"></ipt-edit>-->
    <ipt-view id="equipmentView" :viewParams="findParams"></ipt-view>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="equipmentTableData"
                   :tableConfig.sync="equipmentTableConfig"
                   :params="equipmentTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="viewBtn(scope.columnData)"
               data-toggle="modal" data-target="#equipmentView">查看</a>
            <!--<a class="edit" @click="editBtn(scope.columnData)" data-toggle="modal" data-target="#equipmentEdit"-->
            <!--v-if="scope.columnData.equipmentStatus == IN_STORAGE.value">编辑</a>-->
            <a class="delete-link" @click="deleteBtn(scope.columnData)" v-if="scope.columnData.equipmentStatus == IN_STORAGE.value ||
            (scope.columnData.equipmentStatus == RETURN_REPAIR.value && scope.columnData.repairStatus == SCRAP.value)">删除</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptAdd from "@/ipt-supervise-help/components/equipment-manage/equipmentAdd.vue"
  //  import IptEdit from "@/ipt-supervise-help/components/equipment-manage/equipmentEdit.vue"
  import IptView from "@/ipt-supervise-help/components/equipment-manage/equipmentView.vue"
  import Api from '@/ipt-supervise-help/api'

  export default {
    components: {
      IptTable,
      IptAdd,
      IptView
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        equipmentTableParams: {
          cateCode: '',
          equipmentTypeId: '',
          equipmentModelId: '',
          equipmentCode: '',
          equipmentStatus: '',
          repairStatus: '',
          inStorageDateMin: '',
          inStorageDateMax: ''
        },
        equipmentTableConfig: {
          getApi: 'getEquipmentTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "设备入库管理",             // [可选] 表格标题，默认不显示标题
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
            {title: '修理状态', data: 'repairStatusName'},
            {title: '入库日期', data: 'inStorageDate'}
          ]
        },
        equipmentTypeList: [],
        equipmentModelList: [],
        cateList: [],
        equipmentStatusList: [],
        IN_STORAGE: {},
        GRANT: {},
        RETURN_REPAIR: {},
        repairStatusList: [],
        NOT_REPAIR: {},
        REPAIRED: {},
        SCRAP: {},
        findParams: {}
      }
    },
    methods: {
      init: function () {
        this.initQueryList()
        this.getEquipmentTableData(this.equipmentTableParams)
      },
      reset: function () {
        let _this = this
        Object.assign(_this.$data.equipmentTableParams, _this.$options.data().equipmentTableParams)
        _this.initQueryList()
        _this.equipmentModelList = []
      },
      initQueryList: function () {
        let _this = this
        Api.EquipmentManage.getPageQueryList().then((data) => {
          _this.equipmentStatusList = data.data.equipmentStatusList
          _this.IN_STORAGE = data.data.IN_STORAGE
          _this.GRANT = data.data.GRANT
          _this.RETURN_REPAIR = data.data.RETURN_REPAIR
          _this.repairStatusList = data.data.repairStatusList
          _this.NOT_REPAIR = data.data.NOT_REPAIR
          _this.REPAIRED = data.data.REPAIRED
          _this.SCRAP = data.data.SCRAP
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
        if (_this.equipmentTableParams.equipmentTypeId) {
          Api.EquipmentManage.getEquipmentModelList(_this.equipmentTableParams.equipmentTypeId).then((data) => {
            _this.equipmentModelList = data.data
            _this.equipmentTableParams.equipmentModelId = ''
          })
        } else {
          _this.equipmentModelList = []
        }
      },
      search: function () {
        this.getEquipmentTableData(this.equipmentTableParams)
      },
//      editBtn: function (columnData) {
//        let _this = this
//        Api.EquipmentManage.findByEquipmentId(columnData.equipmentId).then((data) => {
//          _this.findParams = data.data
//        })
//      },
      deleteBtn: function (columnData) {
        let _this = this
        _this.$confirm('删除【' + JSON.stringify(columnData.equipmentCode) + '】设备 将级联删除设备调整、维护、监控记录 确认删除吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.EquipmentManage.deleteEquipment(columnData.equipmentId).then((data) => {
            _this.$message({
              type: 'success',
              message: '删除【' + JSON.stringify(columnData.equipmentCode) + '】设备成功!'
            })
            _this.getEquipmentTableData(_this.equipmentTableParams)
          })
        })
      },
      viewBtn: function (columnData) {
        let _this = this
        Api.EquipmentManage.findByEquipmentId(columnData.equipmentId).then((data) => {
          _this.findParams = data.data
        })
      },
      ...mapActions({
        getEquipmentTableData: 'getEquipmentTableData'
      })
    },
    computed: mapGetters({
      equipmentTableData: 'equipmentTableData'
    })
  }
</script>
