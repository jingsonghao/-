<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>追溯管理系统</a></li>
      <li><a>经营主体管理</a></li>
      <li class="add-link jsh-active">信息备案审核</li>
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
          { name: '法人责任主体审核', path: 'nodeRecord' },
          { name: '节点信息审核', path: 'storeRecord' },
          { name: '自然人责任主体审核', path: 'businessRecord' },
          { name: '管理者审核', path: 'adminRecord' }
        ]
      }
    }
  }
</script>
<style>

</style>
