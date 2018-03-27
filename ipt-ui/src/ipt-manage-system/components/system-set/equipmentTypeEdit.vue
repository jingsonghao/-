<template>
  <ipt-modal>
    <span slot="modalTitle">修改设备类别</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">设备类别名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.equipmentTypeName" class="form-control"
                   v-validate="'required|max:100'" name="equipmentTypeName"
                   :class="{'is-danger':errors.has('equipmentTypeName') }">
            <span v-show="errors.firstByRule('equipmentTypeName', 'required')" class="help is-danger">请输入设备类别名称</span>
            <span v-show="errors.firstByRule('equipmentTypeName', 'max')" class="help is-danger">设备类别名称长度不能超过100</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">单位</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.equipmentUnit" class="form-control" name="equipmentUnit"
                   v-validate="'required|max:20'" :class="{'is-danger':errors.has('equipmentUnit') }">
            <span v-show="errors.firstByRule('equipmentUnit', 'required')" class="help is-danger">请输入单位</span>
            <span v-show="errors.firstByRule('equipmentUnit', 'max')" class="help is-danger">单位长度不能超过20</span>
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
            Api.EquipmentType.modifyEquipmentType(_this.editParams.equipmentTypeId, _this.editParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#equipmentTypeEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getEquipmentTypeTableData(_this.tableParams)
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
        getEquipmentTypeTableData: 'getEquipmentTypeTableData'
      })
    }
  }
</script>

