<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>追溯信息</a></li>
      <li class="active jsh-active">流通节点类别管理</li>
    </ol>
    <div class="col-lg-3">
      <div class="shadow-boxs">
        <div class="tree-menu st_tree">
          <ul>
            <li>
              <a>重要产品</a>
              <ul v-for="menuItem in treeMenuData.data">
                <tree-menu
                  :model="menuItem"
                  v-on:chCurrent="changeCurrent"
                  v-on:hasgetData="getData"
                ></tree-menu>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-9">
      <div class="shadow-boxs">
        <div class="col-lg-12">
          <div class="table-title-box">
            <h3>类别信息</h3>
          </div>
          <div class="table-container">
            <div class="thead-bg"></div>
            <div class="col-xs-12 table-box">
              <table class="table table-condensed">
                <thead>
                <tr>
                  <th>序号</th>
                  <th>节点数据名称</th>
                  <th>数据编码</th>
                  <th>节点数据描述</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>{{currentData.nodeTypeName}}</td>
                  <td>{{currentData.nodeTypeNo}}</td>
                  <td>{{currentData.nodeTypeName}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="shadow-boxs">
        <div class="col-lg-12">
          <div class="table-title-box">
            <h3>子类别信息</h3>
          </div>
          <div class="table-container">
            <div class="thead-bg"></div>
            <div class="col-xs-12 table-box">
              <table class="table table-condensed">
                <thead>
                <tr>
                  <th>序号</th>
                  <th>节点数据名称</th>
                  <th>数据编码</th>
                  <th>节点数据描述</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in currentData.children">
                  <td>{{index+1}}</td>
                  <td>{{item.nodeTypeName}}</td>
                  <td>{{item.nodeTypeNo}}</td>
                  <td>{{item.nodeTypeName}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import TreeMenu from "@/ipt-manage-system/components/trace-info/treeMenuNodeType"
  import Api from '@/ipt-manage-system/api'

  export default {
    data() {
      return {
        treeMenuData: {},
        currentData: {
          nodeTypeName: "",
          nodeTypeNo: "",
          children: []
        }
      }
    },
    components:{
      TreeMenu
    },
    created() {
      Api.NodeTypeRelation.getNodeTypeRelationTreeList().then(data => {
        this.treeMenuData = data
      })
    },
    methods: {
      changeCurrent(data) {
        this.currentData = data
      },
      getData() {
        this.currentData = this.treeMenuData.data[0]
      }
    }
  }
</script>

<style>
  .st_tree {
    padding: 20px;
    line-height: 24px;
  }
  .table-container {
    /*margin-bottom: 24px;*/
  }
</style>
