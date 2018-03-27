<template>
  <ipt-modal>
    <span slot="modalTitle">添加设备</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">重要产品类别</label>
          <div class="col-sm-7">
            <select v-model="params.cateCode" class="form-control" name="cateCode"
                    v-validate="'required'" :class="{'is-danger':errors.has('cateCode') }">
              <option value="">--请选择--</option>
              <option v-for="option in cateList" :value="option.cateCode">{{ option.cateName }}</option>
            </select>
            <span v-show="errors.has('cateCode')" class="help is-danger">请选择重要产品类别</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备类别</label>
          <div class="col-sm-7">
            <select v-model="params.equipmentTypeId" class="form-control" name="equipmentTypeId"
                    @change="getEquipmentModelList"
                    v-validate="'required'" :class="{'is-danger':errors.has('equipmentTypeId') }">
              <option value="">--请选择--</option>
              <option v-for="option in equipmentTypeList" :value="option.equipmentTypeId">
                {{ option.equipmentTypeName }}
              </option>
            </select>
            <span v-show="errors.has('equipmentTypeId')" class="help is-danger">请选择设备类别</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备型号</label>
          <div class="col-sm-7">
            <select v-model="params.equipmentModelId" class="form-control" name="equipmentModelId"
                    v-validate="'required'" :class="{'is-danger':errors.has('equipmentTypeId') }">
              <option value="">--请选择--</option>
              <option v-for="option in equipmentModelList" :value="option.equipmentModelId">{{ option.equipmentModelName
                }}
              </option>
            </select>
            <span v-show="errors.has('equipmentModelId')" class="help is-danger">请选择设备型号</span>
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
        params: {},
        equipmentTypeList: [],
        equipmentModelList: [],
        cateList: [],
        submitted: false
      }
    },
    watch: {
      editParams() {
        this.params = JSON.parse(JSON.stringify(this.editParams))
        this.getEquipmentModelList()
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
      saveEdit: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.EquipmentManage.modifyEquipment(_this.params.equipmentId, _this.params).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#equipmentEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getEquipmentTableData(_this.tableParams)
                    _this.$validator.reset()
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
      getEquipmentModelList: function () {
        let _this = this
        if (_this.params.equipmentTypeId) {
          Api.EquipmentManage.getEquipmentModelList(_this.params.equipmentTypeId).then((data) => {
            _this.equipmentModelList = data.data
          })
        } else {
          _this.equipmentModelList = []
        }
      },
      ...mapActions({
        getEquipmentTableData: 'getEquipmentTableData'
      })
    }
  }
</script>

