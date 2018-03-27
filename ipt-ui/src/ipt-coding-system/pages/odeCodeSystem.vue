<template>
  <div class="main zcoding">
    <ol class="breadcrumb">
      <li><a>赋码系统</a></li>
      <li class="active jsh-active">系统首页</li>
    </ol>
    <div class="col-lg-7">
      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12">

            <!--表格标题部分-->
            <div class="table-title-box">
              <h3>近一年追溯码发放数量统计</h3>
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="echartCodeGrantData"></ipt-echart>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12">

            <!--表格标题部分-->
            <div class="table-title-box">
              <h3>各流通环节追溯码发放数量走势分析</h3>
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="echartTrendAnalysisData"></ipt-echart>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-5">
      <div class="shadow-boxs" style="height: 372px;">
        <div class="col-lg-12 col-12">
          <div class="sum" style="background-color:#fff;">
            <span class="text-left" style="font-size: 16px;font-weight: 700;">今日追溯码发放数量</span>
            <!--<span class="flr">2017.12.27</span>-->
          </div>

          <div class="col-lg-12 zole">
            <div class="col-sm-6 zole"><span class="esmdeal">200<br><span class=" codedeals">种养殖</span></span></div>
            <div class="col-sm-6 zole"><span class="esmdeal">5<br><span class=" codedeals">加工</span></span></div>
            <div class="col-sm-6 zole"><span class="esmdeal">2<br><span class="  codedeals">仓储配送</span></span></div>
            <div class="col-sm-6 zole"><span class="esmdeal">500<br><span class=" codedeals">超市</span></span></div>
          </div>
        </div>
        <!--<div class="col-lg-12">-->
        <!--<ipt-table :tableData="analysisReportTableData" :tableConfig="analysisReportConfig" :pagerShow="false"-->
        <!--:params="analysisReportParams"></ipt-table>-->
        <!--</div>-->
      </div>
      <div class="shadow-boxs ">
        <div class="col-lg-12">
          <!--表格标题部分-->
          <div class="table-title-box">
            <h3>追溯码使用率</h3>
          </div>
          <!--考核评价图标-->
          <ipt-echart :echartData="echartNumberQueryStatisticsData"></ipt-echart>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import IptEchart from '@/components/common/echart'

  export default {
    data () {
      return {
        echartCodeGrantData: { //追溯码发放数量
          id: 'main1',
          height: 300,
          option: {
            title: {
              text: '',
              textStyle: {
                color: '#333'
              },
              left: 'left'
            },
            textStyle: {
              fontSize: 15,
              color: '#333'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#333'
                }
              }
            },
            legend: {
              data: ['追溯码发放数量']
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            xAxis: [{
              type: 'category',
              data: ['2016/10', '2016/11', '2016/12', '2017/1', '2017/2', '2017/3', '2017/4', '2017/5', '2017/6', '2017/7', '2017/8', '2017/9'],
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                interval: 0,
                textStyle: {
                  color: '#333',
                  fontSize: '16'
                },
                rotate: 30
              }
            }],
            yAxis: [
              {
                type: 'value',
                name: '追溯码发放数量/条',
                min: 0,
                max: 100,
                interval: 10,
                splitLine: {
                  lineStyle: {
                    // 使用深浅的间隔色
                    color: ['rgba(255,255,255,0)']
                  }
                },
                axisLabel: {
                  formatter: '{value} ',
                  textStyle: {
                    color: '#333',
                    fontSize: '16'
                  }
                }
              },
              {
                type: 'value',
                name: '追溯码发放数量（同比）',
                min: 0,
                max: 100,
                interval: 10,
                splitLine: {
                  lineStyle: {
                    // 使用深浅的间隔色
                    color: ['rgba(255,255,255,0)']
                  }
                },
                axisLabel: {
                  formatter: '{value} %',
                  textStyle: {
                    color: '#333',
                    fontSize: '16'
                  }
                }
              }
            ],
            series: [
              {
                name: '追溯码发放数量',
                type: 'bar',
                yAxisIndex: 1,
                data: [89, 86, 84, 75, 79, 100, 80, 86, 88, 79, 75, 79],
                barWidth: 30,
                itemStyle: {
                  //通常情况下：
                  normal: {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: '#61b8eb'
                  },
                  //鼠标悬停时：
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              },
              {
                name: '追溯码发放数量(同比)',
                type: 'line',
                yAxisIndex: 1,
                data: [10, 8, 3, 5, 7, 11, 12, 12, 10, 8, 8, 12],
//                barWidth: 30,
                itemStyle: {
                  //通常情况下：
                  normal: {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: '#84edad'
                  },
                  //鼠标悬停时：
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        },
        echartTrendAnalysisData: { //追溯码发放数量走势分析
          id: 'main2',
          height: 300,
          option: {
            title: {
              text: '',
              x: 'center',
              align: 'right',
              textStyle: {
                fontSize: 14,
                color: '#333'
              }
            },
            textStyle: {
              fontSize: 15,
              color: '#333'
            },
            backgroundColor: '',
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['种养殖', '加工', '仓储配送', '超市'],
              textStyle: {
                color: '#333'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              containLabel: true
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333',
                  fontSize: '16'
                }
              }
            },
            yAxis: {
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)'
                }
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['rgba(255,255,255,0)']
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333',
                  fontSize: '16'
                }
              },
              name: '增长率(%)',
              type: 'value'
            },
            series: [{
              name: '种养殖',
              type: 'line',
              data: [42, 5, 3, 39, 55, 2, 6, 42, 5, 3, 39, 55],
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#84edae'
                  }
                }
              }
            },
              {
                name: '加工',
                type: 'line',
                data: [12, 5, 33, 39, 55, 2, 16, 42, 52, 3, 39, 55],
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#ebca6a'
                    }
                  }
                }
              },
              {
                name: '仓储配送',
                type: 'line',
                data: [42, 25, 31, 39, 55, 22, 6, 42, 5, 13, 39, 55],
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#4c8fb5'
                    }
                  }
                }
              },
              {
                name: '超市',
                type: 'line',
                data: [32, 2, 4, 7, 3, 2, 7, 32, 2, 4, 7, 3],
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#e78f48'
                    }
                  }
                }
              }]
          }
        },
        echartNumberQueryStatisticsData: {  //特色产品扫码查询数量统计
            id: 'main3',
            height:
              300,
          option: {
            backgroundColor: '',
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
//              orient: 'vertical',
              y: 'top',
              itemWidth: 50,
              itemHeight: 14,
              align: 'left',
              data:['未使用数量', '使用数量'],
              textStyle: {
                color: '#000'
              }
            },
            series: [
              {
                name:'',
                type:'pie',
                hoverAnimation: false,
                legendHoverLink:false,
                radius: ['60%', '62%'],
                color: ['#61b8eb', '#84edae'],
                label: {
                  normal: {
                    position: 'inner'
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                tooltip: {
                  show:false
                },
                data:[
                  {value:435, name:''},
                  {value:348, name:''}
                ]
              },
              {
                name:'',
                type:'pie',
                radius: ['52%', '65%'],
                color: ['#61b8eb', '#84edae'],
                label: {
                  normal: {
                    formatter: '{b}\n{d}%'
                  }
                },
                data:[
                  {value:435, name:'未使用数量'},
                  {value:679, name:'使用数量'}

                ]
              }
            ]
          }
          }
      }
    },
    components:
      {
        IptEchart
      }
  }
</script>


<style>
  .zcoding .esmdeal {
    display: inline-block;
    width: 100%;
    height: 80px;
    font-size: 30px;
    color: #fff;
    padding-top: 5px;
    line-height: 30px;
    background-color: rgb(86,199,177);
    border-radius: 5px;
    margin-top: 45px;
    white-space: nowrap;
    text-overflow:ellipsis;
    text-align: center;
    font-family: Impact;
  }
  .zcoding  .codedeals {
    /*background-color: #9fdeff;*/
    display: inline-block;
    font-size: 16px;
    margin-bottom: 4px;
  }
</style>
