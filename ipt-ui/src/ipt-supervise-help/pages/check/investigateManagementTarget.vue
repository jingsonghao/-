<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>工作考核管理</a></li>
      <li class="active jsh-active">考核指标管理</li>
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
            name: '考核指标库管理',
            path: 'indexBase'
          },
          {
            name: '考核指标设置项管理',
            path: 'indexSettings'
          }
        ]
      }
    }
  }
</script>
