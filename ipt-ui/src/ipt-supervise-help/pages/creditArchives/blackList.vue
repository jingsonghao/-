<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>企业诚信管理</a></li>
      <li class="active jsh-active">黑名单管理</li>
    </ol>
    <tab-btn-list :tabList="tabList"></tab-btn-list>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import TabBtnList from "@/components/common/tabBtnList"
  export default {
    components: {
      TabBtnList
    },
    data() {
      return {
        tabList: [
          {
            name: '企业黑名单',
            path: 'corporateBlacklist'
          },
          {
            name: '个人黑名单',
            path: 'personalBlacklist'
          }
        ]
      }
    }
  }
</script>
