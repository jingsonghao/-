<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>设备管理</a></li>
      <li class="active jsh-active">设备库存管理</li>
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
          { name: '完好设备库存', path: 'normalEquipmentStorage' },
          { name: '损坏设备库存', path: 'abnormalEquipmentStorage' }
        ]
      }
    }
  }
</script>
<style>
</style>
