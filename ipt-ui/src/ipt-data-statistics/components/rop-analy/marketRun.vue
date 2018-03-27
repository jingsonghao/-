<template>
    <div class="main">
      <div class="shadow-boxs">
        <!--search 搜索框 组件-->
        <div class="r-search">
          <form class="form form-inline">
            <div class="form-group">
              <label>重要产品品种</label>
              <input type="text" class="form-control search-01" placeholder="">
            </div>
            <div class="form-group">
              <label>区域</label>
              <input type="text" class="form-control search-01" placeholder="">
              <!--<select class="form-control search-01">-->
                <!--<option>全部</option>-->
                <!--<option>食品</option>-->
                <!--<option>食品</option>-->
                <!--<option>食用农产品</option>-->
              <!--</select>-->
            </div>
            <div class="form-group">
              <!--双日历插件-->
              <label>时间</label>
              <el-date-picker type="date" placeholder="开始日期" format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"></el-date-picker>
              <label>—</label>
              <el-date-picker type="date" placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </div>
            <div class="form-group my-group">
              <button type="button" class="btn  btn-search"> 查询 </button>
            </div>
          </form>
        </div>
      </div>
      <div class="shadow-boxs">
        <div class="col-lg-6">
          <div class="table-title-box">
            <h3>交易量图表展示</h3>
          </div>
          <ipt-echart :echartData="echartData11"></ipt-echart>
        </div>
        <div class="col-lg-6">
          <div class="col-lg-12">
            <div class="table-title-box">
              <h3>&nbsp;</h3>
            </div>
            <ipt-echart :echartData="echartData12"></ipt-echart>
          </div>
          <div class="col-lg-12">
            <ipt-echart :echartData="echartData13"></ipt-echart>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import IptEchart from '@/components/common/echart'
  export default {
    data() {
      return {
        echartData11: {
          id: 'main1',
          height: '500',
          option: {
            title: {
              text: '交易量',
              x: 'center',
              top: 'top',
              align: 'top',
              textStyle: {
                fontSize: 14,
                color: '#333'
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            legend: {
              data: ['交易量', '价格'],
              textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#333'
              },
              x: 'center',
              top: 'bottom'
            },
            xAxis: [
              {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine: {
                  lineStyle: {
                    color: '#333' //坐标轴线线的颜色。
                  }
                },
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '交易量',
                min: 0,
                max: 250,
                interval: 50,
                axisLine: {
                  lineStyle: {
                    color: '#333' //坐标轴线线的颜色。
                  }
                },
                axisLabel: {
                  formatter: '{value} KG'
                }
              },
              {
                type: 'value',
                name: '价格',
                min: 0,
                max: 25,
                interval: 5,
                axisLine: {
                  lineStyle: {
                    color: '#333' //坐标轴线线的颜色。
                  }
                },
                axisLabel: {
                  formatter: '{value} 元'
                }
              }
            ],
            series: [
              {
                name: '交易量',
                type: 'bar',
                itemStyle:{
                normal:{
                  color:'#84edae'
                }
              },
                data: [2.0, 19.9, 7.0, 23.2, 65.6, 76.7, 135.6, 162.2, 32.6, 80.0, 6.4, 3.3]
              },
              {
                name: '价格',
                type: 'line',
                yAxisIndex: 1,
                itemStyle:{
                color:'#61b8eb',
                normal:{
                  lineStyle:{
                    color:'#61b8eb',
                    width:3
                  }
                }
              },
                data: [8.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
              }
            ]
          }
        },
        echartData12:{
          id: 'main2',
          height: 250,
          option: {
            title : {
              text: '交易量增长率',
              x: 'left',
              align: 'right',
              textStyle: {
                fontSize:14,
                color: '#333'
              }
            },
            backgroundColor: '',
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['同比', '环比'],
              top: 'top',
              textStyle: {
                color: '#333'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisLine: {
                lineStyle: {
                  color: '#333'
                }
              }

            },
            yAxis: {
              axisLine: {
                lineStyle: {
                  color: '#333'
                }
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['#aaa', '#ddd'],
                  type :'solid'
                }
              },
              name: '增长率(%)',
              type: 'value'
            },
            series: [{
              name: '同比',
              type: 'line',
              itemStyle:{
                normal:{
                  color:'#61b8eb',
                  lineStyle:{
                    color:'#61b8eb',
                    width:2
                  }
                }
              },
              data: [42, 5, 3, 39, 55, 2, 6, 42, 5, 3, 39, 55]
            }, {
              name: '环比',
              type: 'line',
              itemStyle:{
                normal:{
                  color:'#ebca6a',
                  lineStyle:{
                    color:'#ebca6a',
                    width:2
                  }
                }
              },
              data: [32, 2, 4, 7, 3, 2, 7, 32, 2, 4, 7, 3]
            }]
          }
        },
        echartData13:{
          id: 'main3',
          height: 250,
          option: {
            title : {
              text: '价格增长率',
              x: 'left',
              align: 'right',
              textStyle: {
                fontSize:14,
                color: '#333'
              }
            },
            backgroundColor: '',
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['环比', '同比'],
              top: 'top',
              textStyle: {
                color: '#333'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisLine: {
                lineStyle: {
                  color: '#333'
                }
              }

            },
            yAxis: {
              axisLine: {
                lineStyle: {
                  color: '#333'
                }
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['#aaa', '#ddd'],
                  type :'solid'
                }
              },
              name: '增长率(%)'

            },
            series: [ {
              name: '环比',
              type: 'line',
              itemStyle:{
                normal:{
                  color:'#f37b1d',
                  lineStyle:{
                    color:'#f37b1d',
                    width:2
                  }
                }
              },
              data: [32, 2, 4, 7, 3, 2, 7, 4, 7, 3, 2, 7],
              color:'#333'
            },
              {
              name: '同比',
              type: 'line',
                itemStyle:{
                  normal:{
                    color:'#64c58b',
                    lineStyle:{
                      color:'#64c58b',
                      width:2
                    }
                  }
                },
              data: [2, 5, 3, 39, 55, 2, 6, 3, 39, 55, 2, 6]
            }]
          }
        }
      }
    },
    components: {
      IptEchart
    }
  }
</script>

<style>

</style>
