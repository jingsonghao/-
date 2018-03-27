<template>
  <ipt-modal>
    <span slot="modalTitle">添加用户</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">用户名</label>
          <div class="col-sm-7">
            <input type="text" v-model="addParams.username" class="form-control"
                   v-validate="'required|max:20'" name="username"
                   :class="{'is-danger':errors.has('username') }">
            <span v-show="errors.firstByRule('username', 'required')" class="help is-danger">请输入用户名</span>
            <span v-show="errors.firstByRule('username', 'max')" class="help is-danger">用户名长度不能超过20</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">密码</label>
          <div class="col-sm-7">
            <input type="password" v-model="addParams.password" class="form-control"
                   v-validate="'required|min:6|max:20'" name="password"
                   :class="{'is-danger':errors.has('password') }">
            <span v-show="errors.firstByRule('password', 'required')" class="help is-danger">请输入密码</span>
            <span v-show="errors.firstByRule('password', 'min')" class="help is-danger">密码长度不能少于6</span>
            <span v-show="errors.firstByRule('password', 'max')" class="help is-danger">密码长度不能超过20</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">确认密码</label>
          <div class="col-sm-7">
            <input type="password" v-model="addParams.confirmPassword" class="form-control"
                   v-validate="'required|confirmed:password'" name="confirmPassword"
                   :class="{'is-danger':errors.has('confirmPassword') }">
            <span v-show="errors.firstByRule('confirmPassword', 'required')" class="help is-danger">请确认密码</span>
            <span v-show="errors.firstByRule('confirmPassword', 'confirmed')" class="help is-danger">确认密码不一致</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">用户姓名</label>
          <div class="col-sm-7">
            <input type="text" v-model="addParams.name" class="form-control"
                   v-validate="'required|max:20'" name="name"
                   :class="{'is-danger':errors.has('name') }">
            <span v-show="errors.firstByRule('name', 'required')" class="help is-danger">请输入用户姓名</span>
            <span v-show="errors.firstByRule('name', 'max')" class="help is-danger">用户姓名长度不能超过20</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">电子邮箱</label>
          <div class="col-sm-7">
            <input type="text" v-model="addParams.email" class="form-control" name="email"
                   v-validate="'required|email|max:50'" :class="{'is-danger':errors.has('email') }">
            <span v-show="errors.firstByRule('email', 'required')" class="help is-danger">请输入电子邮箱</span>
            <span v-show="errors.firstByRule('email', 'email')" class="help is-danger">请输入正确的电子邮箱</span>
            <span v-show="errors.firstByRule('email', 'max')" class="help is-danger">电子邮箱长度不能超过50</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系电话</label>
          <div class="col-sm-7">
            <input type="text" v-model="addParams.phone" class="form-control" name="phone"
                   v-validate="'required|phone'" :class="{'is-danger':errors.has('phone') }">
            <span v-show="errors.firstByRule('phone', 'required')" class="help is-danger">请输入联系电话</span>
            <span v-show="errors.firstByRule('phone', 'phone')" class="help is-danger">{{ errors.first('phone')
              }}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">用户类型</label>
          <div class="col-sm-7">
            <select v-model="addParams.userType" class="form-control" name="userType"
                    v-validate="'required'" :class="{'is-danger':errors.has('userType') }">
              <option value="">--请选择--</option>
              <option v-for="option in userTypeList" :value="option.value">{{ option.name}}</option>
            </select>
            <span v-show="errors.has('userType')" class="help is-danger">请选择用户类型</span>
          </div>
        </div>
        <div class="form-group" v-if="addParams.userType == INTERFACE_USER.value">
          <label class="col-sm-3 control-label">所属企业</label>
          <div class="col-sm-7">
            <select v-model="addParams.enterpriseId" class="form-control" name="enterpriseId"
                    v-validate="'required'" :class="{'is-danger':errors.has('enterpriseId') }">
              <option value="">--请选择--</option>
              <option v-for="option in enterpriseList" :value="option.enterpriseId">{{ option.enterpriseName}}</option>
            </select>
            <span v-show="errors.has('enterpriseId')" class="help is-danger">请选择所属企业</span>
          </div>
        </div>
        <div class="form-group" v-if="addParams.userType == SYS_USER.value">
          <label class="col-sm-3 control-label">所属部门</label>
          <div class="col-sm-7">
            <select v-model="addParams.departmentId" class="form-control" name="departmentId"
                    v-validate="'required'" :class="{'is-danger':errors.has('departmentId') }">
              <option value="">--请选择--</option>
              <option v-for="option in departmentList" :value="option.departmentId">{{ option.departmentName}}</option>
            </select>
            <span v-show="errors.has('departmentId')" class="help is-danger">请选择所属部门</span>
          </div>
        </div>
        <div class="form-group" v-if="addParams.userType == SYS_USER.value">
          <label class="col-sm-3 control-label">角色</label>
          <div class="col-sm-7">
            <span v-for="(item, index) in roleList" style="font-size: 15px;">
              <input type="checkbox" v-model="addParams.roleIdList" v-validate="'required'" name="roleIdList" :value="item.roleId"
                     :class="{'is-danger':errors.has('roleIdList') }"> {{ item.roleName }}
              <br v-if="(index + 1)%4 == 0"/>
            </span>
            <span v-show="errors.has('roleIdList')" class="help is-danger">请选择角色</span></div>
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
  import IptModal from '@/components/common/modal'
  import {Validator} from 'vee-validate'

  export default {
    components: {
      IptModal
    },
    props: {
      userManageTableParams: {}
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        addParams: {
          departmentId: '',
          username: '',
          name: '',
          password: '',
          confirmPassword: '',
          email: '',
          phone: '',
          userType: '',
          enterpriseId: '',
          roleIdList: []
        },
        departmentList: [],
        roleList: [],
        userTypeList: [],
        enterpriseList: [],
        SYS_USER: {},
        INTERFACE_USER: {},
        submitted: false
      }
    },
    methods: {
      init: function () {
        let _this = this
        Api.DepartmentManage.getUserDepartmentList().then((data) => {
          _this.departmentList = data.data
        })
        Api.RoleManage.findAllRoleList().then((data) => {
          _this.roleList = data.data
        })
        Api.UserManage.getUserTypeEnumList().then((data) => {
          _this.userTypeList = data.data.userTypeList
          _this.SYS_USER = data.data.SYS_USER
          _this.INTERFACE_USER = data.data.INTERFACE_USER
        })
        Api.UserManage.getEnterpriseList().then((data) => {
          _this.enterpriseList = data.data
        })
        Validator.extend('phone', {
          getMessage(field, args) {
            return '请输入正确的联系电话'
          },
          validate(value, args) {
            let reg1 = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
            let reg2 = /^(0[0-9]{2,3}[-]?)?([2-9][0-9]{6,7})$/
            if (!reg1.test(value) && !reg2.test(value)) {
              return false
            }
            return true
          }
        })
      },
      saveAdd: function () {
        let _this = this
        _this.$validator.validateAll().then((result) => {
          if (result && !_this.submitted) {
            _this.submitted = true
            Api.UserManage.addUser(_this.addParams).then((data) => {
              _this.submitted = false
              _this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (data.status === 200) {
                    $('#userAdd div.modal-header > button[aria-label="Close"]').trigger('click')
                    _this.getUserManageTableData(this.userManageTableParams)
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
        this.init()
        this.$validator.reset()
      },
      ...mapActions({
        getUserManageTableData: 'getUserManageTableData'
      })
    }
  }
</script>
