<template>
  <ipt-modal>
    <span slot="modalTitle">修改客户端密钥</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">客户端节点</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.code" class="form-control" disabled>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">客户端名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.name" class="form-control" disabled>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">密钥</label>
          <div class="col-sm-7">
            <input type="text" v-model="editParams.secret" class="form-control" name="secret"
                   v-validate="'required|min:6|max:20'" :class="{'is-danger':errors.has('secret') }">
            <span v-show="errors.firstByRule('secret', 'required')" class="help is-danger">请输入密钥</span>
            <span v-show="errors.firstByRule('secret', 'min')" class="help is-danger">密钥不能小于6</span>
            <span v-show="errors.firstByRule('secret', 'max')" class="help is-danger">密钥不能超过20</span>
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
      systemInnerPermissionTableParams: {},
      findParams: {}
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
            Api.SystemInnerPermission.modifyServiceSecret(_this.editParams.clientId, _this.editParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#systemInnerPermissionSecretEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getSystemInnerPermissionTableData(_this.systemInnerPermissionTableParams)
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
        getSystemInnerPermissionTableData: 'getSystemInnerPermissionTableData'
      })
    }
  }
</script>

