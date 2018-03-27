<template>
  <div>
    <!--头部-->
    <ipt-header></ipt-header>
    <!--菜单-->
    <ipt-menu :menuList="menuList.data"></ipt-menu>
    <!--主体-->
    <router-view></router-view>

    <ipt-footer></ipt-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptHeader from '@/components/common/header.vue'
  import IptMenu from '@/components/common/menu.vue'
  import IptFooter from '@/components/common/footer.vue'

  export default {
    components: {
      IptHeader
      , IptMenu
      , IptFooter
    },
    created() {
      this.getMenuList()
    },
    computed: mapGetters({
      menuList: 'menuList'
    }),
    methods: {
      ...mapActions({
        getMenuList: 'getMenuList'
      })
    }
  }
</script>

<style>

</style>
