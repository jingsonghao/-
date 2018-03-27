<template>
  <ipt-modal>
    <span slot="modalTitle">添加设备型号</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">设备类别</label>
          <div class="col-sm-7">
            <select v-model="addParams.equipmentTypeId" class="form-control" name="equipmentTypeId"
                    v-validate="'required'" :class="{'is-danger':errors.has('equipmentTypeId') }">
              <option value="">--请选择--</option>
              <option v-for="option in equipmentTypeList" :value="option.equipmentTypeId">
                {{ option.equipmentTypeName}}
              </option>
            </select>
            <span v-show="errors.has('equipmentTypeId')" class="help is-danger">请选择设备类别</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备型号名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="addParams.equipmentModelName" class="form-control"
                   v-validate="'required|max:200'" name="equipmentModelName"
                   :class="{'is-danger':errors.has('equipmentModelName') }">
            <span v-show="errors.firstByRule('equipmentModelName', 'required')" class="help is-danger">请输入设备型号名称</span>
            <span v-show="errors.firstByRule('equipmentModelName', 'max')" class="help is-danger">设备型号名称长度不能超过200</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">厂商名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="addParams.manufacturerName" class="form-control" name="manufacturerName"
                   v-validate="'required|max:200'" :class="{'is-danger':errors.has('manufacturerName') }">
            <span v-show="errors.firstByRule('manufacturerName', 'required')" class="help is-danger">请输入厂商名称</span>
            <span v-show="errors.firstByRule('manufacturerName', 'max')" class="help is-danger">厂商名称长度不能超过200</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备参数</label>
          <div class="col-sm-7">
            <input type="text" v-model="addParams.param" class="form-control" name="param"
                   v-validate="'required|max:200'" :class="{'is-danger':errors.has('param') }">
            <span v-show="errors.firstByRule('param', 'required')" class="help is-danger">请输入设备参数</span>
            <span v-show="errors.firstByRule('param', 'max')" class="help is-danger">设备参数长度不能超过200</span>
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
  import {mapActions} from 'vuex'
  import Api from '@/ipt-manage-system/api'
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      equipmentModelTableParams: {}
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        addParams: {
          equipmentTypeId: '',
          equipmentModelName: '',
          manufacturerName: '',
          param: ''
        },
        equipmentTypeList: [],
        submitted: false
      }
    },
    methods: {
      init: function () {
        this.initList()
      },
      initList: function () {
        let _this = this
        Api.EquipmentType.getEquipmentTypeList().then((data) => {
          _this.equipmentTypeList = data.data
        })
      },
      saveAdd: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.EquipmentModel.addEquipmentModel(_this.addParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#equipmentModelAdd div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getEquipmentModelTableData(_this.equipmentModelTableParams)
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
      },
      ...mapActions({
        getEquipmentModelTableData: 'getEquipmentModelTableData'
      })
    }
  }
</script>

