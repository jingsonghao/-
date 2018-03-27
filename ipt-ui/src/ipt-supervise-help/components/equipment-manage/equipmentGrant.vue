<template>
  <ipt-modal>
    <span slot="modalTitle">发放设备</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">发放的设备</label>
          <div class="col-sm-7">
            <textarea class="form-control" v-model="addParams.equipmentNames" name="equipmentCode" style="height: 200px;"
                      readonly v-validate="'required'" :class="{'is-danger':errors.has('equipmentCode') }"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label"></label>
          <div class="col-sm-7">
            <button type="button" class="btn  btn-search" @click="selectEquipment"
                    data-toggle="modal" data-target="#equipmentSelect"> 选择设备 </button>
            <span v-show="errors.has('equipmentCode')" class="help is-danger">请选择发放的设备</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">使用企业</label>
          <div class="col-sm-7">
            <select v-model="addParams.enterpriseNo" class="form-control" name="enterpriseNo"
                    v-validate="'required'" :class="{'is-danger':errors.has('enterpriseNo') }">
              <option value="">--请选择--</option>
              <option v-for="option in enterpriseList" :value="option.enterpriseNo">{{ option.enterpriseName}}</option>
            </select>
            <span v-show="errors.has('enterpriseNo')" class="help is-danger">请选择使用企业</span>
          </div>
        </div>
      </form>
    </template>
    <template slot="modalFooter">
      <button type="button" class="btn btn-search" @click="saveAdd">保存</button>
      <button type="button" class="btn btn-reset" @click="reset">重置</button>
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
    props: {
      equipmentAdjustTableParams: {}
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        addParams: {
          equipmentCode: '',
          equipmentNames: '',
          enterpriseNo: ''
        },
        submitted: false,
        enterpriseList: []
      }
    },
    methods: {
      init: function () {
        this.initList()
      },
      initList: function () {
        let _this = this
        Api.EquipmentAdjust.getAllUseEnterpriseList().then((data) => {
          _this.enterpriseList = data.data
        })
      },
      saveAdd: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.EquipmentAdjust.addEquipmentGrant(_this.addParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#equipmentGrant div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getEquipmentAdjustTableData(_this.equipmentAdjustTableParams)
                    _this.getEquipmentSelectTableData({})
                    _this.reset()
                  }
                }
              })
            })
          }
        })
      },
      reset: function () {
        Object.assign(this.$data, this.$options.data())
        this.initList()
        this.equipmentModelList = []
        this.$validator.reset()
      },
      getEquipmentModelList: function () {
        let _this = this
        if (_this.addParams.equipmentTypeId) {
          Api.EquipmentManage.getEquipmentModelList(_this.addParams.equipmentTypeId).then((data) => {
            _this.equipmentModelList = data.data
          })
        } else {
          _this.equipmentModelList = []
          _this.addParams.equipmentModelId = ''
        }
      },
      selectEquipment: function () {
        this.getEquipmentSelectTableData({})
      },
      ...mapActions({
        getEquipmentAdjustTableData: 'getEquipmentAdjustTableData',
        getEquipmentSelectTableData: 'getEquipmentSelectTableData'
      })
    },
    watch: {
      equipmentSelectListData() {
        this.addParams.equipmentNames = this.equipmentSelectListData.equipmentNames
        this.addParams.equipmentCode = this.equipmentSelectListData.equipmentCodes
      }
    },
    computed: mapGetters({
      equipmentSelectListData: 'equipmentSelectListData'
    })
  }
</script>

