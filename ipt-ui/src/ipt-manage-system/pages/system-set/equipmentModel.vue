<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>系统设置</a></li>
      <li class="active jsh-active">设备型号管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline" id="query-form">
          <div class="form-group">
            <label>设备类别</label>
            <select class="form-control search-01" v-model="equipmentModelTableParams.equipmentTypeId">
              <option value="">全部</option>
              <option v-for="option in equipmentTypeList" :value="option.equipmentTypeId">{{ option.equipmentTypeName }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>设备型号</label>
            <input type="text" class="form-control search-01" placeholder="请输入设备型号" style="width: 150px;"
                   v-model="equipmentModelTableParams.equipmentModelName">
          </div>
          <div class="form-group">
            <label>厂商名称</label>
            <input type="text" class="form-control search-01" placeholder="请输入厂商名称" style="width: 150px;"
                   v-model="equipmentModelTableParams.manufacturerName">
          </div>
          <div class="form-group">
            <label>设备参数</label>
            <input type="text" class="form-control search-01" placeholder="请输入设备参数" style="width: 150px;"
                   v-model="equipmentModelTableParams.param">
          </div>
          <div class="form-group">
            <label>状态</label>
            <select class="form-control search-01" v-model="equipmentModelTableParams.enable">
              <option value="">全部</option>
              <option v-for="option in enableList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" data-toggle="modal" data-target="#equipmentModelAdd"> 添加设备型号 </button>
          </div>
        </form>
      </div>
    </div>
    <ipt-add id="equipmentModelAdd" :equipmentModelTableParams="equipmentModelTableParams"></ipt-add>
    <ipt-edit id="equipmentModelEdit" :tableParams="equipmentModelTableParams"
              :findParams="editParams"></ipt-edit>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="equipmentModelTableData"
                   :tableConfig.sync="equipmentModelTableConfig"
                   :params="equipmentModelTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="edit-link" @click="editBtn(scope.columnData)" data-toggle="modal"
               data-target="#equipmentModelEdit">编辑</a>
            <a class="delete-link" @click="disableBtn(scope.columnData)" v-if="scope.columnData.enable == ENABLE.value">禁用</a>
            <a class="add-link" @click="enableBtn(scope.columnData)" v-if="scope.columnData.enable == DISABLE.value">启用</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptAdd from "@/ipt-manage-system/components/system-set/equipmentModelAdd.vue"
  import IptEdit from "@/ipt-manage-system/components/system-set/equipmentModelEdit.vue"
  import Api from '@/ipt-manage-system/api'
  export default {
    components: {
      IptTable, IptAdd, IptEdit
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        equipmentModelTableParams: {
          equipmentModelName: '',
          manufacturerName: '',
          equipmentTypeId: '',
          param: '',
          enable: ''
        },
        equipmentModelTableConfig: {
          getApi: 'getEquipmentModelTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "设备型号管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '设备类别', data: 'equipmentTypeName'},
            {title: '设备型号', data: 'equipmentModelName'},
            {title: '厂商名称', data: 'manufacturerName'},
            {title: '设备参数', data: 'param'},
            {title: '状态', data: 'enableName'}
          ]
        },
        equipmentTypeList: [],
        enableList: [],
        ENABLE: {},
        DISABLE: {},
        editParams: {}
      }
    },
    methods: {
      init: function () {
        this.initQueryList()
        this.getEquipmentModelTableData(this.equipmentModelTableParams)
      },
      reset : function () {
        Object.assign(this.$data.equipmentModelTableParams, this.$options.data().equipmentModelTableParams)
      },
      initQueryList: function () {
        let _this = this
        Api.EquipmentType.getPageQueryList().then((data) => {
          _this.enableList = data.data.enableList
          _this.ENABLE = data.data.ENABLE
          _this.DISABLE = data.data.DISABLE
        })
        Api.EquipmentType.getEquipmentTypeList().then((data) => {
          _this.equipmentTypeList = data.data
        })
      },
      search: function () {
        this.getEquipmentModelTableData(this.equipmentModelTableParams)
      },
      editBtn: function (columnData) {
        let _this = this
        Api.EquipmentModel.findEquipmentModel(columnData.equipmentModelId).then((data) => {
          _this.editParams = data.data
        })
      },
      disableBtn: function (columnData) {
        let _this = this
        _this.$confirm('确认禁用【' + JSON.stringify(columnData.equipmentModelName) + '】设备型号吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.EquipmentModel.disableEquipmentModel(columnData.equipmentModelId).then((data) => {
            _this.$message({
              type: 'success',
              message: '禁用【' + JSON.stringify(columnData.equipmentModelName) + '】设备型号成功!'
            })
            _this.search()
          })
        })
      },
      enableBtn: function (columnData) {
        let _this = this
        _this.$confirm('确认启用【' + JSON.stringify(columnData.equipmentModelName) + '】设备型号吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.EquipmentModel.enableEquipmentModel(columnData.equipmentModelId).then((data) => {
            _this.$message({
              type: 'success',
              message: '启用【' + JSON.stringify(columnData.equipmentModelName) + '】设备型号成功!'
            })
            _this.search()
          })
        })
      },
      ...mapActions({
        getEquipmentModelTableData: 'getEquipmentModelTableData'
      })
    },
    computed: mapGetters({
      equipmentModelTableData: 'equipmentModelTableData'
    })
  }
</script>
