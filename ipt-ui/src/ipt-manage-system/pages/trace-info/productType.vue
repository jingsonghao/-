<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>追溯信息</a></li>
      <li class="active jsh-active">重要产品类别管理</li>
    </ol>
    <div class="col-lg-3">
      <div class="shadow-boxs">
        <div class="tree-menu st_tree">
          <ul>
            <li>
              <a style="cursor:default">重要产品</a>
              <ul v-for="menuItem in treeMenuData.data">
                <tree-menu :model="menuItem" :flag="true" v-on:chCurrent="changeCurrent" v-on:hasgetData="getData"></tree-menu>
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
                  <th>类别名称</th>
                  <th>类别编码</th>
                  <th>类别描述</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>{{currentData.cateName}}</td>
                  <td>{{currentData.cateCode}}</td>
                  <td>{{currentData.description}}</td>
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
                  <th>类别名称</th>
                  <th>类别编码</th>
                  <th>类别描述</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in currentData.children">
                  <td>{{index+1}}</td>
                  <td>{{item.cateName}}</td>
                  <td>{{item.cateCode}}</td>
                  <td>{{item.description}}</td>
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
  import {mapGetters} from 'vuex'
  import TreeMenu from "@/ipt-manage-system/components/trace-info/treeMenuProductType"
  export default {
    data() {
      return {
        currentData: {
          cateLevel:"",
          cateName:"",
          cateCode:"",
          cateCodes:"",
          description:"",
          children:[]
        }
      }
    },
    components: {
      TreeMenu
    },
    computed: mapGetters({
      treeMenuData: 'proTypeInfoTableDate'
    }),
    methods: {
      changeCurrent(data) {
        this.currentData = data
      },
      getData() {
        this.currentData = this.treeMenuData.data[0]
      }
    },
    created() {
      this.$store.dispatch('getProTypeInfoTableDate', {})
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
