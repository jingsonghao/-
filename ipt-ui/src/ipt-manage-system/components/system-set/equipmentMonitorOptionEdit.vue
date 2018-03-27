<template>
  <ipt-modal>
    <span slot="modalTitle">设备监控项维护</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">预警类型</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.warningTypeName" class="form-control" name="warningTypeName"
                   disabled>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">预警对象</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.warningObjectName" class="form-control" name="warningObjectName"
                   disabled>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">连续多少天未上传数据预警</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.daysWarning" class="form-control" name="daysWarning"
                   v-validate="'required|numeric|max:10'" :class="{'is-danger':errors.has('daysWarning') }">
            <span v-show="errors.firstByRule('equipmentUnit', 'required')" class="help is-danger">请输入天数</span>
            <span v-show="errors.firstByRule('equipmentUnit', 'numeric')" class="help is-danger">只能填写数字</span>
            <span v-show="errors.firstByRule('equipmentUnit', 'max')" class="help is-danger">天数长度不能超过10</span>
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
  import Api from '@/ipt-manage-system/api'
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      tableParams: {},
      findParams: {}
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        editParams: {
          daysWarning: ''
        },
        submitted: false
      }
    },
    watch: {
      findParams() {
        this.editParams = JSON.parse(JSON.stringify(this.findParams))
      }
    },
    methods: {
      init: function () {
      },
      saveEdit: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.EquipmentMonitorOption.modifyEquipmentMonitorOption(_this.editParams.monitorOptionId, _this.editParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#equipmentMonitorOptionEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getEquipmentMonitorOptionTableData(_this.tableParams)
                    _this.$validator.reset()
                  }
                }
              })
            })
          }
        })
      },
      reset: function () {
        this.editParams = JSON.parse(JSON.stringify(this.findParams))
        this.$validator.reset()
        this.submitted = false
      },
      ...mapActions({
        getEquipmentMonitorOptionTableData: 'getEquipmentMonitorOptionTableData'
      })
    }
  }
</script>

