<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>大数据分析系统</a></li>
      <li class="active jsh-active">大数据报表分析</li>
    </ol>
    <tab-btn-list :tabList="tabList"></tab-btn-list>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/ecmascript-6">
  import TabBtnList from "@/components/common/tabBtnList"
  export default {
    components: { TabBtnList },
    data() {
      return {
        tabList: [
          {name: '消费结构分析', path: 'conStructure'},
          {name: '市场运作分析', path: 'marketRun'}
        ]
      }
    }
  }
</script>

<style>

</style>
