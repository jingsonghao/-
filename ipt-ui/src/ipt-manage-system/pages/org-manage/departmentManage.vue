<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>组织权限管理</a></li>
      <li><a>用户管理</a></li>
      <li class="active jsh-active">部门管理</li>
    </ol>
    <div class="col-lg-4">
      <div class="shadow-boxs">
        <div class="article-content-top" style="padding-left: 10px;padding-top: 10px;font-size: 15px;"> 部门管理 </div>
        <div class="col-lg-12">
          <ul class="classification-list classification-list-two">
            <div class="classification-list-title" v-if="parentDepartment !== null">
              <span style="cursor: default;">{{ parentDepartment.departmentName }}</span>
              <a class="move"><i class="fa fa-arrows"></i></a>
              <a class="edit-link" @click="editBtn(parentDepartment)" data-toggle="modal" data-target="#departmentEdit">编辑</a>
            </div>
            <li v-for="item in departmentList">
              <span style="cursor: default;">{{ item.departmentName }}</span>
              <a class="move"><i class="fa fa-arrows"></i></a>
              <a class="edit-link" @click="editBtn(item)" data-toggle="modal" data-target="#departmentEdit">编辑</a>
              <a class="delete-link" v-if="item.enable == ENABLE.value" @click="disableBtn(item)">禁用</a>
              <a class="add-link" v-if="item.enable == DISABLE.value" @click="enableBtn(item)">启用</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ipt-edit id="departmentEdit" :findParams="editParams"></ipt-edit>
    <ipt-add-child id="departmentChildAdd"></ipt-add-child>
    <ipt-add-parent id="departmentParentAdd"></ipt-add-parent>
    <div class="col-lg-8">
      <div class="shadow-boxs">
        <div class="article-content-top" style="padding-left: 10px;padding-top: 10px;font-size: 15px;"> 部门结构 </div>
        <div class="col-lg-12">
          <div class="classification-content clearfix">
            <div class="col-xs-4 classification-content-nav">
              <p v-if="parentDepartment !== null" style="font-size: 20px;">
                <span style="margin-right: 20px;cursor: default;">
                {{ parentDepartment.departmentName }} </span> &gt;&gt;
              </p>
            </div>
            <div class="col-xs-8 pull-right">
              <div class="col-xs-7 breed-center-r">
                <div class="table-j">
                  <table>
                    <tbody class="text-center">
                    <tr v-for="item in departmentList">
                      <td style="text-align: left;cursor: default;" v-if="item.enable == ENABLE.value">{{ item.departmentName }}
                      <td style="text-align: left;color: #969696;cursor: not-allowed;"
                          v-else-if="item.enable == DISABLE.value">{{ item.departmentName }}
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div class="text-center mt-20" style="margin-top: 20px;">
                    <a v-if="parentDepartment === null" class="btn btn-reset" @click="addParentDepartment()"
                       style="font-size: 15px;padding: 5px 15px" data-toggle="modal" data-target="#departmentParentAdd">
                      添加父部门 </a>
                    <a v-else-if="parentDepartment !== null" class="btn btn-search" @click="addChildDepartment()"
                       style="font-size: 15px;padding: 5px 15px" data-toggle="modal" data-target="#departmentChildAdd">
                      添加子部门 </a>
                    <a class="btn btn-reset" @click="returnBack()"
                       style="font-size: 15px;padding: 5px 15px"> 返回用户管理 </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptAddChild from '@/ipt-manage-system/components/org-manage/departmentChildAdd.vue'
  import IptAddParent from '@/ipt-manage-system/components/org-manage/departmentParentAdd.vue'
  import IptEdit from '@/ipt-manage-system/components/org-manage/departmentEdit.vue'
  import Api from '@/ipt-manage-system/api'

  export default {
    components: {
      IptAddChild, IptAddParent, IptEdit
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        ENABLE: {},
        DISABLE: {},
        editParams: {}
      }
    },
    methods: {
      init: function () {
        let _this = this
        Api.EquipmentType.getPageQueryList().then((data) => {
          _this.ENABLE = data.data.ENABLE
          _this.DISABLE = data.data.DISABLE
        })
        this.getDepartmentManageList()
        this.getParentDepartment()
      },
      returnBack: function () {
        window.history.go(-1)
      },
      search: function () {
        let _this = this
        _this.getDepartmentManageList()
        _this.getParentDepartment()
      },
      editBtn: function (columnData) {
        let _this = this
        Api.DepartmentManage.findByDepartmentId(columnData.departmentId).then((data) => {
          _this.editParams = data.data
        })
      },
      disableBtn: function (columnData) {
        let _this = this
        _this.$confirm('确认禁用【' + JSON.stringify(columnData.departmentName) + '】部门吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.DepartmentManage.disableDepartment(columnData.departmentId).then((data) => {
            _this.$message({
              type: 'success',
              message: '禁用【' + JSON.stringify(columnData.departmentName) + '】部门成功!'
            })
            _this.search()
          })
        })
      },
      enableBtn: function (columnData) {
        let _this = this
        _this.$confirm('确认启用【' + JSON.stringify(columnData.departmentName) + '】部门吗?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          Api.DepartmentManage.enableDepartment(columnData.departmentId).then((data) => {
            _this.$message({
              type: 'success',
              message: '启用【' + JSON.stringify(columnData.departmentName) + '】部门成功!'
            })
            _this.search()
          })
        })
      },
      ...mapActions({
        getDepartmentManageList: 'getDepartmentManageList',
        getParentDepartment: 'getParentDepartment'
      })
    },
    computed: mapGetters({
      departmentList: 'departmentList',
      parentDepartment: 'parentDepartment'
    })
  }
</script>
<style>
  .classification-content {
    position: relative;
    padding: 30px 0;
  }

  .classification-content input[type="text"] {
    border-radius: 0 !important;
    background-color: #fff;
    border: 1px solid #d5d5d5;
    padding: 5px 4px;
    line-height: 1.2;
    font-size: 14px;
    font-family: inherit;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    -webkit-transition-duration: .1s;
    transition-duration: .1s;
  }

  .classification-content-nav {
    display: block;
    text-align: center;
    position: absolute;
    top: 50%;
    margin-top: -9px;
  }

  .classification-content table {
    width: 100%;
  }

  .classification-content table tr td {
    line-height: 50px;
  }

  .classification-content table input {
    width: 100%;
  }
  .classification-list.classification-list-two li span{
    color: #1a1a1a;
  }
  .classification-list-title a{
    color: #48b6d9;
  }
  .classification-list.classification-list-two .move{
    cursor: default;
    color: #48b6d9;
  }
  .classification-list.classification-list-two .classification-list-title span{
    color: #1a1a1a;
  }
</style>
