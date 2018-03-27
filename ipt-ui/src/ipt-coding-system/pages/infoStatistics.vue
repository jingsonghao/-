<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>赋码系统</a></li>
      <li class="active jsh-active">赋码信息统计</li>
    </ol>
    <div class="col-lg-6">

      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12">

            <!--表格标题部分 -->
            <div class="table-title-box">
              <h3>种植（养殖）企业追溯码发放数量统计</h3>
              <select v-model="params.timeFrameValue" name="" class="form-control search-02">
                <option v-for="timeFrame in timeFrames" :value="timeFrame.value">{{ timeFrame.name }}</option>
              </select>
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="pillarPlantingOrbreed"></ipt-echart>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12">

            <!--表格标题部分-->
            <div class="table-title-box">
              <h3>团消单位追溯码发放数量统计</h3>
              <select v-model="params.timeFrameValue" name="" class="form-control search-02">
                <option v-for="timeFrame in timeFrames" :value="timeFrame.value">{{ timeFrame.name }}</option>
              </select>
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="pillarGroupUnit"></ipt-echart>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">

      <div class="col-lg-12">
        <div class="shadow-boxs ">
          <div class="col-lg-12">
            <!--表格标题部分-->
            <div class="table-title-box">
              <h3>超市追溯码发放数量统计</h3>
              <select v-model="params.timeFrameValue" name="" class="form-control search-02">
                <option v-for="timeFrame in timeFrames" :value="timeFrame.value">{{ timeFrame.name }}</option>
              </select>
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="pillarSupermarket"></ipt-echart>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="shadow-boxs ">
          <div class="col-lg-12">
            <!--表格标题部分-->
            <div class="table-title-box">
              <h3>特色企业追溯码发放数量统计</h3>
              <select v-model="params.timeFrameValue" name="" class="form-control search-02">
                <option v-for="timeFrame in timeFrames" :value="timeFrame.value">{{ timeFrame.name }}</option>
              </select>
            </div>
            <!--考核评价图标 -->
            <ipt-echart :echartData="pillarSpecialEnterprise"></ipt-echart>
          </div>
        </div>
      </div>

    </div>

    <!--饼图开始 -->
    <div class="col-lg-6">


      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12">

            <!--表格标题部分-->
            <div class="table-title-box">
              <h3>种植（养殖）企业追溯码使用数量统计</h3>
              <select v-model="params.timeFrameValue" name="" class="form-control search-02">
                <option v-for="timeFrame in timeFrames" :value="timeFrame.value">{{ timeFrame.name }}</option>
              </select>
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="cakePlantingOrbreed"></ipt-echart>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12">

            <!--表格标题部分-->
            <div class="table-title-box">
              <h3>团消单位追溯码使用数量统计</h3>
              <select v-model="params.timeFrameValue" name="" class="form-control search-02">
                <option v-for="timeFrame in timeFrames" :value="timeFrame.value">{{ timeFrame.name }}</option>
              </select>
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="cakeGroupUnit"></ipt-echart>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">

      <div class="col-lg-12">
        <div class="shadow-boxs ">
          <div class="col-lg-12">
            <!--表格标题部分-->
            <div class="table-title-box">
              <h3>超市追溯码使用数量统计</h3>
              <select v-model="params.timeFrameValue" name="" class="form-control search-02">
                <option v-for="timeFrame in timeFrames" :value="timeFrame.value">{{ timeFrame.name }}</option>
              </select>
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="cakeSupermarket"></ipt-echart>
          </div>
        </div>
      </div>

      <div class="col-lg-12">
        <div class="shadow-boxs ">
          <div class="col-lg-12">
            <!--表格标题部分-->
            <div class="table-title-box">
              <h3>特色企业追溯码使用数量统计</h3>
              <select v-model="params.timeFrameValue" name="" class="form-control search-02">
                <option v-for="timeFrame in timeFrames" :value="timeFrame.value">{{ timeFrame.name }}</option>
              </select>
            </div>
            <!--考核评价图-->
            <ipt-echart :echartData="cakeSpecialEnterprise"></ipt-echart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import IptEchart from '@/components/common/echart'
  export default {
    components: {
      IptEchart
    },
    created() {
      this.init()
    },
    data() {
      return {
        pillarPlantingOrbreed: { //种植（养殖）企业追溯码发放数量统计
          id: 'main1',
          height: 300,
          option: {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
            grid: {
              left: '3%',
              right: '4%',
              bottom: '8%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              name: '',
              data: [
                '大峰食品',
                '万兴食品',
                '大千农牧',
                '赢泰有机农业',
                '仙弄业园蔬牧业',
                '润百禾',
                '泰顺斋',
                '朗野蜂业',
                '玉林农产品',
                '五福茶叶'
              ],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0,
                rotate: 15,
                textStyle: {
                  color: '#333'
                }
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)',
                  width: 1
                }
              }
            },
            yAxis: {
              type: 'value',
              name: '追溯码发放数量',
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['rgba(51,51,51,0)']
                }
              },
              nameTextStyle: {
                color: ['rgb(51,51,51)']
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)',
                  width: 1 //这里是为了突出显示加上的
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333'
                }
              }
            },
            series: [
              {
                name: '追溯码发放数量',
                type: 'bar',
                barWidth: '30%',
                data: [334, 156, 150, 87, 208, 121, 235, 84, 219, 234],
                itemStyle: {
                  normal: {
                    color: '#61b8eb'
                  }
                }
              }
            ]
          }
        },
        pillarGroupUnit: { //团消单位追溯码发放数量统计
          id: 'main2',
          height: 300,
          option: {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
            grid: {
              left: '3%',
              right: '4%',
              bottom: '8%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              name: '',
              data: [
                '朗野蜂业',
                '万兴食品',
                '赢泰有机农业',
                '大千农牧',
                '仙弄业园蔬牧业',
                '大峰食品',
                '泰顺斋',
                '润百禾',
                '玉林农产品',
                '五福茶叶'
              ],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0,
                rotate: 15,
                textStyle: {
                  color: '#333'
                }
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)',
                  width: 1
                }
              }
            },
            yAxis: {
              type: 'value',
              name: '追溯码发放数量',
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['rgba(51,51,51,0)']
                }
              },
              nameTextStyle: {
                color: ['rgb(51,51,51)']
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)',
                  width: 1 //这里是为了突出显示加上的
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333'
                }
              }
            },
            series: [
              {
                name: '追溯码发放数量',
                type: 'bar',
                barWidth: '30%',
                data: [150, 87, 208, 156, 84, 219, 334, 121, 235, 314],
                itemStyle: {
                  normal: {
                    color: '#84edae'
                  }
                }
              }
            ]
          }
        },
        pillarSupermarket: {   //超市追溯码发放数量统计
          id: 'main3',
          height: 300,
          option: {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
            grid: {
              left: '3%',
              right: '4%',
              bottom: '8%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              name: '',
              data: [
                '大千农牧',
                '赢泰有机农业',
                '大峰食品',
                '万兴食品',
                '润百禾',
                '仙弄业园蔬牧业',
                '朗野蜂业',
                '泰顺斋',
                '玉林农产品',
                '五福茶叶'
              ],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0,
                rotate: 15,
                textStyle: {
                  color: '#333'
                }
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)',
                  width: 1
                }
              }
            },
            yAxis: {
              type: 'value',
              name: '追溯码发放数量',
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['rgba(51,51,51,0)']
                }
              },
              nameTextStyle: {
                color: ['rgb(51,51,51)']
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)',
                  width: 1 //这里是为了突出显示加上的
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333'
                }
              }
            },
            series: [
              {
                name: '追溯码发放数量',
                type: 'bar',
                barWidth: '30%',
                data: [150, 87, 208, 121, 235, 334, 156, 84, 219, 334],
                itemStyle: {
                  normal: {
                    color: '#ebca6a'
                  }
                }
              }
            ]
          }
        },
        pillarSpecialEnterprise: { //特色企业追溯码发放数量统计
          id: 'main4',
          height: 300,
          option: {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
            grid: {
              left: '3%',
              right: '4%',
              bottom: '8%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              name: '',
              data: [
                '万兴食品',
                '大峰食品',
                '赢泰有机农业',
                '大千农牧',
                '润百禾',
                '仙弄业园蔬牧业',
                '朗野蜂业',
                '泰顺斋',
                '玉林农产品',
                '五福茶叶'
              ],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0,
                rotate: 15,
                textStyle: {
                  color: '#333'
                }
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)',
                  width: 1
                }
              }
            },
            yAxis: {
              type: 'value',
              name: '追溯码发放数量',
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['rgba(51,51,51,0)']
                }
              },
              nameTextStyle: {
                color: ['rgb(51,51,51)']
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)',
                  width: 1   //这里是为了突出显示加上的
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#333'
                }
              }
            },
            series: [
              {
                name: '追溯码发放数量',
                type: 'bar',
                barWidth: '30%',
                data: [121, 235, 334, 156, 150, 87, 208, 84, 219, 321],
                itemStyle: {
                  normal: {
                    color: '#4c8eba'
                  }
                }
              }
            ]
          }
        },
        cakePlantingOrbreed: { //种植（养殖）企业追溯码使用数量统计
          id: 'main5',
          height: 300,
          option: {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color:['#61b8eb', '#84edae'],
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['已使用', '未使用'],
              textStyle: {
                color:'#000',
                fontSize:12
              }
            },
            series : [
              {
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data:[
                  {value:50051, name: '已使用'},
                  {value:70248, name: '未使用'}
                ],
                itemStyle: {
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
        cakeGroupUnit: { //团消单位追溯码使用数量统计
          id: 'main6',
          height: 300,
          option: {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['已使用', '未使用'],
              textStyle: {
                color: "#333"
              }
            },
            color: ['#ebca6a', '#4c8fb5'],
            series : [
              {
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data:[
                  {value:30051, name: '已使用'},
                  {value:80248, name: '未使用'}
                ],
                itemStyle: {
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
        cakeSupermarket: { //超市追溯码使用数量统计
          id: 'main7',
          height: 300,
          option: {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['已使用', '未使用'],
              textStyle: {
                color: "#333"
              }
            },
            color: ['#e78f48', '#84edae'],
            series : [
              {
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data:[
                  {value:70051, name: '已使用'},
                  {value:80248, name: '未使用'}
                ],
                itemStyle: {
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
        cakeSpecialEnterprise: { //特色企业追溯码使用数量统计
          id: 'main8',
          height: 300,
          option: {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['已使用', '未使用'],
              textStyle: {
                color: "#333"
              }
            },
            color: ['#4c8fb5', '#e78f48'],
            series : [
              {
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data:[
                  {value:50051, name: '已使用'},
                  {value:80248, name: '未使用'}
                ],
                itemStyle: {
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
        params: { //参数
          timeFrameValue: 2 //下拉列表选中默认选中
        },
        timeFrames: [] //下拉列表数据
      }
    },
    methods: {
      init() {
        this.timeFrames = [
          {value: 1, name: '日'}, {value: 2, name: '月'}, {value: 3, name: '季'}, {value: 4, name: '年'}
        ]
      }
    }
  }
</script>
