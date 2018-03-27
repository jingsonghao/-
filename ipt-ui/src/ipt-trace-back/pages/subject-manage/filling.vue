<template>
    <div class="main">
      <ol class="breadcrumb">
        <li><a>追溯管理系统</a></li>
        <li><a>经营主体备案</a></li>
        <li class="active jsh-active">信息备案管理</li>
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
          { name: '法人责任主体备案', path: 'nodeRecord' },
          { name: '节点信息备案', path: 'storeRecord' },
          { name: '自然人责任主体管理', path: 'businessRecord' },
          { name: '管理者备案', path: 'adminRecord' }
        ]
      }
    }
  }
</script>
<style>

</style>
