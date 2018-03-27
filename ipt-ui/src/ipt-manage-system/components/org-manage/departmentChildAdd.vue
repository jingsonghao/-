<template>
  <ipt-modal>
    <span slot="modalTitle">添加子部门</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">子部门名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="addChildParams.departmentName" class="form-control"
                   v-validate="'required|max:20'" name="departmentName"
                   :class="{'is-danger':errors.has('departmentName') }">
            <span v-show="errors.firstByRule('departmentName', 'required')" class="help is-danger">请输入子部门名称</span>
            <span v-show="errors.firstByRule('departmentName', 'max')" class="help is-danger">子部门名称长度不能超过20</span>
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
  import { mapActions } from 'vuex'
  import Api from '@/ipt-manage-system/api'
  import IptModal from '@/components/common/modal'

  export default {
    components: {
      IptModal
    },
    data: function () {
      return {
        addChildParams: {},
        submitted: false
      }
    },
    methods: {
      saveAdd: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.DepartmentManage.addChildDepartment(_this.addChildParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#departmentChildAdd div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getParentDepartment()
                    _this.getDepartmentManageList()
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
      ...mapActions({
        getDepartmentManageList: 'getDepartmentManageList',
        getParentDepartment: 'getParentDepartment'
      })
    }
  }
</script>
