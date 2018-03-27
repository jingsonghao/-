<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>组织权限管理</a></li>
      <li class="active jsh-active">角色管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>角色名</label>
            <input type="text" class="form-control search-01" placeholder="请输入角色名" style="width: 150px;"
                   v-model="roleManageTableParams.roleName">
          </div>
          <div class="form-group">
            <label>角色描述</label>
            <input type="text" class="form-control search-01" placeholder="请输入角色描述" style="width: 150px;"
                   v-model="roleManageTableParams.description">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" data-toggle="modal" data-target="#roleAdd"> 添加角色
            </button>
          </div>
        </form>
      </div>
    </div>
    <ipt-add id="roleAdd" :roleManageTableParams="roleManageTableParams"></ipt-add>
    <ipt-edit id="roleEdit" :findParams="editParams" :tableParams="roleManageTableParams"></ipt-edit>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="roleManageTableData"
                   :tableConfig.sync="roleManageTableConfig"
                   :params="roleManageTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="edit-link" @click="editBtn(scope.columnData)" data-toggle="modal" data-target="#roleEdit">修改</a>
            <a class="delete-link" @click="deleteBtn(scope.columnData)">删除</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptAdd from "@/ipt-manage-system/components/org-manage/roleAdd.vue"
  import IptEdit from "@/ipt-manage-system/components/org-manage/roleEdit.vue"
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
        roleManageTableParams: {
          roleName: '',
          description: ''
        },
        roleManageTableConfig: {
          getApi: 'getRoleManageTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "角色管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '角色名', data: 'roleName'},
            {title: '角色描述', data: 'description'},
            {title: '用户名列表', data: 'userNames'},
            {title: '用户姓名列表', data: 'userRealNames'}
          ]
        },
        editParams: {}
      }
    },
    methods: {
      init: function () {
        this.getRoleManageTableData(this.roleManageTableParams)
      },
      reset: function () {
        let _this = this
        Object.assign(_this.$data.roleManageTableParams, _this.$options.data().roleManageTableParams)
      },
      search: function () {
        this.getRoleManageTableData(this.roleManageTableParams)
      },
      editBtn: function (columnData) {
        let _this = this
        Api.RoleManage.findRoleById(columnData.roleId).then((data) => {
          _this.editParams = data.data
        })
      },
      deleteBtn: function (columnData) {
        let _this = this
        _this.$confirm('确认删除【' + JSON.stringify(columnData.roleName) + '】角色吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.RoleManage.deleteRole(columnData.roleId).then((data) => {
            _this.$message({
              type: 'success',
              message: '删除【' + JSON.stringify(columnData.roleName) + '】角色成功!'
            })
            _this.search()
          })
        })
      },
      ...mapActions({
        getRoleManageTableData: 'getRoleManageTableData'
      })
    },
    computed: mapGetters({
      roleManageTableData: 'roleManageTableData'
    })
  }
</script>
