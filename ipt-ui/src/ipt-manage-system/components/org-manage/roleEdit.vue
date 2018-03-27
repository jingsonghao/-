<template>
  <ipt-modal>
    <span slot="modalTitle">修改角色信息</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">角色名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.roleName" class="form-control" name="roleName"
                   v-validate="'required|max:20'" :class="{'is-danger':errors.has('roleName') }">
            <span v-show="errors.firstByRule('roleName', 'required')" class="help is-danger">请输入角色名称</span>
            <span v-show="errors.firstByRule('roleName', 'max')" class="help is-danger">角色名称长度不能超过20</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">角色描述</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.description" class="form-control" name="description"
                   v-validate="'required|max:100'" :class="{'is-danger':errors.has('description') }">
            <span v-show="errors.firstByRule('description', 'required')" class="help is-danger">请输入角色描述</span>
            <span v-show="errors.firstByRule('description', 'max')" class="help is-danger">角色描述长度不能超过100</span>
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
  import IptModal from '@/components/common/modal'

  export default {
    components: {
      IptModal
    },
    props: {
      tableParams: {},
      findParams: {
        roleName: '',
        description: ''
      }
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
      saveEdit: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.RoleManage.modifyRole(_this.editParams.roleId, _this.editParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#roleEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getRoleManageTableData(_this.tableParams)
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
        getRoleManageTableData: 'getRoleManageTableData'
      })
    }
  }
</script>

