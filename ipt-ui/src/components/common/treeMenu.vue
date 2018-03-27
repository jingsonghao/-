<template>
  <div class="st_tree v_tree_menu">
    <ul>
      <li v-for="(item, index) in treeMenuData">
        <a @click="isShowList(index)">{{ item.type }}</a>
        <ul v-show="index === nowIndex">
          <li v-for="(list, dex) in item.treeLists" @click="chooseList(dex)" :class="{ active:dex === nowDex }">{{ list.name }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      props: {
        treeMenuData: {
          type: Array
        }
      },
      data() {
        return {
          nowIndex: 0,
          nowDex: null
        }
      },
      methods: {
        isShowList(index) {
          this.nowIndex = index
        },
        chooseList(dex) {
          this.nowDex = dex
          const listId = this.treeMenuData[this.nowIndex].treeLists[dex].id
          this.$emit('on-change', listId)
        }
      }
    }
</script>

<style scoped>
  /*树形菜单*/

  .v_tree_menu.st_tree{
    padding:20px;
    line-height: 24px;
  }
  .v_tree_menu.st_tree a{
    text-decoration:none;
    color:#337ab7;
  }
  .v_tree_menu.st_tree a:hover{
    color:rgb(9,197,227);
  }
  .v_tree_menu.st_tree>ul>ul{
    margin-left: 30px;
  }
  .v_tree_menu.st_tree>ul>li>a{
    position: relative;
    padding-left: 30px;
    line-height: 32px;
  }
  .v_tree_menu.st_tree>ul>li>a:before{
    display: block;
    content: ' ';
    width: 6px;
    height: 6px;
    background-color: #ddd;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -3px;
  }
  .v_tree_menu.st_tree>ul>li>ul{
    padding-left: 60px;
  }
  .v_tree_menu.st_tree>ul ul>li{
    position: relative;
  }
  .v_tree_menu.st_tree>ul ul>li:hover{
    color:rgb(9,197,227);
    cursor: pointer;
  }
  .v_tree_menu.st_tree>ul ul>li:before{
    display: block;
    content: ' ';
    width: 6px;
    height: 6px;
    border: 1px solid #ddd;
    border-radius: 50%;
    position: absolute;
    left: -20px;
    top: 50%;
    margin-top: -3px;
  }
  .v_tree_menu.st_tree>ul ul>li.active{
    color:rgb(9,197,227);
  }

  /*树形菜单 end*/
</style>
