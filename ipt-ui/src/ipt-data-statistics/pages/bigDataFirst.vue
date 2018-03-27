<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>大数据分析系统</a></li>
      <li class="active jsh-active">系统首页</li>
    </ol>
    <!--数据表格展示-->
    <div class="col-lg-3">
      <div class="shadow-boxs">
        <div id="main1" style="height: 300px;">
          <ipt-echart :echartData="echartData1"></ipt-echart>
        </div>
      </div>
    </div>
    <div class="col-lg-3">
      <div class="shadow-boxs">
        <div id="main2" style="height: 300px;">
          <ipt-echart :echartData="echartData2"></ipt-echart>
        </div>
      </div>
    </div>
    <div class="col-lg-3">
      <div class="shadow-boxs">
        <div id="main3" style="height: 300px;">
          <ipt-echart :echartData="echartData3"></ipt-echart>
        </div>
      </div>
    </div>
    <div class="col-lg-3">
      <div class="shadow-boxs">
        <div id="main4" style="height: 300px;">
          <ipt-echart :echartData="echartData4"></ipt-echart>
        </div>
      </div>
    </div>
    <div class="col-lg-3">
      <div class="shadow-boxs">
        <div id="main5" style="height: 300px;">
          <ipt-echart :echartData="echartData5"></ipt-echart>
        </div>
      </div>
    </div>

    <div class="col-lg-3">
      <div class="shadow-boxs" style="height: 302px;padding:5px;">
        <h4 style="color: rgb(51,51,51);">检疫检测信息</h4>
        <ipt-table :tableData="deviceTypeTableData" :tableConfig="deviceTypeConfig" :pagerShow="false"></ipt-table>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="col-sm-12 amap-wrapper"
           style="height: 302px;border: 1px solid #999999;border-radius:4px;float: right;margin-right: 0px;padding:0px; ">
        <el-amap ref="map" vid="amap1" style="height: 300px" class="amap-default"></el-amap>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import IptEchart from '@/components/common/echart'
  import IptTable from '@/components/common/table'

  export default {
    components: {
      IptEchart, IptTable
    },
    computed: mapGetters({
      deviceTypeTableData: 'deviceTypeTableData'
    }),
    created () {
      this.$store.dispatch('getDeviceTypeTableData', {page: 1})
    },
    data () {
      return {
        echartData1: {
          id: 'main1',
          option: {
            title: {
              text: '交易价格'
            },
            color: ['#61b8eb', '#09c9e8'],
            tooltip: {
              trigger: 'axis'
            },
            calculable: false,
            legend: {
              top: '10%',
              padding: 0,
              itemGap: 0,
              itemWidth: 10,
              itemHeight: 10,
              data: ['交易价格'],
              textStyle: {    //图例文字的样式
                color: '#333',
                fontSize: 12
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: true,
                data: ['4月', '5月', '6月', '7月', '8月', '9月', '10月'],
                axisLabel: {
                  interval: 0,
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '价格/元',
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                }
              }
            ],
            series: [
              {
                name: '交易价格',
                type: 'line',
                stack: '总量',
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#61b8eb',
                      width: 3
                    }
                  }
                },
                data: [220, 182, 191, 234, 290, 330, 310]
              }
            ]
          },
          height: 300
        },
        echartData2: {
          id: 'main2',
          title: '交易量',
          height: 300,
          option: {
            title: {
              text: '交易量'
            },
            textStyle: {
              fontSize: 12,
              color: '#333'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['交易量'],
              top: '10%',
              padding: 0,
              itemGap: 0,
              itemWidth: 10,
              itemHeight: 10,
              textStyle: {
                fontSize: 12,
                color: '#333'
              }
            },
            grid: {
              left: '2%',
              right: '14%',
              bottom: '13%',
              containLabel: true
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            xAxis: [{
              type: 'category',
              name: '',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                interval: 0,
                rotate:45,
                textStyle: {
                  color: '#333',
                  fontSize: '10'
                }
              }
            }],
            yAxis: {
              type: 'value',
              name: '交易量/条',
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#333',
                  fontSize: '12'
                }
              }
            },
            series: {
              name: '交易量',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#84edae'
                }
              },
              data: [60, 55, 32, 20, 6, 3, 5, 30, 50, 40, 30, 20],
              barWidth: 10
            }
          }
        },
        echartData3: {
          id: 'main3',
          height: 300,
          option: {
            title: {
              text: '特色产品交易量'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['玉林鸭子', '五福茶叶', '万兴生姜', '松鹤黑猪', '宁夏香肠'],
              top: '10%',
              padding: 0,
              itemGap: 0,
              itemWidth: 10,
              itemHeight: 10,
              textStyle: {
                fontSize: 3,
                color: '#333'
              }
            },
            textStyle: {
              fontSize: 12,
              color: '#333'
            },
            grid: {
              left: '2%',
              right: '14%',
              bottom: '12%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              axisLabel: {
                textStyle: {
                  color: '#333',
                  fontSize: '12'
                }
              }
            },
            yAxis: {
              type: 'category',
              data: ['万兴食品', '大千农牧', '宁夏大峰', '名利蔬菜', '黄金蓝'],
              axisLabel: {
                textStyle: {
                  color: '#333',
                  fontSize: '12'
                }
              }
            },
            series: [
              {
                name: '玉林鸭子',
                type: 'bar',
                stack: '总量',
                barWidth: '50%',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#61b8eb'
                  }
                },
                data: [320, 302, 301, 334, 290]
              },
              {
                name: '五福茶叶',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#84edae'
                  }
                },
                data: [220, 232, 301, 234, 190]
              },
              {
                name: '万兴生姜',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#ebca6a'
                  }
                },
                data: [220, 182, 191, 234, 290]
              },
              {
                name: '松鹤黑猪',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#4c8eb5'
                  }
                },
                data: [180, 212, 201, 154, 190]
              },
              {
                name: '宁夏香肠',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#64c58b'
                  }
                },
                data: [150, 212, 201, 154, 390]
              }
            ]
          }
        },
        echartData4: {
          id: 'main4',
          title: '交易量',
          height: 300,
          option: {
            title: {
              text: '综合性考核'
            },
            tooltip: {
              trigger: 'axis',
              position: ['30%', '30%']
            },
            legend: {
              orient: 'vertical',
              x: 'right',
              y: 'bottom',
              data: ['预算分配']
            },
            radar: {
              name: {
                show: true,
                formatter: null,
                color: '#333'
              },
              indicator: [
                {text: '上传信息规范性', max: 100},
                {text: '进场\n登记率', max: 100},
                {text: '上传信息及时性', max: 100},
                {text: '上传信息完整性', max: 100},
                {text: '批次\n抽检率', max: 100}
              ]
            },
            calculable: true,
            grid:{
              x:150,
              y:150,
              x2:160,
              y2:50
            },
            series: [
              {
                name: '预算 vs 开销',
                type: 'radar',
                tooltip: {
                  trigger: 'item'
                },
                label: {
                  normal: {
                    show: true,
                    color: '#999'
                  }
                },
                data: [
                  {
                    value: [93.32, 78.51, 89.51, 91.22, 88.05],
                    name: ''
                  }
                ],
                itemStyle: {
                  //通常情况下：
                  normal: {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: '#ebca6a'
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
        echartData5: {
          id: 'main5',
          option: {
            title: {
              text: '产品销量'
            },
            textStyle: {
              fontSize: 15,
              color: '#333'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['2011年', '2012年'],
              top: '10%',
              padding: 0,
              itemGap: 0,
              itemWidth: 10,
              itemHeight: 10,
              textStyle: {
                fontSize: 15,
                color: '#333'
              }
            },
            grid: {
              left: '2%',
              right: '10%',
              bottom: '13%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              textStyle: {
                color: '#333',
                fontSize: '16'
              }
            },
            yAxis: {
              type: 'category',
              data: ['万兴生姜', '玉林鸭子', '五福茶叶', '松鹤黑猪', '宁夏香肠'],
              textStyle: {
                color: '#333',
                fontSize: '16'
              }
            },
            series: [
              {
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744],
                itemStyle: {
                  //通常情况下：
                  normal: {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: '#4c8eb5'
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
                name: '2012年',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141],
                itemStyle: {
                  //通常情况下：
                  normal: {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: '#84deae'
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
        deviceTypeConfig: {
          getApi: 'getDeviceTypeTableData',
          display: 10,
          pagegroup: 5,
          high: 250,
          checkboxShow: true,
          sequenceShow: true,
          columns: [
            {title: '企业名称', data: 'enterpriseNo'},
            {title: '总数量', data: 'nodeBaseInfoId'},
            {title: '检疫批次', data: 'enterpriseName'},
            {title: '对应率', data: 'orgNumber'}
          ]
        }
      }
    }
  }
</script>
