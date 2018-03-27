<template>
  <ipt-modal>
    <span slot="modalTitle">维护设备</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">设备编号</label>
          <div class="col-sm-7">
            <input class="form-control" v-model="editParams.equipmentCode" name="equipmentCode" disabled/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">修理状态</label>
          <div class="col-sm-7">
            <select v-model="params.repairStatus" class="form-control" name="repairStatus"
                    v-validate="'required'" :class="{'is-danger':errors.has('repairStatus') }">
              <option value="">--请选择--</option>
              <option v-for="option in repairStatusList" :value="option.value">{{ option.name }}</option>
            </select>
            <span v-show="errors.has('repairStatus')" class="help is-danger">请选择修理状态</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">维护信息</label>
          <div class="col-sm-7">
            <textarea v-model="params.repairRemarks" name="repairRemarks" class="form-control" style="height:200px;"
                      v-validate="'required|max:200'" :class="{'is-danger':errors.has('repairRemarks') }"></textarea>
            <span v-show="errors.firstByRule('repairRemarks', 'required')" class="help is-danger">请输入维护信息</span>
            <span v-show="errors.firstByRule('repairRemarks', 'max')" class="help is-danger">维护信息长度不能超过200</span>
          </div>
        </div>
      </form>
    </template>
    <template slot="modalFooter">
      <button type="button" class="btn btn-search" @click="saveEdit">保存</button>
      <button type="button" class="btn btn-reset" @click="reset">重置</button>
    </template>
  </ipt-modal>
</template>
<script>
  import $ from 'jquery'
  import {mapActions} from 'vuex'
  import Api from '@/ipt-supervise-help/api'
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      tableParams: {},
      editParams: {}
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        params: {
          equipmentRepairId: '',
          equipmentCode: '',
          repairStatus: '',
          repairRemarks: ''
        },
        submitted: false,
        repairStatusList: []
      }
    },
    watch: {
      editParams() {
        this.params = JSON.parse(JSON.stringify(this.editParams))
        this.params.repairStatus = ''
        this.params.repairRemarks = ''
      }
    },
    methods: {
      init: function () {
        this.initList()
      },
      initList: function () {
        let _this = this
        Api.EquipmentRepair.getRepairedAndScrapEnumList().then((data) => {
          _this.repairStatusList = data.data
        })
      },
      saveEdit: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.EquipmentRepair.saveEquipmentRepair(_this.params.equipmentRepairId, _this.params).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#equipmentRepairEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getEquipmentRepairTableData(_this.tableParams)
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
        this.$validator.reset()
        this.submitted = false
      },
      ...mapActions({
        getEquipmentRepairTableData: 'getEquipmentRepairTableData'
      })
    }
  }
</script>

