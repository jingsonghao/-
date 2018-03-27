<!--纵向的tab-->
<template>
  <div class="shadow-boxs circulation-list">
    <ul>
      <li v-for="(item, index) in tabList"
          :class="{'active': item.path == $route.path.split('/').pop() }"
          :key="item.id">
        <router-link
          tag="a"
          :to="{path:item.path}">
          {{item.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      props: {
        tabList: {
          type: Array,
          default() {
            return [
              { name: '', path: '' }
            ]
          }
        }
      }
    }
</script>
<style>

</style>
