<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>组织权限管理</a></li>
      <li class="active jsh-active">权限管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>角色名</label>
            <input type="text" class="form-control search-01" placeholder="请输入角色名" style="width: 150px;"
                   v-model="permissionManageTableParams.roleName">
          </div>
          <div class="form-group">
            <label>角色描述</label>
            <input type="text" class="form-control search-01" placeholder="请输入角色描述" style="width: 150px;"
                   v-model="permissionManageTableParams.description">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
          </div>
        </form>
      </div>
    </div>
    <ipt-edit id="permissionEdit" :findParams="editParams" :tableParams="permissionManageTableParams"></ipt-edit>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="permissionManageTableData"
                   :tableConfig.sync="permissionManageTableConfig"
                   :params="permissionManageTableParams">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="edit-link" @click="editBtn(scope.columnData)" data-toggle="modal" data-target="#permissionEdit">修改权限</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptEdit from "@/ipt-manage-system/components/org-manage/permissionEdit.vue"
  import Api from '@/ipt-manage-system/api'

  export default {
    components: {
      IptTable, IptEdit
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        permissionManageTableParams: {
          roleName: '',
          description: ''
        },
        permissionManageTableConfig: {
          getApi: 'getPermissionManageTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "权限管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '角色名', data: 'roleName'},
            {title: '角色描述', data: 'description'},
            {title: '功能权限', data: 'resourceNames'}
          ]
        },
        editParams: {},
        menuTreeList: [],
        selectKeys: []
      }
    },
    methods: {
      init: function () {
        this.getPermissionManageTableData(this.permissionManageTableParams)
      },
      reset: function () {
        let _this = this
        Object.assign(_this.$data.permissionManageTableParams, _this.$options.data().permissionManageTableParams)
      },
      search: function () {
        this.getPermissionManageTableData(this.permissionManageTableParams)
      },
      editBtn: function (columnData) {
        let _this = this
        Api.PermissionManage.findRoleVOById(columnData.roleId).then((data) => {
          _this.editParams = data.data
        })
      },
      ...mapActions({
        getPermissionManageTableData: 'getPermissionManageTableData'
      })
    },
    computed: mapGetters({
      permissionManageTableData: 'permissionManageTableData'
    })
  }
</script>
