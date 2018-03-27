<template>
  <ipt-modal>
    <span slot="modalTitle">添加设备</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">重要产品类别</label>
          <div class="col-sm-7">
            <select v-model="addParams.cateCode" class="form-control" name="cateCode"
                    v-validate="'required'" :class="{'is-danger':errors.has('cateCode') }">
              <option value="">--请选择--</option>
              <option v-for="option in cateList" :value="option.cateCode">{{ option.cateName}}</option>
            </select>
            <span v-show="errors.has('cateCode')" class="help is-danger">请选择重要产品类别</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备类别</label>
          <div class="col-sm-7">
            <select v-model="addParams.equipmentTypeId" class="form-control" name="equipmentTypeId"
                    @change="getEquipmentModelList"
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
          <label class="col-sm-3 control-label">设备型号</label>
          <div class="col-sm-7">
            <select v-model="addParams.equipmentModelId" class="form-control" name="equipmentModelId"
                    v-validate="'required'" :class="{'is-danger':errors.has('equipmentTypeId') }">
              <option value="">--请选择--</option>
              <option v-for="option in equipmentModelList" :value="option.equipmentModelId">{{ option.equipmentModelName}}</option>
            </select>
            <span v-show="errors.has('equipmentModelId')" class="help is-danger">请选择设备型号</span>
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
  import Api from '@/ipt-supervise-help/api'
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      equipmentTableParams: {}
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        addParams: {
          cateCode: '',
          equipmentTypeId: '',
          equipmentModelId: ''
        },
        equipmentTypeList: [],
        equipmentModelList: [],
        cateList: [],
        submitted: false
      }
    },
    methods: {
      init: function () {
        this.initList()
      },
      initList: function () {
        let _this = this
        Api.EquipmentManage.getOneLevelCateList().then((data) => {
          _this.cateList = data.data
        })
        Api.EquipmentManage.getEquipmentTypeList().then((data) => {
          _this.equipmentTypeList = data.data
        })
      },
      saveAdd: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.EquipmentManage.addEquipment(_this.addParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#equipmentAdd div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getEquipmentTableData(_this.equipmentTableParams)
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
      ...mapActions({
        getEquipmentTableData: 'getEquipmentTableData'
      })
    }
  }
</script>

