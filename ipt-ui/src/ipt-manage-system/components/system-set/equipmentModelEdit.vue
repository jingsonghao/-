<template>
  <ipt-modal>
    <span slot="modalTitle">修改设备型号</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">设备类别</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.equipmentTypeName" class="form-control" disabled
                   name="equipmentTypeName">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备型号名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.equipmentModelName" class="form-control"
                   v-validate="'required|max:200'" name="equipmentModelName"
                   :class="{'is-danger':errors.has('equipmentModelName') }">
            <span v-show="errors.firstByRule('equipmentModelName', 'required')" class="help is-danger">请输入设备型号名称</span>
            <span v-show="errors.firstByRule('equipmentModelName', 'max')" class="help is-danger">设备型号名称长度不能超过200</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">厂商名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.manufacturerName" class="form-control" name="manufacturerName"
                   v-validate="'required|max:200'" :class="{'is-danger':errors.has('manufacturerName') }">
            <span v-show="errors.firstByRule('manufacturerName', 'required')" class="help is-danger">请输入厂商名称</span>
            <span v-show="errors.firstByRule('manufacturerName', 'max')" class="help is-danger">厂商名称长度不能超过200</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备参数</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.param" class="form-control" name="param"
                   v-validate="'required|max:200'" :class="{'is-danger':errors.has('param') }">
            <span v-show="errors.firstByRule('param', 'required')" class="help is-danger">请输入设备参数</span>
            <span v-show="errors.firstByRule('param', 'max')" class="help is-danger">设备参数长度不能超过200</span>
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
      findParams: {
        equipmentTypeName: '',
        equipmentModelName: '',
        manufacturerName: '',
        param: ''
      }
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        editParams: {},
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
            Api.EquipmentModel.modifyEquipmentModel(_this.editParams.equipmentModelId, _this.editParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#equipmentModelEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getEquipmentModelTableData(_this.tableParams)
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
        getEquipmentModelTableData: 'getEquipmentModelTableData'
      })
    }
  }
</script>

