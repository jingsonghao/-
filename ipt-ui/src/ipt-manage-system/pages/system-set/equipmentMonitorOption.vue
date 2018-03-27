<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>系统设置</a></li>
      <li class="active jsh-active">设备监控项管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>预警类型</label>
            <select class="form-control search-01" v-model="equipmentMonitorOptionTableParams.warningType">
              <option value="">全部</option>
              <option v-for="option in warningTypeList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>预警对象</label>
            <select class="form-control search-01" v-model="equipmentMonitorOptionTableParams.warningObject">
              <option value="">全部</option>
              <option v-for="option in warningObjectList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>预警指标内容</label>
            <input type="text" class="form-control search-01" placeholder="请输入预警指标内容" style="width: 150px;"
                   v-model="equipmentMonitorOptionTableParams.warningIndexContent">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
          </div>
        </form>
      </div>
    </div>
    <ipt-edit id="equipmentMonitorOptionEdit" :tableParams="equipmentMonitorOptionTableParams" :findParams="editParams"></ipt-edit>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="equipmentMonitorOptionTableData"
                   :tableConfig.sync="equipmentMonitorOptionTableConfig"
                   :params="equipmentMonitorOptionTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="edit-link" @click="editBtn(scope.columnData)" data-toggle="modal"
               data-target="#equipmentMonitorOptionEdit">维护</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import Api from '@/ipt-manage-system/api'
  import IptEdit from "@/ipt-manage-system/components/system-set/equipmentMonitorOptionEdit.vue"
  export default {
    components: {
      IptTable, IptEdit
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        equipmentMonitorOptionTableParams: {
          warningType: '',
          warningObject: '',
          warningIndexContent: ''
        },
        equipmentMonitorOptionTableConfig: {
          getApi: 'getEquipmentMonitorOptionTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "设备监控项管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '预警类型', data: 'warningTypeName'},
            {title: '预警对象', data: 'warningObjectName'},
            {title: '预警指标内容', data: 'warningIndexContent'},
            {title: '预警规则', data: 'warningRule'}
          ]
        },
        editParams: '',
        warningTypeList:[],
        warningObjectList:[]
      }
    },
    methods: {
      init: function () {
        this.initQueryList()
        this.getEquipmentMonitorOptionTableData(this.equipmentMonitorOptionTableParams)
      },
      initQueryList: function () {
        let _this = this
        Api.EquipmentMonitorOption.getPageQueryList().then((data) => {
          _this.warningTypeList = data.data.warningTypeList
          _this.warningObjectList = data.data.warningObjectList
        })
      },
      reset: function () {
        Object.assign(this.$data.equipmentMonitorOptionTableParams, this.$options.data().equipmentMonitorOptionTableParams)
      },
      search: function () {
        this.getEquipmentMonitorOptionTableData(this.equipmentMonitorOptionTableParams)
      },
      editBtn: function (columnData) {
        Api.EquipmentMonitorOption.findEquipmentMonitorOption(columnData.monitorOptionId).then((data) => {
          this.editParams = data.data
        })
      },
      ...mapActions({
        getEquipmentMonitorOptionTableData: 'getEquipmentMonitorOptionTableData'
      })
    },
    computed: mapGetters({
      equipmentMonitorOptionTableData: 'equipmentMonitorOptionTableData'
    })
  }
</script>
