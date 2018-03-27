<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li class="active jsh-active">系统内部权限</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>服务端节点</label>
            <input type="text" class="form-control search-01" placeholder="请输入服务端节点" style="width: 150px;"
                   v-model="systemInnerPermissionTableParams.code">
          </div>
          <div class="form-group">
            <label>服务端名称</label>
            <input type="text" class="form-control search-01" placeholder="请输入服务端名称" style="width: 150px;"
                   v-model="systemInnerPermissionTableParams.name">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" @click="deleteChecked"> 批量删除 </button>
          </div>
        </form>
      </div>
    </div>
    <ipt-edit-secret id="systemInnerPermissionSecretEdit" :findParams="editParams"
                     :systemInnerPermissionTableParams="systemInnerPermissionTableParams"></ipt-edit-secret>
    <ipt-edit-service id="systemInnerPermissionServiceEdit" :findParams="editParams"
                      :clientList="clientList"
                      :systemInnerPermissionTableParams="systemInnerPermissionTableParams"></ipt-edit-service>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="systemInnerPermissionTableData"
                   :tableConfig.sync="systemInnerPermissionTableConfig"
                   :params="systemInnerPermissionTableParams">
          <th slot="beforeTitle">
            全选<input type="checkbox" @change="checkAll" v-model="checkAllBox">
          </th>
          <td slot="beforeBody" slot-scope="scope">
            <input type="checkbox" v-model="checkAllBoxList" :value="scope.columnData.clientId">
          </td>
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="edit-link" @click="editServiceBtn(scope.columnData)" data-toggle="modal"
               data-target="#systemInnerPermissionServiceEdit">修改权限</a>
            <a class="add-link" @click="editSecretBtn(scope.columnData)" data-toggle="modal"
               data-target="#systemInnerPermissionSecretEdit">修改密钥</a>
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
  import IptEditSecret from "@/ipt-manage-system/components/systemInnerPermissionSecretEdit.vue"
  import IptEditService from "@/ipt-manage-system/components/systemInnerPermissionServiceEdit.vue"
  import Api from '@/ipt-manage-system/api'

  export default {
    components: {
      IptTable, IptEditSecret, IptEditService
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        systemInnerPermissionTableParams: {
          code: '',
          name: ''
        },
        systemInnerPermissionTableConfig: {
          getApi: 'getSystemInnerPermissionTableData',
          title: "系统内部权限",
          showTitle: true,
          display: 10,
          pagegroup: 5,
          sequenceShow: true,
          columns: [
            {title: '服务端节点', data: 'code'},
            {title: '服务端名称', data: 'name'},
            {title: '密钥', data: 'secret'},
            {title: '客户端列表', data: 'clientNames'}
          ]
        },
        clientList: [],
        checkAllBoxList: [],
        checkAllBox: false,
        editParams: {
          clientIdList: []
        }
      }
    },
    methods: {
      init: function () {
        this.getSystemInnerPermissionTableData(this.systemInnerPermissionTableParams)
      },
      checkAll: function (event) {
        let _this = this
        if (!event.currentTarget.checked) {
          _this.checkAllBoxList = []
        } else {
          _this.checkAllBoxList = _this.systemInnerPermissionTableData.data.map(item => item.clientId)
        }
      },
      deleteChecked: function () {
        let _this = this
        if (_this.checkAllBoxList === null || _this.checkAllBoxList.length <= 0) {
          _this.$alert("请先选择要删除数据！", "提示", {type: "error"})
        } else {
          _this.$confirm('确认批量删除选择的服务端吗?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            Api.SystemInnerPermission.batchDelete(_this.checkAllBoxList).then((data) => {
              if (data.status === 200) {
                _this.search()
                _this.$message({
                  type: 'success',
                  message: data.msg
                })
              } else {
                _this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          })
        }
      },
      reset: function () {
        let _this = this
        Object.assign(_this.$data.systemInnerPermissionTableParams, _this.$options.data().systemInnerPermissionTableParams)
      },
      search: function () {
        this.getSystemInnerPermissionTableData(this.systemInnerPermissionTableParams)
      },
      editSecretBtn: function (columnData) {
        let _this = this
        Api.SystemInnerPermission.findServiceToEditSecret(columnData.clientId).then((data) => {
          _this.editParams = data.data
        })
      },
      editServiceBtn: function (columnData) {
        let _this = this
        Api.SystemInnerPermission.findClientServiceList(columnData.clientId).then((data) => {
          _this.clientList = data.data
        })
        Api.SystemInnerPermission.findServiceVO(columnData.clientId).then((data) => {
          _this.editParams = data.data
        })
      },
      deleteBtn: function (columnData) {
        let _this = this
        _this.$confirm('确认删除【' + JSON.stringify(columnData.name) + '】服务端吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.SystemInnerPermission.deleteClientService(columnData.clientId).then((data) => {
            if (data.status === 200) {
              _this.$message({
                type: 'success',
                message: '删除【' + JSON.stringify(columnData.name) + '】服务端成功!'
              })
            } else {
              _this.$message({
                type: 'error',
                message: data.msg
              })
            }
            _this.search()
          })
        })
      },
      ...mapActions({
        getSystemInnerPermissionTableData: 'getSystemInnerPermissionTableData'
      })
    },
    computed: mapGetters({
      systemInnerPermissionTableData: 'systemInnerPermissionTableData'
    })
  }
</script>
