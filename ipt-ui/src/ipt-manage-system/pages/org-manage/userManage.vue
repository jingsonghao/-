<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>组织权限管理</a></li>
      <li class="active jsh-active">用户管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>用户名</label>
            <input type="text" class="form-control search-01" placeholder="请输入用户名" style="width: 150px;"
                   v-model="userManageTableParams.username">
          </div>
          <div class="form-group">
            <label>用户姓名</label>
            <input type="text" class="form-control search-01" placeholder="请输入用户姓名" style="width: 150px;"
                   v-model="userManageTableParams.name">
          </div>
          <div class="form-group">
            <label>状态</label>
            <select class="form-control search-01" v-model="userManageTableParams.enable">
              <option value="">全部</option>
              <option v-for="option in enableList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" data-toggle="modal" data-target="#userAdd"> 添加用户 </button>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-4" style="width: 20%;">
      <div class="shadow-boxs">
        <ul class="classification-list">
          <div class="classification-list-title" v-if="parentDepartment !== null"
             @click="searchDepartment({departmentId: ''})">{{ parentDepartment.departmentName }}</div>
          <li v-for="option in departmentList">
            <a @click="searchDepartment(option)">{{ option.departmentName}}</a>
          </li>
        </ul>
        <div class="col-xs-12">
          <router-link :to="'/manageSystem/orgManage/departmentManage'" class="deep-page pull-right">
            <button type="button" class="btn btn-reset"> 部门管理 </button>
          </router-link>
        </div>
      </div>
    </div>
    <ipt-add id="userAdd" :userManageTableParams="userManageTableParams"></ipt-add>
    <ipt-edit id="userEdit" :userManageTableParams="userManageTableParams" :findParams="editParams"></ipt-edit>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="userManageTableData"
                   :tableConfig.sync="userManageTableConfig"
                   :params="userManageTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="edit-link" @click="editBtn(scope.columnData)" data-toggle="modal" data-target="#userEdit">编辑</a>
            <a class="delete-link" @click="disableBtn(scope.columnData)"
               v-if="scope.columnData.enable == ENABLE.value">禁用</a>
            <a class="add-link" @click="enableBtn(scope.columnData)"
               v-if="scope.columnData.enable == DISABLE.value">启用</a>
            <a class="look-link" @click="resetPassword(scope.columnData)">重置密码</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from '@/components/common/table'
  import IptAdd from '@/ipt-manage-system/components/org-manage/userAdd.vue'
  import IptEdit from '@/ipt-manage-system/components/org-manage/userEdit.vue'
  import Api from '@/ipt-manage-system/api'

  export default {
    components: {
      IptTable, IptAdd, IptEdit
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        userManageTableParams: {
          username: '',
          name: '',
          departmentId: '',
          enable: ''
        },
        userManageTableConfig: {
          getApi: 'getUserManageTableData',
          title: '用户管理',
          showTitle: true,
          display: 10,
          pagegroup: 5,
          sequenceShow: true,
          columns: [
            {title: '用户名', data: 'username'},
            {title: '用户姓名', data: 'name'},
            {title: '电子邮箱', data: 'email'},
            {title: '联系电话', data: 'phone'},
            {title: '用户类型', data: 'userTypeName'},
            {title: '所属部门', data: 'departmentName'},
            {title: '状态', data: 'enableName'}
          ]
        },
        enableList: [],
        departmentList: [],
        ENABLE: {},
        DISABLE: {},
        editParams: {
          roleIdList: []
        }
      }
    },
    methods: {
      init: function () {
        this.initQueryList()
        this.getParentDepartment()
        this.getUserManageTableData(this.userManageTableParams)
      },
      searchDepartment: function (department) {
        this.userManageTableParams.departmentId = department.departmentId
        this.search()
      },
      initQueryList: function () {
        let _this = this
        Api.DepartmentManage.getUserDepartmentList().then((data) => {
          _this.departmentList = data.data
        })
        Api.EquipmentType.getPageQueryList().then((data) => {
          _this.enableList = data.data.enableList
          _this.ENABLE = data.data.ENABLE
          _this.DISABLE = data.data.DISABLE
        })
      },
      reset: function () {
        let _this = this
        Object.assign(_this.$data.userManageTableParams, _this.$options.data().userManageTableParams)
        _this.userManageTableParams.departmentId = ''
        _this.initQueryList()
      },
      search: function () {
        this.getUserManageTableData(this.userManageTableParams)
      },
      editBtn: function (columnData) {
        let _this = this
        Api.UserManage.findUserVOById(columnData.userId).then((data) => {
          _this.editParams = data.data
        })
      },
      resetPassword: function (columnData) {
        let _this = this
        _this.$confirm('重置【' + JSON.stringify(columnData.username) + '】用户的密码为【123456】吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.UserManage.resetPassword(columnData.userId).then((data) => {
            _this.$message({
              type: 'success',
              message: '重置【' + JSON.stringify(columnData.username) + '】用户的密码成功!'
            })
            _this.search()
          })
        })
      },
      disableBtn: function (columnData) {
        let _this = this
        _this.$confirm('确认禁用【' + JSON.stringify(columnData.username) + '】用户吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.UserManage.disableUser(columnData.userId).then((data) => {
            _this.$message({
              type: 'success',
              message: '禁用【' + JSON.stringify(columnData.username) + '】用户成功!'
            })
            _this.search()
          })
        })
      },
      enableBtn: function (columnData) {
        let _this = this
        _this.$confirm('确认启用【' + JSON.stringify(columnData.username) + '】用户吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.UserManage.enableUser(columnData.userId).then((data) => {
            _this.$message({
              type: 'success',
              message: '启用【' + JSON.stringify(columnData.username) + '】用户成功!'
            })
            _this.search()
          })
        })
      },
      ...mapActions({
        getUserManageTableData: 'getUserManageTableData',
        getParentDepartment: 'getParentDepartment'
      })
    },
    computed: mapGetters({
      userManageTableData: 'userManageTableData',
      parentDepartment: 'parentDepartment'
    })
  }
</script>
