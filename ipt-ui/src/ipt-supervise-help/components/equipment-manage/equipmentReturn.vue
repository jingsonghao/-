<template>
  <ipt-modal>
    <span slot="modalTitle">设备送还维护</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">维护设备</label>
          <div class="col-sm-7">
            <textarea class="form-control" v-model="addParams.equipmentNames" name="equipmentCode"
                      style="height: 200px;" readonly v-validate="'required'"
                      :class="{'is-danger':errors.has('equipmentCode') }"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label"></label>
          <div class="col-sm-7">
            <button type="button" class="btn  btn-search" @click="selectEquipment"
                    data-toggle="modal" data-target="#equipmentReturnSelect"> 选择设备
            </button>
            <span v-show="errors.has('equipmentCode')" class="help is-danger">请选择送还维护的设备</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">送还原因</label>
          <div class="col-sm-7">
            <textarea v-model="addParams.returnRemarks" name="returnRemarks" class="form-control" style="height:200px;"
                      v-validate="'required|max:200'" :class="{'is-danger':errors.has('returnRemarks') }"></textarea>
            <span v-show="errors.firstByRule('returnRemarks', 'required')" class="help is-danger">请输入送还原因</span>
            <span v-show="errors.firstByRule('returnRemarks', 'max')" class="help is-danger">送还原因长度不能超过200</span>
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
      equipmentRepairTableParams: {}
    },
    data: function () {
      return {
        addParams: {
          equipmentCode: '',
          equipmentNames: '',
          returnRemarks: ''
        },
        submitted: false
      }
    },
    methods: {
      saveAdd: function () {
        let _this = this
        this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.EquipmentRepair.addEquipmentRepair(_this.addParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#equipmentReturn div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getEquipmentRepairTableData(_this.equipmentRepairTableParams)
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
        this.$validator.reset()
      },
      selectEquipment: function () {
        this.getEquipmentReturnSelectTableData({})
      },
      ...mapActions({
        getEquipmentRepairTableData: 'getEquipmentRepairTableData',
        getEquipmentReturnSelectTableData: 'getEquipmentReturnSelectTableData'
      })
    },
    watch: {
      equipmentReturnSelectListData() {
        this.addParams.equipmentNames = this.equipmentReturnSelectListData.equipmentNames
        this.addParams.equipmentCode = this.equipmentReturnSelectListData.equipmentCodes
      }
    },
    computed: mapGetters({
      equipmentReturnSelectListData: 'equipmentReturnSelectListData'

    })
  }
</script>

