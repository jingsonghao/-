<template>
  <div class="main">
    <div class="shadow-boxs">
      <div class="r-search search2">
        <form class="form form-inline">
          <div class="form-group">
            <label>设备类别</label>
            <select class="form-control search-01" v-model="abnormalEquipmentStorageTableParams.equipmentTypeId">
              <option value="">全部</option>
              <option v-for="option in equipmentTypeList" :value="option.equipmentTypeId">
                {{ option.equipmentTypeName }}
              </option>
            </select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search">查询</button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置</button>
          </div>
        </form>
      </div>
    </div>
    <ipt-view id="abnormalEquipmentTypeStorage" :abnormalEquipmentTypeStorageList="findParams"></ipt-view>
    <ipt-detail id="abnormalEquipmentModelView"></ipt-detail>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="abnormalEquipmentStorageTableData" :tableConfig.sync="abnormalEquipmentStorageTableConfig"
                   :params="abnormalEquipmentStorageTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)" data-toggle="modal" data-target="#abnormalEquipmentTypeStorage">查看</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptView from "@/ipt-supervise-help/components/equipment-manage/abnormalEquipmentTypeStorage.vue"
  import IptDetail from "@/ipt-supervise-help/components/equipment-manage/abnormalEquipmentTypeModelDetailView.vue"
  import Api from '@/ipt-supervise-help/api'

  export default {
    components: {
      IptTable, IptView, IptDetail
    },
    created() {
      this.init()
    },
    data() {
      return {
        abnormalEquipmentStorageTableParams: {
          equipmentTypeId: ''
        },
        abnormalEquipmentStorageTableConfig: {
          getApi: 'getAbnormalEquipmentStorageTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "损坏设备库存",             // [可选] 表格标题，默认不显示标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '设备类别编号', data: 'equipmentTypeId'},
            {title: '设备类别', data: 'equipmentTypeName'},
            {title: '单位', data: 'equipmentUnit'},
            {title: '库存', data: 'storageNum'}
          ]
        },
        equipmentTypeList: [],
        findParams: {}
      }
    },
    computed: mapGetters({
      abnormalEquipmentStorageTableData: 'abnormalEquipmentStorageTableData'
    }),
    methods: {
      init() {
        this.initQueryList()
        this.getAbnormalEquipmentStorageTableData(this.abnormalEquipmentStorageTableParams)
      },
      search() {
        this.getAbnormalEquipmentStorageTableData(this.abnormalEquipmentStorageTableParams)
      },
      reset: function () {
        Object.assign(this.$data.abnormalEquipmentStorageTableParams, this.$options.data().abnormalEquipmentStorageTableParams)
        this.initQueryList()
      },
      initQueryList: function () {
        let _this = this
        Api.EquipmentManage.getEquipmentTypeList().then((data) => {
          _this.equipmentTypeList = data.data
        })
      },
      showBtn(columnData) {
        let _this = this
        Api.EquipmentStorage.findAbnormalEquipmentModelStorage(columnData.equipmentTypeId).then((data) => {
          _this.findParams = data.data
        })
      },
      ...mapActions({
        getAbnormalEquipmentStorageTableData: 'getAbnormalEquipmentStorageTableData'
      })
    }
  }
</script>


