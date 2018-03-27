<template>
  <div class="main zscoress">
    <ol class="breadcrumb">
      <li><a>追溯管理系统</a></li>
      <li class="active jsh-active">系统首页</li>
    </ol>
    <div class="col-lg-4">
      <ipt-summary-panel></ipt-summary-panel>
    </div>
    <div class="col-lg-4">
      <div class="shadow-boxs ">
        <div class="col-lg-12 col-12" style="height: 398px;">
          <div class="sum" style="position: relative;">
            <span class="text-left">经营主体分布统计<img :src="img.help" alt=""></span>
            <span class="text-left"
                  style="position: absolute;bottom: -35px;left: 10px;z-index: 9;color: #fff;font-size: 18px;padding:0 10px;">经营主体总数量{{ enterpriseTotalNum
              }}家</span>
            <div
              style="position: absolute;bottom: -35px;left: 0;z-index: 8;color: #fff;font-size: 18px;background-color: rgba(97, 184, 235, 0.9);padding:0 10px;width:100%;height: 25px"></div>
            <span class="flr">{{ nowDate }}</span>
          </div>
          <div id="zmap" style="height:370px;">
            <div
              style="position: absolute;top: 10px;right: 10px;z-index: 9;color: #fff;font-size: 18px;padding:0 10px;">
              {{ enterpriseNum }}
            </div>
            <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
              <el-amap-marker
                v-for="(marker, key) in markers"
                :position="marker.position"
                :events="marker.events"
                :visible="marker.visible"
                :draggable="marker.draggable"
                :key="key"
                :vid="key">
              </el-amap-marker>
            </el-amap>
            <button class="zmapbtn" v-for="enterpriseType in enterpriseTypeList"
                    @click="changeType(enterpriseType.nodeTypeNo, enterpriseType.nodeTypeName)">
              {{ enterpriseType.nodeTypeName }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12 col-12">
            <div style="height: 398px;">
              <div class="sum ">
                <span class="text-left">公众扫码查询次数周环比分析<img :src="img.help" alt=""></span>
                <span class="flr">{{ nowDate }}</span>
              </div>
              <div class="col-lg-12" style="margin-top: 25px;">
                <ipt-echart :echartData="echartData4"></ipt-echart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8" style="padding-left: 30px;">
      <div class="shadow-boxs">
        <div class="col-lg-12 col-12">
          <div style="height: 398px;">
            <div class="sum ">
              <span class="text-left">上传追溯信息数量分析<img :src="img.help" alt=""></span>
              <span class="flr">{{ nowDate }}</span>
            </div>
            <div class="col-lg-12" style="margin-top: 25px;">
              <ipt-echart :echartData="echartData5"></ipt-echart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12 col-12" style="height: 398px;">
            <div class="sum">
              <span class="text-left">上传追溯数据分析</span>
              <span class="flr">{{ nowDate }}</span>
            </div>
            <div class="col-lg-12 " style="margin-top: 25px;">
              <ipt-echart :echartData="echartData6"></ipt-echart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptEchart from '@/components/common/echart'
  import IptSummaryPanel from '@/components/city-platform/summaryPanel'
  import Dot2 from '@/assets/img/dot-2.png'
  import Help from '@/assets/img/help.png'
  import utils from '@/utils'

  export default {
    data: function () {
      return {
        zoom: 11,
        center: [106.226806, 38.492294],
        markers: [],
        // 企业类型列表(经营主体类型列表)
        enterpriseTypeList: [],
        // 经营主体总数
        enterpriseTotalNum: 0,
        // 企业类型统计分布
        enterpriseTypeCount: {},
        // 单个企业类型企业数量
        enterpriseNum: '',
        // 当前日期
        nowDate: '2018-01-01',
        img: {Dot2, Help},
        colorList: ['#61b8eb', '#84edae', '#ebca6a', '#4cbeb5', '#64C58B', '#E78F48', '#64C5C3', '#329358', '#61b8eb', '#84edae'],
        echartData4: {
          id: 'main4',
          option: {
            title: {},
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              containLabel: true
            },
            legend: {
              data: ['周扫码次数', '周扫码次数（环比）']
            },
            xAxis: [{
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: ['2017年第45周', '2017年第46周', '2017年第47周', '2017年第48周', '2017年第49周']
            }],
            yAxis: [{
              type: 'value',
              name: '周扫码次数（环比）',
              min: 0,
              max: 50,
              position: 'right',
              axisLabel: {
                formatter: '{value} %'
              }
            }, {
              type: 'value',
              name: '周扫码次数',
              min: 0,
              max: 3000,
              position: 'left'
            }],
            series: [{
              name: '周扫码次数（环比）',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              lineStyle: {
                normal: {
                  width: 3,
                  shadowColor: 'rgba(0,0,0,0.4)',
                  shadowBlur: 10,
                  shadowOffsetY: 10
                }
              },
              color: ['#6eb8eb'],
              data: [1, 13, 37, 35, 15]
            }, {
              name: '周扫码次数',
              type: 'bar',
              yAxisIndex: 1,
              stack: '',
              label: {
                normal: {
                  show: false,
                  position: 'top'
                }
              },
              color: ['#52c58e'],
              data: [209, 236, 325, 439, 507]
            }]
          },
          height: 300
        },
        // 上传追溯信息数量分析
        echartData5: {
          id: 'main5',
          option: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: []
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            yAxis: {
              type: 'value'
            },
            xAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            series: []
          },
          height: 300
        },
        // 上传追溯数据分析
        echartData6: {
          id: 'main6',
          option: {
            title: {
              text: '追溯上传数据量',
              x: 'left'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              y: 'bottom',
              left: 'right',
              itemWidth: 50,
              itemHeight: 14,
              align: 'left',
              data: [],
              textStyle: {
                color: '#000'
              }
            },
            series: [
              {
                name: '数据状态',
                type: 'pie',
                radius: ['50%', '70%'],
                color: ['#17981e', '#02a4ff', '#d3191b'],
                label: {
                  normal: {
                    formatter: '{b}:\n{c}({d}%)'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '20',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: []
              }
            ]
          },
          height: 300
        }
      }
    },
    components: {
      IptEchart, IptSummaryPanel, IptTable
    },
    computed: mapGetters({
      enterpriseCountData: 'enterpriseCountData',
      traceDataAnalysisData: 'traceDataAnalysisData',
      traceDataCountAnalysisData: 'traceDataCountAnalysisData'
    }),
    watch: {
      enterpriseCountData: function () {
        let _this = this
        _this.enterpriseTypeList = _this.enterpriseCountData.enterpriseTypeList
        _this.enterpriseTotalNum = _this.enterpriseCountData.enterpriseTotalNum
        _this.enterpriseTypeCount = _this.enterpriseCountData.enterpriseTypeCount
        _this.changeType(_this.enterpriseTypeList[0].nodeTypeNo, _this.enterpriseTypeList[0].nodeTypeName)
      },
      traceDataAnalysisData: function () {
        let _this = this
        let traceStatusNameList = []
        let traceDataList = []
        let traceStatusList = _this.traceDataAnalysisData.traceDataStatusList
        let traceDataAnalysisList = _this.traceDataAnalysisData.traceDataAnalysis
        let totalNum = 0
        for (let i = 0; i < traceStatusList.length; i++) {
          console.log(traceStatusList.length)
          traceStatusNameList.push(traceStatusList[i].name)
          let valueData = traceDataAnalysisList[traceStatusList[i].value]
          if (!valueData) {
            valueData = 0
          }
          traceDataList.push({'value': valueData, 'name': traceStatusList[i].name + ''})
          totalNum += parseInt(valueData)
        }
        _this.echartData6.option.legend.data = traceStatusNameList
        _this.echartData6.option.series[0].data = traceDataList
        _this.echartData6.option.title.text = '追溯上传数据量' + totalNum + '条'
      },
      traceDataCountAnalysisData: function () {
        let _this = this
        let nodeTypeData = []
        let monthNameList = []
        let traceDataEchart = []
        // 节点类型列表
        let nodeTypeList = _this.traceDataCountAnalysisData.nodeTypeList
        for (let i = 0; i < nodeTypeList.length; i++) {
          nodeTypeData.push(nodeTypeList[i].nodeTypeName)
          traceDataEchart.push(
            {
              name: nodeTypeList[i].nodeTypeName,
              type: 'bar',
              stack: '总量',
              barWidth: 30,
              label: {normal: {show: true, position: 'insideRight', fontSize: 10}},
              color: [_this.colorList[i]],
              data: ['', '', '', '', '', '', '', '', '', '', '', '']
            }
          )
        }
        // 近一年每月数据
        let traceDataCountList = _this.traceDataCountAnalysisData.traceDataCount
        for (let i = 0; i < traceDataCountList.length; i++) {
          // 月份
          let montName = traceDataCountList[i].monthName
          monthNameList.push(montName)
          // 某一个月各节点追溯数据集合
          let nodeTypeDataNumList = traceDataCountList[i].nodeTypeDataNumList
          for (let j = 0; j < nodeTypeDataNumList.length; j++) {
            // 节点名称
            let nodeTypeName = nodeTypeDataNumList[j].nodeTypeName
            // 追溯数据数量
            let dataNum = nodeTypeDataNumList[j].dataNum
            for (let k = 0; k < traceDataEchart.length; k++) {
              if (traceDataEchart[k].name === nodeTypeName) {
                traceDataEchart[k].data[i] = dataNum
                break
              }
            }
          }
        }
        _this.echartData5.option.legend.data = nodeTypeData
        _this.echartData5.option.xAxis.data = monthNameList
        _this.echartData5.option.series = traceDataEchart
      }
    },
    created: function () {
      let _this = this
      _this.init()
      // 经营主体分部统计
      _this.getEnterpriseCountData()
      // 追溯数据分析
      _this.getTraceDataAnalysisData()
      // 上传追溯数据数量分析
      _this.getTraceDataCountAnalysisData()
    },
    methods: {
      changeType: function (enterpriseTypeNo, enterpriseTypeName) {
        let _this = this
        _this.markers = []
        for (var key in _this.enterpriseTypeCount) {
          if (key === enterpriseTypeNo) {
            _this.enterpriseNum = enterpriseTypeName + '企业共' + _this.enterpriseTypeCount[key].length + '家'
            var marker = {'position': [0, 0]}
            for (var i = 0; i < _this.enterpriseTypeCount[key].length; i++) {
              marker = {'position': [_this.enterpriseTypeCount[key][i].longitude, _this.enterpriseTypeCount[key][i].latitude]}
              _this.markers.push(marker)
            }
          }
        }
      },
      init: function () {
        let _this = this
        // 当前日期
        _this.nowDate = utils.DateUtil.parseTime(new Date(), '{y}.{m}.{d}')
      },
      ...mapActions({
        getEnterpriseCountData: 'getEnterpriseCountData',
        getTraceDataAnalysisData: 'getTraceDataAnalysisData',
        getTraceDataCountAnalysisData: 'getTraceDataCountAnalysisData'
      })
    }
  }
</script>

<style>
  .zscoress .zscore {
    text-align: center;
  }

  .zscoress .zole {
    padding: 0;
    padding: 10px;
  }

  .zscoress .esmdeal {
    display: inline-block;
    width: 100%;
    height: 80px;
    font-size: 30px;
    color: #fff;
    padding-top: 5px;
    line-height: 30px;
    background-color: rgb(86, 199, 177);
    border-radius: 5px;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    font-family: Impact;
  }

  .zscoress .codedeals {
    /*background-color: #9fdeff;*/
    display: inline-block;
    font-size: 16px;
    margin-bottom: 4px;
  }

  .zscoress #zmap {
    position: relative;
  }

  /*.zscoress #zmap .zmapbtn {*/
    /*display: inline-block;*/
    /*border: 1px solid #fff;*/
    /*!*width: 70px;*!*/
    /*text-align: center;*/
    /*border-radius: 3px;*/
    /*background-color: #fff;*/
    /*color: rgba(51, 51, 51, .7);*/
  /*}*/

  .zscoress #zmap .zmapbtn:focus {
    outline: none;
  }

  /*.zscoress #zmap .zmapbtn {*/
    /*display: inline-block;*/
    /*border: 1px solid #fff;*/
    /*min-width: 80px;*/
    /*text-align: center;*/
    /*border-radius: 3px;*/
    /*!*margin-top: 20px;*!*/
    /*background-color: #fff;*/
    /*color: rgba(51, 51, 51, .7);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(3) {*/
    /*background-color: rgb(97, 184, 235);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(4) {*/
    /*background-color: rgb(82, 197, 142);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(5) {*/
    /*background-color: rgb(235, 202, 106);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(6) {*/
    /*background-color: rgb(76, 190, 181);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(7) {*/
    /*background-color: rgb(82, 197, 142);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(8) {*/
    /*background-color: rgb(19, 155, 197);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(9) {*/
    /*background-color: rgb(107, 189, 197);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(10) {*/
    /*background-color: rgb(22, 197, 179);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(11) {*/
    /*background-color: rgb(51, 61, 197);*/
  /*}*/

  /*.zscoress #zmap .zmapbtn:nth-child(12) {*/
    /*background-color: rgb(58, 197, 188);*/
  /*}*/

  .amap-info div:nth-child(2) {
    bottom: 17px !important;
    left: 12px !important;
  }
</style>
