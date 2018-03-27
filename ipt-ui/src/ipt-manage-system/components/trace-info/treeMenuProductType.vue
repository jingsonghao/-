<template>
  <li>
    <a @click="toggle" >
      {{ model.cateName }}
    </a>
    <ul v-show="open" v-if="isFolder">
      <tree-menu v-for="(item, index) in model.children" :key="index" :model="item" :flag="false"  v-on:chCurrent="changeCurrent"></tree-menu>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'treeMenu',
    props: ['model', 'flag'],
    data() {
      return {
        open: this.flag
      }
    },
    computed: {
      isFolder: function() {
        return this.model.children && this.model.children.length
      }
    },
    methods: {
      toggle: function() {
        if (this.isFolder) {
         this.open = !this.open
         }
        this.$emit('chCurrent', this.model)
      },
      changeCurrent: function(data) {
        this.$emit('chCurrent', data)
      }
    },
    mounted: function () {
      this.$emit('hasgetData')
    }
  }
</script>
<style>
  .st_tree a{
    text-decoration:none;
    color:#0c81f8;
  }
  .st_tree a:hover{
    color:rgb(9,197,227);
  }
  .st_tree ul>ul{
    margin-left: 30px;
  }
  .st_tree ul>li>a{
    position: relative;
    padding-left: 30px;
    line-height: 32px;
  }
  .st_tree>ul>li>a:after{
    display: block;
    content: ' ';
    width: 8px;
    height: 8px;
    background-color: #60b9eb;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -3px;
  }
  .st_tree>ul>li>ul>li>a:after{
    display: block;
    content: ' ';
    width: 8px;
    height: 8px;
    background-color: #60b9eb;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -3px;
  }
  .st_tree>ul>li>ul>li>ul a:after{
    display: block;
    content: ' ';
    width: 8px;
    height: 8px;
    border: 1px solid #47b238;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -3px;
  }
  .st_tree ul>li>ul{
    padding-left: 30px;
  }
  .st_tree ul ul>li{
    position: relative;
  }
  .st_tree ul ul>li:hover{
    color:rgb(9,197,227);
    cursor: pointer;
  }

  .st_tree ul ul>li.active{
    color:rgb(9,197,227);
  }

</style>
