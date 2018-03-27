<template>
   <div class="main">
     <ol class="breadcrumb">
       <li><a>后台管理系统</a></li>
       <li><a>追溯信息</a></li>
       <li class="active jsh-active">流通节点数据管理</li>
     </ol>
     <div class="col-lg-4">
       <!--树形菜单 end-->
       <div class="shadow-boxs">
         <!--<div class="st_tree">-->
           <!--<ul>-->
             <!--<li><a href="#">食用农产品</a></li>-->
             <tree-menu :treeMenuData="treeMenuData"></tree-menu>
           <!--</ul>-->
         <!--</div>-->
       </div>
       <!--树形菜单 end-->
     </div>
     <div class="col-lg-8">
       <div class="shadow-boxs">
         <div class="r-search search2">
           <form class="form form-inline">
             <div class="form-group my-group">
               <button type="button" class="btn btn-reset"  data-toggle="modal" data-target="#new-add-modal"> 新增</button>
               <button type="button" class="btn btn-dange btn-reset"> 删除</button>
             </div>
           </form>
         </div>
         <div class="col-lg-12">
         <ipt-table :tableData="cirNoDateInfoTableDate" :tableConfig="reportConfig"></ipt-table>
           </div>
       </div>
     </div>
   </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptEchart from '@/components/common/echart'
  import TreeMenu from "@/components/common/treeMenu"

  export default {
    data() {
      return {
        reportConfig: {
          getApi: 'getCirNoDateInfoTableDate',
          titleShow: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          checkboxShow: false,
          sequenceShow: true,
          columns: [
            { title: '节点数据类型', data: 'cirNoDaType' },
            { title: '节点数据名称', data: 'corNoDaName' },
            { title: '操作', data: 'operation' }
          ]
        },
        treeMenuData: [
          {
            type: "肉",
            treeLists: [
              {
                id: 1,
                name: "产地"
              },
              {
                id: 2,
                name: "定点屠宰场"
              },
              {
                id: 3,
                name: "批发市场"
              },
              {
                id: 4,
                name: "零售市场"
              },
              {
                id: 5,
                name: "超市"
              }
            ]
          },
          {
            type: "菜",
            treeLists: [
              {
                id: 1,
                name: "产地"
              },
              {
                id: 2,
                name: "批发市场"
              },
              {
                id: 3,
                name: "零售市场"
              },
              {
                id: 4,
                name: "超市"
              },
              {
                id: 5,
                name: "团体消费单位"
              }
            ]
          }
        ]
      }
    },
    components:{
      IptTable, IptEchart, TreeMenu
    },
    computed: mapGetters({
      cirNoDateInfoTableDate: 'cirNoDateInfoTableDate'
    }),
    created() {
      this.$store.dispatch('getCirNoDateInfoTableDate', {page: 1})
    },
    method: {
    }
  }
</script>
<style>
</style>
