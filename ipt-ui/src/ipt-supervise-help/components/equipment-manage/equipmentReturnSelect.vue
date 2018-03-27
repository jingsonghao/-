<template>
  <ipt-modal>
    <span slot="modalTitle">送还维护设备选择</span>
    <template slot="modalBody">
      <div class="shadow-boxs">
        <div class="r-search">
          <form class="form form-inline">
            <div class="form-group">
              <label>设备类别</label>
              <select class="form-control search-01" v-model="equipmentSelectTableParams.equipmentTypeId"
                      @change="getEquipmentModelList">
                <option value="">全部</option>
                <option v-for="option in equipmentTypeList" :value="option.equipmentTypeId">{{ option.equipmentTypeName}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>设备型号</label>
              <select class="form-control search-01" v-model="equipmentSelectTableParams.equipmentModelId">
                <option value="">全部</option>
                <option v-for="option in equipmentModelList" :value="option.equipmentModelId">
                  {{ option.equipmentModelName}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>设备编号</label>
              <input type="text" class="form-control search-01" placeholder="请输入设备编号" style="width: 150px;"
                     v-model="equipmentSelectTableParams.equipmentCode">
            </div>
            <div class="form-group my-group">
              <button type="button" class="btn  btn-search" @click="search"> 查询 </button>
              <button type="button" class="btn btn-dange btn-reset" @click="reset"> 重置 </button>
            </div>
          </form>
        </div>
      </div>
      <div class="table-container">
        <div class="thead-bg"></div>
        <div class="col-xs-12 table-box">
          <table class="table table-condensed">
            <thead>
            <tr>
              <th><span>全选</span><input type="checkbox" name="checkAll" id="checkAllBtn" @click="checkAllBtn"/></th>
              <th>设备类别</th>
              <th>设备型号</th>
              <th>设备编号</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="option in equipmentReturnSelectTableData">
              <td><span><input v-model="equipmentSelectList" name="equipment" type="checkbox"
                               :value="JSON.stringify(option)"/></span>
              </td>
              <td>{{ option.equipmentTypeName }}</td>
              <td>{{ option.equipmentModelName }}</td>
              <td>{{ option.equipmentCode }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <template slot="modalFooter">
      <button type="button" class="btn btn-search" @click="saveSelect">确定</button>
      <button type="button" class="btn btn-reset" @click="cancel">取消</button>
    </template>
  </ipt-modal>
</template>
<script>
  import $ from 'jquery'
  import {mapActions, mapGetters} from 'vuex'
  import Api from '@/ipt-supervise-help/api'
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        equipmentSelectTableParams: {
          equipmentTypeId: '',
          equipmentModelId: '',
          equipmentCode: ''
        },
        equipmentSelectList: [],
        equipmentTypeList: [],
        equipmentModelList: []
      }
    },
    methods: {
      init: function () {
        this.initQueryList()
      },
      initQueryList: function () {
        let _this = this
        Api.EquipmentManage.getEquipmentTypeList().then((data) => {
          _this.equipmentTypeList = data.data
        })
      },
      checkAllBtn: function () {
        let _this = this
        if ($("#checkAllBtn").is(":checked")) {
          _this.equipmentSelectList = []
          for (let i = 0; i < _this.equipmentReturnSelectTableData.length; i++) {
            _this.equipmentSelectList.push(JSON.stringify(_this.equipmentReturnSelectTableData[i]))
          }
        } else {
          _this.equipmentSelectList = []
        }
      },
      search: function () {
        this.getEquipmentReturnSelectTableData(this.equipmentSelectTableParams)
      },
      saveSelect: function () {
        let _this = this
        let equipmentNames = ""
        let equipmentCodes = ""
        for (let i = 0; i < _this.equipmentSelectList.length; i++) {
          let equipmentSelect = JSON.parse(_this.equipmentSelectList[i])
          equipmentCodes += equipmentSelect.equipmentCode + ","
          equipmentNames += equipmentSelect.equipmentTypeName + " -> " + equipmentSelect.equipmentModelName + " -> " + equipmentSelect.equipmentCode + "\n"
        }
        if (equipmentCodes) {
          equipmentCodes = equipmentCodes.substr(0, equipmentCodes.lastIndexOf(","))
        }
        _this.getEquipmentReturnSelectListData({equipmentCodes: equipmentCodes, equipmentNames: equipmentNames})
        _this.cancel()
      },
      reset: function () {
        Object.assign(this.$data.equipmentSelectTableParams, this.$options.data().equipmentSelectTableParams)
        this.initQueryList()
      },
      cancel: function () {
        $('#equipmentReturnSelect div.modal-header > button[aria-label="Close"]').trigger('click')
        this.equipmentSelectList = []
        $("#checkAllBtn").removeAttr("checked")
        this.reset()
      },
      getEquipmentModelList: function () {
        let _this = this
        if (_this.equipmentSelectTableParams.equipmentTypeId) {
          Api.EquipmentManage.getEquipmentModelList(_this.equipmentSelectTableParams.equipmentTypeId).then((data) => {
            _this.equipmentModelList = data.data
            _this.equipmentSelectTableParams.equipmentModelId = ''
          })
        } else {
          _this.equipmentModelList = []
        }
      },
      ...mapActions({
        getEquipmentReturnSelectTableData: 'getEquipmentReturnSelectTableData',
        getEquipmentReturnSelectListData: 'getEquipmentReturnSelectListData'
      })
    },
    computed: mapGetters({
      equipmentReturnSelectTableData: 'equipmentReturnSelectTableData'
    })
  }
</script>

