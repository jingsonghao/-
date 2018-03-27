<template>
  <ipt-modal>
    <span slot="modalTitle">修改部门</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">部门名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.departmentName" class="form-control"
                   v-validate="'required|max:20'" name="departmentName"
                   :class="{'is-danger':errors.has('departmentName') }">
            <span v-show="errors.firstByRule('departmentName', 'required')" class="help is-danger">请输入部门名称</span>
            <span v-show="errors.firstByRule('departmentName', 'max')" class="help is-danger">部门名称长度不能超过20</span>
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
  import { mapActions } from 'vuex'
  import Api from '@/ipt-manage-system/api'
  import IptModal from '@/components/common/modal'

  export default {
    components: {
      IptModal
    },
    props: {
      findParams: {}
    },
    data: function () {
      return {
        editParams: {},
        submitted: false
      }
    },
    watch: {
      findParams () {
        let _this = this
        _this.editParams = JSON.parse(JSON.stringify(_this.findParams))
      }
    },
    methods: {
      saveEdit: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.DepartmentManage.modifyDepartment(_this.editParams.departmentId, _this.editParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#departmentEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getParentDepartment()
                    _this.getDepartmentManageList()
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
        this.submitted = false
        this.$validator.reset()
      },
      ...mapActions({
        getDepartmentManageList: 'getDepartmentManageList',
        getParentDepartment: 'getParentDepartment'
      })
    }
  }
</script>
