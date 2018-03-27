<template>
  <ipt-modal>
    <span slot="modalTitle">修改权限</span>
    <template slot="modalBody">
      <div class="table-title-box">
        <h4> 角色名 ： {{ editParams.roleName }}</h4>
      </div>
      <div class="table-container">
        <div class="col-xs-12">
          <!--
             ref="resourceTree" 关联属性 this.$refs.resourceTree
            :data 树结构数据
            show-checkbox 显示复选框
            node-key="id" 节点key值属性id
            :default-expanded-keys="[2,3]" 默认展开的keys
            :default-checked-keys="[5,6]"  默认选中的keys
            :props="defaultProps" 配置属性
          -->
          <el-tree
            :check-strictly="false"
            ref="resourceTree"
            node-key="id"
            :data="resourceTreeList"
            :show-checkbox="true"
            :default-expanded-keys="[]"
            :default-checked-keys="[]"
            :props="treeProps">
          </el-tree>
        </div>
      </div>
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
    name: 'treeMenu',
    props: {
      tableParams: {},
      findParams: {}
    },
    data: function () {
      return {
        editParams: {
          roleId: '',
          roleName: '',
          selectChildList: []
        },
        submitted: false,
        resourceTreeList: [],
        treeProps: {
          children: 'children',
          label: 'label',
          isLeaf: 'leaf'
        }
      }
    },
    created: function () {
      this.init()
    },
    watch: {
      findParams() {
        this.editParams = JSON.parse(JSON.stringify(this.findParams))
        this.setCheckedKeys(this.editParams.selectChildList)
      }
    },
    methods: {
      getCheckedKeys: function () {
        let _this = this
        return _this.$refs.resourceTree.getCheckedKeys()
      },
      setCheckedKeys(arr) {
        let _this = this
        _this.$refs.resourceTree.setCheckedKeys([])
        _this.$refs.resourceTree.setCheckedKeys(arr)
      },
      init: function () {
        let _this = this
        Api.PermissionManage.getResourceTreeList().then((data) => {
          _this.resourceTreeList = data.data
        })
      },
      saveEdit: function () {
        let _this = this
        if (!_this.submitted) {
          _this.submitted = true
          _this.editParams.selectChildList = _this.getCheckedKeys()
          Api.PermissionManage.modifyPermission(_this.editParams.roleId, _this.editParams).then((data) => {
            _this.submitted = false
            _this.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                if (data.status === 200) {
                  $('#permissionEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                  _this.getPermissionManageTableData(_this.tableParams)
                }
              }
            })
          })
        }
      },
      reset: function () {
        this.editParams = JSON.parse(JSON.stringify(this.findParams))
        this.submitted = false
        this.setCheckedKeys(this.editParams.selectChildList)
      },
      ...mapActions({
        getPermissionManageTableData: 'getPermissionManageTableData'
      })
    }
  }
</script>
<style>
  .el-tree-node__expand-icon, .el-icon-caret-right, .expanded {
    font-size: 20px;
  }
</style>
