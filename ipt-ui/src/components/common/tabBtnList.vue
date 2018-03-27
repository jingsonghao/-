<template>
  <div class="tab-btn-list shadow-boxs">
    <ul class="tab-btn">
      <template v-for="(item, index) in tabList">
        <li :class="{'active': $route.path.indexOf(item.path)!==-1 }"
            v-if="item.isShow === undefined ? true : item.isShow">
          <router-link
            tag="a"
            :to="{path:item.path}">
            {{item.name}}
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      tabList: {
        type: Array,
        default () {
          return [
            {isShow: false, nodeTypeNo: '', name: '', path: ''}
          ]
        }
      }
    },
    watch: {
      tabList: {
        /** yanggang 2018/2/1 默认跳转到第一个有效路由 */
        handler: function (val) {
          for (let i = 0; i < val.length; i++) {
            if (val[i].isShow) {
              this.$router.push(val[i].path)
              break
            }
          }
        },
        deep: true
      }
    }
  }
</script>
<style>

</style>
