<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>系统设置</a></li>
      <li class="active jsh-active">设备类别管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline" id="query-form">
          <div class="form-group">
            <label>设备类别名称</label>
            <input type="text" class="form-control search-01" placeholder="请输入设备类别名称" style="width: 160px;"
                   v-model="equipmentTypeTableParams.equipmentTypeName">
          </div>
          <div class="form-group">
            <label>单位</label>
            <input type="text" class="form-control search-01" placeholder="请输入单位" style="width: 100px;"
                   v-model="equipmentTypeTableParams.equipmentUnit">
          </div>
          <div class="form-group">
            <label>状态</label>
            <select class="form-control search-01" v-model="equipmentTypeTableParams.enable">
              <option value="">全部</option>
              <option v-for="option in enableList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" data-toggle="modal" data-target="#equipmentTypeAdd"> 添加设备类别
            </button>
          </div>
        </form>
      </div>
    </div>
    <ipt-add id="equipmentTypeAdd" :equipmentTypeTableParams="equipmentTypeTableParams"></ipt-add>
    <ipt-edit id="equipmentTypeEdit" :tableParams="equipmentTypeTableParams" :findParams="editParams"></ipt-edit>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="equipmentTypeTableData"
                   :tableConfig.sync="equipmentTypeTableConfig"
                   :params="equipmentTypeTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="edit-link" @click="editBtn(scope.columnData)" data-toggle="modal"
               data-target="#equipmentTypeEdit">编辑</a>
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
  import IptAdd from "@/ipt-manage-system/components/system-set/equipmentTypeAdd.vue"
  import IptEdit from "@/ipt-manage-system/components/system-set/equipmentTypeEdit.vue"
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
        equipmentTypeTableParams: {
          equipmentTypeId: '',
          equipmentTypeName: '',
          equipmentUnit: '',
          enable: ''
        },
        equipmentTypeTableConfig: {
          getApi: 'getEquipmentTypeTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "设备类别管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '设备类别编号', data: 'equipmentTypeId'},
            {title: '设备类别名称', data: 'equipmentTypeName'},
            {title: '单位', data: 'equipmentUnit'},
            {title: '状态', data: 'enableName'}
          ]
        },
        enableList: [],
        ENABLE: {},
        DISABLE: {},
        editParams: {}
      }
    },
    methods: {
      init: function () {
        this.initQueryList()
        this.getEquipmentTypeTableData(this.equipmentTypeTableParams)
      },
      initQueryList: function () {
        let _this = this
        Api.EquipmentType.getPageQueryList().then((data) => {
          _this.enableList = data.data.enableList
          _this.ENABLE = data.data.ENABLE
          _this.DISABLE = data.data.DISABLE
        })
      },
      reset: function () {
        Object.assign(this.$data.equipmentTypeTableParams, this.$options.data().equipmentTypeTableParams)
      },
      search: function () {
        this.getEquipmentTypeTableData(this.equipmentTypeTableParams)
      },
      editBtn: function (columnData) {
        let _this = this
        Api.EquipmentType.findEquipmentType(columnData.equipmentTypeId).then((data) => {
          _this.editParams = data.data
        })
      },
      disableBtn: function (columnData) {
        let _this = this
        _this.$confirm('禁用设备类别 将级联禁用【' + JSON.stringify(columnData.equipmentTypeName) + '】下所有设备型号 确认禁用吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.EquipmentType.disableEquipmentType(columnData.equipmentTypeId).then((data) => {
            _this.$message({
              type: 'success',
              message: '禁用【' + JSON.stringify(columnData.equipmentTypeName) + '】设备类别成功!'
            })
            _this.search()
          })
        })
      },
      enableBtn: function (columnData) {
        let _this = this
        _this.$confirm('确认启用【' + JSON.stringify(columnData.equipmentTypeName) + '】设备类别吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.EquipmentType.enableEquipmentType(columnData.equipmentTypeId).then((data) => {
            _this.$message({
              type: 'success',
              message: '启用【' + JSON.stringify(columnData.equipmentTypeName) + '】设备类别成功!'
            })
            _this.search()
          })
        })
      },
      ...mapActions({
        getEquipmentTypeTableData: 'getEquipmentTypeTableData'
      })
    },
    computed: mapGetters({
      equipmentTypeTableData: 'equipmentTypeTableData'
    })
  }
</script>
