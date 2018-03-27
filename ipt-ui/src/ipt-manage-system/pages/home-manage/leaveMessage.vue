<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>门户管理</a></li>
      <li class="active jsh-active">公众留言反馈</li>
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
    data: function () {
      return {
        tabList: [
          { name: '未处理信息', path: 'notDealMessage' },
          { name: '已处理信息', path: 'haveDealMessage' }
        ]
      }
    }
  }
</script>
<style>
</style>
