<template>
  <div :id="echartData.id" :style="'height: '+echartData.height+'px'"></div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts'

  export default {
    props: {
      echartData: {}
    },
    data() {
      return {
        // 初始化空对象
        chart: null
      }
    },
    watch: {
      echartData:{
        handler: function (val) {
          this.chart.setOption(val.option, true)
          this.chart.resize()
        },
        deep: true
      }
    },
    methods: {
      // 绘图
      drawMain(id) {
        // 绘图方法
        var that = this
        this.chart = echarts.init(document.getElementById(id))
        // 皮肤添加同一般使用方式
        this.chart.showLoading()
        // set
        this.chart.setOption(that.echartData.option)
        this.chart.hideLoading()
      }
    },
    mounted() {
      var that = this
      window.onresize = function temp() {
        that.chart.setOption(that.echartData.option, true)
        that.chart.resize()
      }
      this.$nextTick(function () {
        this.drawMain(that.echartData.id)
      })
    }
  }
</script>
<style>

</style>
