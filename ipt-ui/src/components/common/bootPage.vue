<template>
  <nav class="pull-right">
    <ul class="pagination pagination-sm">
      <li :class="{'disabled': pageConfig.currentPage == 1}">
        <a href="javascript:;" @click="setCurrent(pageConfig.currentPage - 1)"> « </a>
      </li>
      <li :class="{'disabled': pageConfig.currentPage == 1}">
        <a href="javascript:;" @click="setCurrent(1)"> 首页 </a>
      </li>
      <li v-for="p in grouplist" :class="{'active': pageConfig.currentPage == p.val}">
        <a href="javascript:;" @click="setCurrent(p.val)">{{ p.text }}</a>
      </li>
      <li :class="{'disabled': pageConfig.currentPage == page}">
        <a href="javascript:;" @click="setCurrent(page)"> 尾页 </a>
      </li>
      <li :class="{'disabled': pageConfig.currentPage == page}">
        <a href="javascript:;" @click="setCurrent(pageConfig.currentPage + 1)"> »</a></li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      pageConfig: { },
      params: { }
    },
    computed: {
      pagegroup() {
        let v = this.pageConfig.pagegroup
        v = v > 0 ? v : 5
        return v % 2 === 1 ? v : v + 1
      },
      page: function () { // 总页数
        return Math.ceil(this.pageConfig.totalRecords / this.pageConfig.display)
      },
      grouplist: function () { // 获取分页页码
        var len = this.page
        var temp = []
        var list = []
        var count = Math.floor(this.pagegroup / 2)
        var center = this.pageConfig.currentPage
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len})
          }
          return temp
        }
        while (len--) {
          temp.push(this.page - len)
        }
        var idx = temp.indexOf(center)
        if (idx < count) {
          center = center + count - idx
        }
        if (this.pageConfig.currentPage > this.page - count) {
          center = this.page - count
        }
        temp = temp.splice(center - count - 1, this.pagegroup)
        do {
          var t = temp.shift()
          list.push({
            text: t,
            val: t
          })
        } while (temp.length)
        if (this.page > this.pagegroup) {
          if (this.pageConfig.currentPage > count + 1) {
            list.unshift({text: '...', val: list[0].val - 1})
          }
          if (this.pageConfig.currentPage < this.page - count) {
            list.push({text: '...', val: list[list.length - 1].val + 1})
          }
        }
        return list
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.pageConfig.currentPage !== idx && idx > 0 && idx < this.page + 1) {
          this.pageConfig.currentPage = idx
          this.params.page = idx
          this.params.size = this.pageConfig.display
          this.$store.dispatch(this.pageConfig.getApi, this.params)
        }
      }
    }
  }
</script>

<style scoped>
  /*分页*/
  .pagination{
    margin: 10px 0;
  }
  .pagination>li>a, .pagination>li>span{
    padding: 3px 10px;
    font-size: 15px;
    background-color: transparent;
    color: #000;
    border: none;
  }
  .pagination>.disabled>a, .pagination>.disabled>a:focus, .pagination>.disabled>a:hover, .pagination>.disabled>span, .pagination>.disabled>span:focus, .pagination>.disabled>span:hover{
    background-color: #5A98DE;
    color: #fff;
  }
  .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover{
    background-color: transparent;
    color: #5A98DE;
  }
  .pagination>li>a:focus, .pagination>li>a:hover, .pagination>li>span:focus, .pagination>li>span:hover{
    color: #5A98DE;
    background-color: rgba(71,190,252,0.2);
  }
  /*分页 end*/

</style>
