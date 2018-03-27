<template>
  <div class="main">
    <ol class="breadcrumb"><li><a>后台管理系统</a></li><li><a>组织权限管理</a></li><li class="active jsh-active">菜单管理</li></ol>
    <!--树形菜单-->
    <div class="shadow-boxs">
      <div class="web-map col-lg-12">
        <div class="web-system" v-for="menuOne in allMenus.data">
          <el-popover placement="bottom-start" trigger="hover">
            <template slot>
              <!--<a href="javascript:;" class="add-link" @click="insert(menuOne)">插入新菜单</a>
              <a href="javascript:;" class="look-link" @click="append(menuOne)">添加子菜单</a>-->
              <a href="javascript:;" class="edit-link" @click="edit(menuOne)">编辑</a>
              <a href="javascript:;" :class="menuOne.enable == 0 ? 'view-link' : 'delete-link'"
                 @click="enable(menuOne)">{{menuOne.enable == 0 ? '启用' : '禁用'}}</a>
            </template>
            <div class="system-name" slot="reference" :class="{'menu-disable': menuOne.enable == 0}">
              <i aria-hidden="true" class="fa" :class="menuOne.icon"></i><span>{{menuOne.resourceName}}</span>
            </div>
          </el-popover>
          <ul v-for="menuTwo in menuOne.childResourceVOList">
            <li class="classA" :class="{'menu-disable': menuTwo.enable == 0}">
              <el-popover placement="bottom-start" trigger="hover">
                <template slot>
                  <!--<a href="javascript:;" class="add-link" @click="insert(menuTwo)">插入新菜单</a>
                  <a href="javascript:;" class="look-link" @click="append(menuTwo)">添加子菜单</a>-->
                  <a href="javascript:;" class="edit-link" @click="edit(menuTwo)">编辑</a>
                  <a href="javascript:;" :class="menuTwo.enable == 0 ? 'view-link' : 'delete-link'"
                     @click="enable(menuTwo)">{{menuTwo.enable == 0 ? '启用' : '禁用'}}</a>
                </template>
                <span slot="reference">
                  {{menuTwo.resourceName}}{{ menuTwo.childResourceVOList.length > 0 ? '：' : ''}}
                </span>
              </el-popover>
            </li>
            <ul class="list">
              <li v-for="menuThree in menuTwo.childResourceVOList" :class="{'menu-disable': menuThree.enable == 0}">
                <el-popover placement="bottom-start" trigger="hover">
                  <template slot>
                    <!--<a href="javascript:;" class="add-link" @click="insert(menuThree)">插入新菜单</a>-->
                    <a href="javascript:;" class="edit-link" @click="edit(menuThree)">编辑</a>
                    <a href="javascript:;" :class="menuThree.enable == 0 ? 'view-link' : 'delete-link'"
                       @click="enable(menuThree)">{{menuThree.enable == 0 ? '启用' : '禁用'}}</a>
                  </template>
                  <span slot="reference">
                    {{menuThree.resourceName}}
                  </span>
                </el-popover>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
    <!--树形菜单 end-->
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import Api from '@/ipt-manage-system/api'

  export default {
    data() {
      return {
      }
    },
    created: function () {
      this.getAllMenus()
    },
    computed: mapGetters({
      allMenus: 'allMenus'
    }),
    methods: {
      insert(menu) {
        console.log(menu)
        this.$prompt('请输入菜单名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请输入菜单名称'
        }).then(({ value }) => {
          console.log(value)
          this.$message({ type: 'success', message: '操作成功!' })
          this.getAllMenus()
        })
      },
      edit(menu) {
        console.log(menu)
        this.$prompt('请输入新的菜单名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请输入菜单名称'
        }).then(({ value }) => {
          Api.MenuManage.update(menu.resourceId, {resourceName: value}).then(data => {
            this.$message({ type: 'success', message: data.msg })
            this.getAllMenus()
          })
        })
      },
      append(menu) {
        console.log(menu)
        this.$prompt('请输入菜单名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请输入菜单名称'
        }).then(({ value }) => {
          console.log(value)
          this.$message({ type: 'success', message: '操作成功!' })
          this.getAllMenus()
        })
      },
      enable(menu) {
        let enable = menu.enable === 0
        this.$confirm(enable ? '启用' : '禁用', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (enable) {
            Api.MenuManage.enable(menu.resourceId).then(data => {
              this.$message({ type: 'success', message: data.msg })
              this.getAllMenus()
            })
          } else {
            Api.MenuManage.disable(menu.resourceId).then(data => {
              this.$message({ type: 'success', message: data.msg })
              this.getAllMenus()
            })
          }
        })
      },
      ...mapActions({
        getAllMenus: 'getAllMenus'
      })
    }
  }
</script>

<style>
  .web-map .web-system{
    font-size: 16px;
    line-height: 22px;
    margin: 30px;
    color: #666;
  }
  .web-system .system-name{
    float: left;
    width: 16%;
    font-weight: bold;
    margin-right: 2%;
    border-right: 1px solid #666;
  }
  .web-system .system-name span{
    padding: 0 10px 0 20px;
  }
  .web-system:nth-child(1) .system-name{
    color: #84edae;
  }
  .web-system:nth-child(2) .system-name{
    color: #4c8eb5;
  }
  .web-system:nth-child(3) .system-name{
    color: #ebca6a;
  }
  .web-system:nth-child(4) .system-name{
    color: #f37b1d;
  }
  .web-system:nth-child(5) .system-name{
    color: #329258;
  }
  .web-system>ul{
    float: right;
    width: 82%;
    margin-bottom: 12px;
  }
  .web-system>ul:nth-last-child(1){
    margin-bottom: 0;
  }
  .web-system>ul>li{
    float: left;
    width: 180px;
  }
  .web-system>ul>ul{
    float: left;
  }
  .web-system>ul>ul>li{
    float: left;
    width: 162px;
  }
  .menu-disable {
    background-color: #C4C4C4;
    color: #FFF;
  }
</style>
