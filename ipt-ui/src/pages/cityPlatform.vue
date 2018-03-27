<template>
  <div class="main zscoress main-zscoress">
    <!--<ol class="breadcrumb">-->
    <!--<li class="active jsh-active">平台首页</li>-->
    <!--</ol>-->
    <div class="col-lg-4">
      <div class="shadow-boxs ">
        <div class="col-lg-12 col-12" style="height: 440px;">
          <div class="sum" style="position: relative;">
            <span class="text-left">经营主体分布统计<img :src="img.help" alt=""></span>
            <!--<span class="text-left"-->
            <!--style="position: absolute;bottom: -35px;left: 10px;z-index: 9;color: #fff;font-size: 18px;padding:0 10px;">经营主体总数量{{ enterpriseTotalNum-->
            <!--}}家</span>-->
            <!--<div-->
            <!--style="position: absolute;bottom: -35px;left: 0;z-index: 8;color: #fff;font-size: 18px;background-color: rgba(97, 184, 235, 0.9);padding:0 10px;width:100%;height: 25px"></div>-->
            <span class="flr">{{ nowDate }}</span>
          </div>
          <div id="zmap" style="height:240px;">
            <!--<div-->
            <!--style="position: absolute;top: 10px;right: 10px;z-index: 9;color: #fff;font-size: 18px;padding:0 10px;">-->
            <!--{{ enterpriseNum }}-->
            <!--</div>-->
            <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
              <el-amap-marker
                v-for="(marker, key) in markers"
                :position="marker.position"
                :events="marker.events"
                :visible="marker.visible"
                :draggable="marker.draggable"
                :icon="marker.icon"
                :key="key"
                :vid="key">
              </el-amap-marker>
            </el-amap>
            <div
              style="text-align: center;color: rgba(51, 51, 51, .7);font-size: 18px;padding:0 10px;background-color: #fff;">
              全部经营主体15家
            </div>
            <div class="zmapbtn col-md-4" v-for="enterpriseType in enterpriseTypeList"
                 @click="changeType(enterpriseType.nodeTypeNo, enterpriseType.nodeTypeName)">
              {{ enterpriseType.nodeTypeName }}
            </div>
            <span class="num1 nums">4家</span>
            <span class="num2 nums">2家</span>
            <span class="num3 nums">4家</span>
            <span class="num4 nums">1家</span>
            <span class="num5 nums">4家</span>
            <span class="num6 nums">1家</span>
            <span class="nums1"><img src="../assets/img/u217.png" alt="" width="20"></span>
            <span class="nums2"><img src="../assets/img/u209.png" alt="" width="20"></span>
            <span class="nums3"><img src="../assets/img/u215.png" alt="" width="20"></span>
            <span class="nums4"><img src="../assets/img/u211.png" alt="" width="20"></span>
            <span class="nums5"><img src="../assets/img/u219.png" alt="" width="20"></span>
            <span class="nums6"><img src="../assets/img/u213.png" alt="" width="20"></span>
          </div>
        </div>
      </div>
      <!--<ipt-credit-panel></ipt-credit-panel>-->
      <div class="shadow-boxs">
        <div class="col-lg-12 col-12">
          <div style="height: 455px;">
            <div class="sum">
              <span class="text-left">追溯码统计<img :src="img.help" alt=""></span>
              <!--<span class="flr">{{ lastQuarter.start }} - {{ lastQuarter.end }}</span>-->
              <span class="flr">{{ nowDate }}</span>
            </div>
            <div class="col-lg-12" style="margin-top: 25px;">
              <ipt-echart :echartData="echartData8"></ipt-echart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="shadow-boxs">
        <div class="col-lg-12 col-12">

          <div style="height: 238px;">
            <div class="sum">
              <span class="text-left">追溯数据分析</span>
              <span class="flr">{{ nowDate }}</span>
            </div>
            <div class="col-lg-12" style="margin-top: 20px;text-align: center;">
              <div class="col-lg-4">
                <div style="width: 50px;height: 50px;margin:20px auto 0;"><img src="../assets/img/03.png" alt="" >
                </div>
                <div class="z-operation z-operations " style="color: #fdaa42;">5741 条</div>
                <div class="z-operation">可追溯数据总量</div>
                <hr style="height:100px;width:1px;position: absolute;top: 0px;right:0;border-right: 1px solid #999;" />
                <!--<div class="z-operation">{{ equipmentRunStatusNum.normalNum }}</div>-->
              </div>
              <div class="col-lg-4">
                <div style="width: 50px;height: 50px;margin:20px auto 0;"><img src="../assets/img/02.png" alt="" >
                </div>
                <span class="z-operation z-operations" style="color: #00a0e8;">3249 条</span>
                <span class="z-operation">追溯码使用量</span>
                <hr style="height:100px;width:1px;position: absolute;top: 0px;right:0;border-right: 1px solid #999;" />
                <!--<span class="z-operation">{{ equipmentRunStatusNum.stopUseNum }}</span>-->
              </div>
              <div class="col-lg-4">
                <div style="width: 50px;height: 50px;margin:20px auto 0;"><img src="../assets/img/01.png" alt="">
                </div>
                <span class="z-operation z-operations" style="color: #e08ab9">{{ scanCodeCount }} 条</span>
                <span class="z-operation">追溯码扫码量</span>
                <!--<span class="z-operation">{{ equipmentRunStatusNum.notUseNum }}</span>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shadow-boxs">
        <div class="col-lg-12 col-12">
          <div style="height: 325px;">
            <div class="sum">
              <span class="text-left">可追溯数据趋势分析<img :src="img.help" alt=""></span>
              <!--<span class="flr">{{ lastQuarter.start }} - {{ lastQuarter.end }}</span>-->
              <span class="flr">2018.02</span>
              <!--<span class="flr">2018.02</span>-->
            </div>
            <div class="col-lg-12" style="margin-top: 25px;">
              <ipt-echart :echartData="echartData7"></ipt-echart>
            </div>
          </div>
        </div>
      </div>
      <div class="shadow-boxs">
        <div class="col-lg-12 col-12">
          <div style="height: 300px;">
            <div class="sum">
              <span class="text-left">重要产品零售额统计<img :src="img.help" alt=""></span>
              <!--<span class="flr">{{ lastQuarter.start }} - {{ lastQuarter.end }}</span>-->
              <span class="flr">2018.02</span>
              <!--<span class="flr">2018.02</span>-->
            </div>
            <div class="zscore">
                  <div class="table-container" style="margin-top: 0px;">
                    <div class="thead-bg"></div>
                    <div class="table-box">
                      <table class="table table-condensed tab-third">
                        <thead>
                        <tr>
                          <th title="品类">品类</th>
                          <th title="零售额（万元）" width="108">零售额（万元）</th>
                          <th title="月浮动">月浮动</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td title="黄瓜">枸杞</td>
                          <td title="29.12">29.12</td>
                          <td title="2.5%">↑ 2.5%</td>
                        </tr>
                        <tr>
                          <td title="油菜">葡萄酒</td>
                          <td title="21.12">21.12</td>
                          <td title="1.4%">↑ 1.4%</td>
                        </tr>
                        <tr>
                          <td title="菠菜">牛羊肉</td>
                          <td title="24.25">24.25</td>
                          <td title="3.5%">↑ 3.5%</td>
                        </tr>
                        <tr>
                          <td title="西红柿">粮油</td>
                          <td title="18.92">18.92</td>
                          <td title="3.5%">↑ 2.7%</td>
                        </tr>
                        <tr>
                          <td title="西红柿">瓜菜</td>
                          <td title="18.92">18.92</td>
                          <td title="3.5%">↑ 2.7%</td>
                        </tr>
                        <tr>
                          <td title="西红柿">乳制品</td>
                          <td title="18.92">18.92</td>
                          <td title="3.5%">↑ 2.7%</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div style="height: 15px;"></div>
                <!--<div class="col-lg-6" style="margin-top: 25px;padding: 0;">
                  <div class="table-container">
                    <div class="thead-bg"></div>
                    <div class="col-xs-12 table-box" style="padding: 0;">
                      <table class="table table-condensed tab-third">
                        <thead>
                        <tr>
                          <th title="品类">品类</th>
                          <th title="零售额（万元）" width="108">零售额（万元）</th>
                          <th title="月浮动">月浮动</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td title="猪肉">猪肉</td>
                          <td title="21.12">35.25</td>
                          <td title="1.5%">↑ 1.3%</td>
                        </tr>
                        <tr>
                          <td title="羊肉">羊肉</td>
                          <td title="18.12">54.19</td>
                          <td title="2.4%">↑ 1.9%</td>
                        </tr>
                        <tr>
                          <td title="牛肉">牛肉</td>
                          <td title="21.25">47.83</td>
                          <td title="2.5%">↑ 2.4%</td>
                        </tr>
                        <tr>
                          <td title="鸡肉">鸡肉</td>
                          <td title="16.92">25.62</td>
                          <td title="1.4%">↑ 1.8%</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div style="height: 15px;"></div>
                </div>-->
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
        <div class="shadow-boxs">
          <div class="col-lg-12 col-12">
            <div style="height: 238px;" class="nownews">
              <div class="sum ">
                <span class="text-left">今日提示<img :src="img.help" alt=""></span>
                <span class="flr">{{ nowDate }}</span>
              </div>
              <!--考核评价图标-->
              <!--<transition-group-->
              <!--name="animate-list"-->
              <!--tag="ul"-->
              <!--v-bind:css="false"-->
              <!--v-on:before-enter="beforeEnter"-->
              <!--v-on:enter="enter"-->
              <!--v-on:leave="leave">-->
              <!--<li :key="nested" v-for="(nested, nestedIndex) in list">{{ nested }}</li>-->
              <!--</transition-group>-->
              <!--<vue-seamless-scroll></vue-seamless-scroll>-->
              <vue-seamless-scroll :data="listData" :class-option="classOption" class="seamless-warp">
                <ul class="item">
                  <li v-for="item in listData" style="margin-top: 5px;">
                    <div class="title" v-text="item.title"></div>
                    <div class="date" v-text="item.date"></div>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
        <div class="shadow-boxs " style="height: 325px;position: relative;">
          <div class="col-lg-12 col-12">
            <div class="sum">
              <span class="text-left">工作考核分析<img :src="img.help" alt=""></span>
              <!--<span class="flr">{{ workExamineAnalysis.lastMonth }}</span>-->
              <span class="flr">2018.02</span>
              <!--<span class="flr">2018.02</span>-->
            </div>
            <div class="dssaz">
              <!--<span class="ecssz">L1备案信息完整率 {{ workExamineAnalysis.recordIntegrityRate }}%</span>-->
              <span class="ecssz">L1备案信息完整率 90.00%</span>
              <!--<span class="ecssz">L2上传追溯信息活跃率 {{ workExamineAnalysis.traceDataActiveRate }}%</span>-->
              <span class="ecssz">L2上传追溯信息活跃率 94.62%</span>
              <!--<span class="ecssz">L3设备正常率 {{ workExamineAnalysis.equipmentNormalRate }}%</span>-->
              <span class="ecssz">L3上传信息及时率 91.32%</span>
              <!--<span class="ecssz">L3上传信息及时率 {{ workExamineAnalysis.traceDataTimelyRate }}%</span>-->
              <!--<span class="ecssz">L5上传信息完整率 {{ workExamineAnalysis.traceDataIntegrityRate }}%</span>-->
              <span class="ecssz">L4上传信息规范率 89.34%</span>
              <!--<span class="ecssz">L4上传信息规范率 {{ workExamineAnalysis.traceDataStandardRate }}%</span>-->
              <span class="ecssz">L5追溯体系建设率 20.00%</span>
              <!--<span class="ecssz">L5追溯体系建设率{{ workExamineAnalysis.traceDataStandardRate }}%</span>-->
              <!--<span class="ecssz">L7本期追溯码使用率 {{ workExamineAnalysis.traceCodeUseRate }}%</span>-->
              <!--<span class="ecssz">L8累计追溯码使用率 {{ workExamineAnalysis.allTraceCodeUseRate }}%</span>-->
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="echartData3"></ipt-echart>

          </div>
        </div>
        <div class="shadow-boxs">
          <div class="col-lg-12 col-12">
            <div style="height: 300px;">
              <div class="sum">
                <span class="text-left">各追溯环节考核情况分析</span>
                <span class="flr">2018.02</span>
                <!--<span class="flr">2018.02</span>-->
              </div>
              <div class="zscore">
                <div class="table-container" style="margin-top: 0px;">
                  <div class="thead-bg"></div>
                  <div class="col-xs-12 table-box">
                    <table class="table table-condensed tabs-con">
                      <thead>
                      <tr>
                        <th title="序号">序号</th>
                        <th title="追溯环节类型">追溯环节类型</th>
                        <th title="考核分数">考核分数</th>
                        <th title="考核等级">考核等级</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>1</td>
                        <td title="种植">种植</td>
                        <td title="78.33分">78.33分</td>
                        <td title="良好">良好</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td title="养殖">养殖</td>
                        <td title="71.28分">71.28分</td>
                        <td title="良好">良好</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td title="加工">加工</td>
                        <td title="77.17分">77.17分</td>
                        <td title="良好">良好</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td title="超市">超市</td>
                        <td title="81.45分">81.45分</td>
                        <td title="良好">良好</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import vueSeamlessScroll from 'vue-seamless-scroll'
  import IptTable from "@/components/common/table"
  import IptEchart from '@/components/common/echart'
  import Dot2 from '@/assets/img/dot-2.png'
  import Help from '@/assets/img/help.png'
  import u209 from '@/assets/img/u209.png'
  import u211 from '@/assets/img/u211.png'
  import u213 from '@/assets/img/u213.png'
  import u215 from '@/assets/img/u215.png'
  import u217 from '@/assets/img/u217.png'
  import u219 from '@/assets/img/u219.png'
  import Velocity from 'velocity-animate'
  import utils from '@/utils'
  import AMap from 'vue-amap'
  import Api from '@/api'

  export default {
    components: {
      IptEchart, IptTable, vueSeamlessScroll
    },
    data: function () {
      return {
        scanCodeCount: 0,
        enterpriseTypeIcons: [u217, u209, u215, u211, u219, u213],
        listData: [
          {
            'title': '问题发现统计',
            'date': '待审核备案数： 3条'
          }, {
            'title': '',
            'date': '待审核问题报告数： 0份'
          }, {
            'title': '',
            'date': '待审核运行报告数： 0份'
          }, {
            'title': '',
            'date': '待处理应急事件数: 0条'
          }, {
            'title': '',
            'date': '待处理跨城市应急事件数: 0条'
          }, {
            'title': '',
            'date': '发现问题数：2项'
          }, {
            'title': '上报数据统计',
            'date': '上报追溯数据总量： 5241 条'
          },
          {
            'title': '',
            'date': '本月上报追溯数据量： 625  条'
          }
        ],
        // 企业类型列表(经营主体类型列表)
        enterpriseTypeList: [],
        // 经营主体总数
        enterpriseTotalNum: 0,
        // 企业类型统计分布
        enterpriseTypeCount: {},
        // 单个企业类型企业数量
        enterpriseNum: '',
        // 企业经纬度位置集合
        markers: [],
        // 设备运行情况
        equipmentRunStatusNum: {
          normalNum: 0, // 正常运行
          stopUseNum: 0, // 停用
          notUseNum: 0 // 未使用
        },
        // 上季度追溯数据分析
        traceDataAnalysis: {
          monthDataList: ['1月', '2月', '3月'], // 季度月份
          traceNumDataList: [500, 300, 800], // 追溯数据数
          growthRateDataList: [10, -5, 5] // 同比增长率
        },
        // 当前日期
        nowDate: '2018-01-01',
        // 上季度开始月
        lastQuarter: {
          start: '2018.01',
          end: '2018.03'
        },
        // 工作考核分析
        workExamineAnalysis: {
          // 上月日期
          lastMonth: '2018.01',
          // 考核等级列表
          examineLevelList: [],
          // 备案信息完整率
          recordIntegrityRate: 80.00,
          // 上传信息完整率
          traceDataIntegrityRate: 90.00,
          // 上传信息规范率
          traceDataStandardRate: 80.00,
          // 上传信息及时率
          traceDataTimelyRate: 90.00,
          // 上传追溯信息活跃率
          traceDataActiveRate: 80.00,
          // 设备正常率
          equipmentNormalRate: 100.00,
          // 本期追溯码使用率
          traceCodeUseRate: 95.00,
          // 累计追溯码使用率
          allTraceCodeUseRate: 95.00,
          // 平均得分
          avgNum: 89.00,
          // 平均得分等级
          avgNumLevel: '等级'
        },
        // 今日提示
        items: [
          '发现问题统计：',
          '待审核备案数： 3条',
          '待审核问题报告数： 0份',
          '待审核运行报告数： 0份',
          '待处理应急事件数: 0条',
          '待处理跨城市应急事件数: 0条',
          '发现问题数：0项',
          ' ',
          '追溯查询统计',
          '公众扫码查询次数：15条',
          '追溯码发放数：5000条',
          '',
          '上报数据统计',
          '上报追溯数据总量: 852条'
        ],
        showIndex: 0,
        listSize: 5,
        step: 1,
        img: {Dot2, Help},
        zoom: 10,
        center: [106.226806, 38.492294],
//        groundimages: [
//          {
//            url: '//faas.elemecdn.com/desktop/media/img/appqc.95e532.png',
//            bounds: [[117.5273285, 36.21515044], [117.6273285, 36.31515044]],
//            events: {
//              click() {
//                alert('click groundimage')
//              }
//            }
//          }
//        ],
        // 工作考核分析
        echartData3: {
          id: 'main3',
          height: 250,
//          var defaultGlobalColor = ['#65F5F3', '#EAE643', '#F56565']
          option: {
            backgroundColor: '#f5f7fa',
            title: {
              text: '总得分：77.06分 \n\n考评等级 ：良好',
              right: '87px',
              top: '40px',
              textStyle: {
                color: '#fc4f4f',
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 40
              }
            },
            tooltip: {},
            legend: {
              data: ['优秀', '良好', '达标', '得分'],
              left: '3%',
              top: '3%',
              orient: 'vertical'
            },
            color: ['#61b8eb', '#84edae', '#ebca6a', '#4cbeb5'],
            radar: {
              shape: 'circle',
              center: ['35%', '55%'],
              radius: 90,
              indicator: [
                {name: 'L1', max: 100},
                {name: 'L2', max: 100},
                {name: 'L3', max: 100},
                {name: 'L4', max: 100},
                {name: 'L5', max: 100}
//                {name: 'L6', max: 100},
//                {name: 'L7', max: 100},
//                {name: 'L8', max: 100}
              ]
            },
            series: [{
              name: '雷达图',
              type: 'radar',
              // areaStyle: {normal: {}},
              data: [
                {
                  value: [80, 80, 80, 80, 80],
                  name: '优秀',
                  lineStyle: {
                    normal: {
                      type: 'dashed'
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: 'RGBA(136,198,231,.1)'
                    }
                  }
                },
                {
                  value: [60, 60, 60, 60, 60],
                  name: '良好',
                  lineStyle: {
                    normal: {
                      type: 'dashed'
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: 'RGBA(107,184,231,.1)'
                    }
                  }
                },
                {
                  value: [40, 40, 40, 40, 40],
                  name: '达标',
                  lineStyle: {
                    normal: {
                      type: 'dashed'
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: 'RGBA(255,60,0,.1)'
                    }
                  }
                },
                {
                  value: [90.00, 94.62, 91.32, 89.34, 20.00],
                  name: '得分',
                  lineStyle: {
                    normal: {
                      type: 'solid'
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: 'RGBA(17,180,30,.5)'
                    }
                  }
                }
              ]
            }]
          }
        },
        echartData4: {
          id: 'main4',
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
              data: ['同比', '环比'],
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
              data: ['6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
              name: '价格/元',
              type: 'value'
            },
            series: [{
              name: '同比',
              type: 'line',
              data: [8, 16, 42, 15, 13, 39, 25],
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#acdced'
                  }
                }
              }
            },
              {
                name: '环比',
                type: 'line',
                data: [2, 16, 42, 52, 25, 25, 37],
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: '#ebca6a'
                    }
                  }
                }
              }]
          },
          height: 300
        },
        echartData5: {
          id: 'main5',
          option: {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'right',
              itemWidth: 14,
              itemHeight: 14,
              align: 'left',
              data: ['使用量', '未使用量'],
              textStyle: {
                color: '#000'
              }
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                hoverAnimation: false,
                legendHoverLink: false,
                radius: ['40%', '42%'],
                color: ['rgb(51, 153, 255)', 'rgb(255, 153, 0)'],
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
                  show: false
                },
                data: [
                  {value: 435, name: ''},
                  {value: 679, name: ''}
                ]
              },
              {
                name: '访问来源',
                type: 'pie',
                radius: ['42%', '55%'],
                color: ['rgb(51, 153, 255)', 'rgb(255, 153, 0)'],
                label: {
                  normal: {
                    formatter: '{b}\n{d}%'
                  }
                },
                data: [
                  {value: 435, name: '使用量'},
                  {value: 679, name: '未使用量'}
                ]
              }
            ]
          },
          height: 300
        },
        // 上季度追溯数据
        echartData8: {
          id: 'main8',
          option: {
            legend: {
              data: ['追溯码使用数量', '追溯码扫码数量'],
              itemWidth: 25,
              itemHeight: 5,
              icon: 'roundRect'
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '3%',
              right: '5%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              name: '',
              axisLabel: {
                rotate: 15
              },
              type: 'category',
              data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
              boundaryGap: false
            },
            yAxis: {
              name: '数量（条）',
              type: 'value'
            },
            series: [{
              name: '追溯码使用数量',
              type: 'line',
              data: [22800, 17700, 20000, 18000, 21900, 12800, 17600, 24000, 13600, 20000],
              symbolSize: 6,
              itemStyle: {
                normal: {
                  color: '#e08ab9',
                  lineStyle: {
                    width: 4,
                    color: '#e08ab9'
                  }
                }
              }
            }, {
              name: '追溯码扫码数量',
              type: 'line',
              data: [20800, 12700, 25000, 16000, 22000, 16800, 20600, 20000, 12700, 21000],
              symbolSize: 6,
              itemStyle: {
                normal: {
                  color: '#00a0e8',
                  lineStyle: {
                    width: 4,
                    color: '#00a0e8'
                  }
                }
              }
            }]
          },
          height: 300
        },
        echartData7: {
          id: 'main7',
          option: {
            tooltip: {
              trigger: 'axis'
            },
            backgroundColor: '',
            grid: {
              top: 50,
              left: 70,
              right: 50
            },
            legend: {
              top: '20',
              textStyle: {
                fontSize: 14
              }
            },
            xAxis: [{
              type: 'category',
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#666',
                  fontSize: 14
                }
              },
              splitLine: {
                show: false
              },
              data: ['9月', '10月', '11月', '12月', '1月', '2月']
            }],
            yAxis: [{
              type: 'value',
              name: '可追溯数据总量（条）',
              nameTextStyle: {
                color: '#999',
                fontSize: 14
              },
              min: 0,
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#666',
                  fontSize: 14
                }
              }
            }, {
              type: 'value',
              name: '环比增长速度',
              nameTextStyle: {
                color: '#999',
                fontSize: 14
              },
              min: 0,
              max: 50,
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              interval: 10,
              axisLabel: {
                formatter: '{value} %',
                textStyle: {
                  color: '#666',
                  fontSize: 14
                }
              }
            }],
            series: [{
              name: '可追溯数据总量（条）',
              type: 'bar',
              barWidth : 30,
              itemStyle: {
                normal: {
                  color: '#fdaa42'
                }
              },
              data: ["", "", 2782, 3217, 4386, 5741]
            }, {
              name: '环比增长速度',
              type: 'line',
              lineStyle: {
                normal: {
                  color: '#05b8ff'
                }
              },
              itemStyle: {
                normal: {
                  color: '#05b8ff',
                  borderWidth: 5
                }
              },
              yAxisIndex: 1,
              data: ['', '', '', '15.64', '36.34', '30.89']
            }]
          },
          height: 250
        }
      }
    },
    created: function () {
      let _this = this
      _this.init()
      setInterval(() => {
        if (_this.showIndex < _this.items.length - 1 - _this.step &&
          _this.items.length - _this.showIndex + _this.listSize >= 0) {
          _this.showIndex += _this.step
        } else {
          _this.showIndex = 0
        }
      }, 1000)
      _this.markers.icon = new AMap.Icon({
        image: "11111.png",
        size: new AMap.Size(128, 128),  //图标大小
        imageSize: new AMap.Size(64, 64)
      })
    },
    computed: {
      classOption() {
        return {
          step: 0.5,
          limitMoveNum: 5
        }
      },
      list: function () {
        let _this = this
        let max = _this.showIndex + _this.listSize
        let rest = _this.items.length - max
        return _this.items.filter((item, index) =>
          rest > 0 ? index >= _this.showIndex && index < max : index >= _this.showIndex || index < -rest
        )
      },
      ...mapGetters({
        enterpriseCountData: 'enterpriseCountData',
        equipmentRunStatusData: 'equipmentRunStatusData',
        lastQuarterTraceDataAnalysisData: 'lastQuarterTraceDataAnalysisData',
        workExamineAnalysisData: 'workExamineAnalysisData'
      })
    },
    watch: {
      // 经营主体分部统计
      enterpriseCountData: function () {
        let _this = this
        _this.enterpriseTypeList = _this.enterpriseCountData.enterpriseTypeList
        _this.enterpriseTotalNum = _this.enterpriseCountData.enterpriseTotalNum
        _this.enterpriseTypeCount = _this.enterpriseCountData.enterpriseTypeCount
        _this.changeType(_this.enterpriseTypeList[0].nodeTypeNo, _this.enterpriseTypeList[0].nodeTypeName)
      },
      // 设备运行情况
      equipmentRunStatusData: function () {
        let _this = this
        _this.equipmentRunStatusNum.normalNum = _this.equipmentRunStatusData.normalNum
        _this.equipmentRunStatusNum.stopUseNum = _this.equipmentRunStatusData.stopUseNum
        _this.equipmentRunStatusNum.notUseNum = _this.equipmentRunStatusData.notUseNum
      },
      // 上季度追溯数据分析
      lastQuarterTraceDataAnalysisData: function () {
        let _this = this
        _this.traceDataAnalysis.monthDataList = []
        _this.traceDataAnalysis.traceNumDataList = []
        _this.traceDataAnalysis.growthRateDataList = []
        _this.lastQuarter.start = _this.lastQuarterTraceDataAnalysisData.lastQuarterStart
        _this.lastQuarter.end = _this.lastQuarterTraceDataAnalysisData.lastQuarterEnd
        let traceData = _this.lastQuarterTraceDataAnalysisData.traceData
        for (let i = 0; i < traceData.length; i++) {
          _this.traceDataAnalysis.monthDataList.push(traceData[i].monthName)
          _this.traceDataAnalysis.traceNumDataList.push(traceData[i].dataNum)
          _this.traceDataAnalysis.growthRateDataList.push(traceData[i].yearOnYearGrowthRate)
        }
        _this.echartData6.option.xAxis[0].data = _this.traceDataAnalysis.monthDataList
        _this.echartData6.option.series[0].data = _this.traceDataAnalysis.traceNumDataList
        _this.echartData6.option.series[1].data = _this.traceDataAnalysis.growthRateDataList
      },
      // 工作考核分析
      workExamineAnalysisData: function () {
        let _this = this
        let rateData = []
        // 平均得分
        _this.echartData3.option.title.text = "平均得分" + _this.workExamineAnalysisData.avgNum + "分 " + _this.workExamineAnalysisData.avgNumLevel
        // 上月日期
        _this.workExamineAnalysis.lastMonth = _this.workExamineAnalysisData.lastMonth
        // 备案信息完整率
        _this.workExamineAnalysis.recordIntegrityRate = _this.workExamineAnalysisData.recordIntegrityRate
        rateData.push(_this.workExamineAnalysis.recordIntegrityRate)
        // 上传追溯信息活跃率
        _this.workExamineAnalysis.traceDataActiveRate = _this.workExamineAnalysisData.traceDataActiveRate
        rateData.push(_this.workExamineAnalysis.traceDataActiveRate)
        // 设备正常率
        _this.workExamineAnalysis.equipmentNormalRate = _this.workExamineAnalysisData.equipmentNormalRate
        rateData.push(_this.workExamineAnalysis.equipmentNormalRate)
        // 上传信息及时率
        _this.workExamineAnalysis.traceDataTimelyRate = _this.workExamineAnalysisData.traceDataTimelyRate
        rateData.push(_this.workExamineAnalysis.traceDataTimelyRate)
        // 传信息完整率
        _this.workExamineAnalysis.traceDataIntegrityRate = _this.workExamineAnalysisData.traceDataIntegrityRate
        rateData.push(_this.workExamineAnalysis.traceDataIntegrityRate)
        // 上传信息规范率
        _this.workExamineAnalysis.traceDataStandardRate = _this.workExamineAnalysisData.traceDataStandardRate
        rateData.push(_this.workExamineAnalysis.traceDataStandardRate)
        // 本期追溯码使用率
        _this.workExamineAnalysis.traceCodeUseRate = _this.workExamineAnalysisData.traceCodeUseRate
        rateData.push(_this.workExamineAnalysis.traceCodeUseRate)
        // 累计追溯码使用率
        _this.workExamineAnalysis.allTraceCodeUseRate = _this.workExamineAnalysisData.allTraceCodeUseRate
        rateData.push(_this.workExamineAnalysis.allTraceCodeUseRate)
        _this.echartData3.option.series[0].data[3].value = rateData
        // 考核等级 优秀 良好 达标 不达标
        let veryGood = _this.workExamineAnalysisData.examineLevelList[0].levelValue
        let good = _this.workExamineAnalysisData.examineLevelList[1].levelValue
        let commonly = _this.workExamineAnalysisData.examineLevelList[2].levelValue
        let veryGoodList = [veryGood, veryGood, veryGood, veryGood, veryGood, veryGood, veryGood, veryGood]
        let goodList = [good, good, good, good, good, good, good, good]
        let commonlyList = [commonly, commonly, commonly, commonly, commonly, commonly, commonly, commonly]
        _this.echartData3.option.series[0].data[0].value = veryGoodList
        _this.echartData3.option.series[0].data[1].value = goodList
        _this.echartData3.option.series[0].data[2].value = commonlyList
      }
    },
    methods: {
      init: function () {
        let _this = this
        Api.CityPlatform.getScanCodeCount().then(data => {
          _this.scanCodeCount = data.data.count
        })
        setInterval(() => {
          Api.CityPlatform.getScanCodeCount().then(data => {
            _this.scanCodeCount = data.data.count
          })
        }, 1000 * 10)
        // 当前日期
        _this.nowDate = utils.DateUtil.parseTime(new Date(), '{y}.{m}.{d}')
        // 经营主体分部统计
        _this.getEnterpriseCountData()
        // 设备运行情况
        _this.getEquipmentRunStatusData()
        // 上季度追溯数据分析
        _this.getLastQuarterTraceDataAnalysisData()
        // 工作考核分析
        _this.getWorkExamineAnalysisData()
      },
      beforeEnter: function (el) {
        el.style.opacity = 0
        el.style.height = 0
      },
      enter: function (el, done) {
        let delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            {opacity: 1, height: '1.6em'},
            {complete: done}
          )
        }, delay)
      },
      leave: function (el, done) {
        let delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            {opacity: 0, height: 0},
            {complete: done}
          )
        }, delay)
      },
      changeType: function (enterpriseTypeNo, enterpriseTypeName) {
        let _this = this
        _this.markers = []
        var iconIndex = 0
        for (var key in _this.enterpriseTypeCount) {
          var icon = _this.enterpriseTypeIcons[iconIndex++]
          if (key === enterpriseTypeNo) {
//            _this.enterpriseNum = enterpriseTypeName + '企业共' + _this.enterpriseTypeCount[key].length + '家'
            _this.enterpriseNum = _this.enterpriseTypeCount[key].length + '家'
            var marker = {'position': [0, 0]}
            for (var i = 0; i < _this.enterpriseTypeCount[key].length; i++) {
              marker = {
                'position': [_this.enterpriseTypeCount[key][i].longitude, _this.enterpriseTypeCount[key][i].latitude],
                'icon': icon
              }
              _this.markers.push(marker)
            }
          }
        }
      },
      ...mapActions({
        getEnterpriseCountData: 'getEnterpriseCountData',
        getEquipmentRunStatusData: 'getEquipmentRunStatusData',
        getLastQuarterTraceDataAnalysisData: 'getLastQuarterTraceDataAnalysisData',
        getWorkExamineAnalysisData: 'getWorkExamineAnalysisData'
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

  .zscoress #zmap .zmapbtn {
    display: inline-block;
    border: 1px solid #fff;
    min-width: 80px;
    font-size: 16px;
    text-align: center;
    border-radius: 3px;
    /*margin-top: 20px;*/
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    color: rgba(51, 51, 51, .7);
  }

  .zscoress #zmap .zmapbtn:focus {
    outline: none;
  }

  .zscoress #zmap .zmapbtn {
    float: left;
    border: 1px solid #ccc;
    margin-bottom: 1px;
  }

  .amap-info div:nth-child(2) {
    bottom: 17px !important;
    left: 12px !important;
  }

  .zscoress .z-operation {
    display: inline-block;
    min-width: 100px;
    padding: 2px 5px;
    font-size: 14px;
    border-radius: 3px;
    color: #999999;
    line-height: 26px;
  }

  .zscoress .z-operations {
    font-size: 20px;
    font-weight: 400;
  }

  .zscoress .nownews ul {
    margin: 0px 0 0 25px;
    font-size: 18px;
  }

  .zscoress .dssaz {
    position: absolute;
    right: 10px;
    color: #6b6b6b;
    top: 130px;
    z-index: 8;
  }

  .zscoress .dssaz .ecssz {
    display: block;
    height: 20px;
    line-height: 40px;
    font-size: 14px;
    margin-top: 10px;
    margin-right: 15px;
  }

  .zscoress .dssaz .ecssza {
    background-color: #61b8eb;
  }

  .zscoress .dssaz .ecsszb {
    background-color: #84edae;
  }

  .zscoress .dssaz .ecsszc {
    background-color: #ebca6a;
  }

  .zscoress .dssaz .ecsszd {
    background-color: #f37b1d;
  }

  .my-line {
    width: 100%;
    border: 1px dashed #ccc;
    margin-bottom: 10px;
  }

   /*今日提示*/
  .seamless-warp {
    height: 250px;
    overflow: hidden;
    color: #6b6b6b;
  }

  .seamless-warp .item .title {
    font-size: 16px;
    font-weight: 700;
  }
  .seamless-warp .item .date {
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 12px;
  }

  .zscoress #zmap .el-vue-amap-container {
    height: 312px !important;
  }

  /*经营主体分布统计*/
  .nums{
    font-size: 16px;
  }
  .num1 {
    position: absolute;
    bottom: -124px;
    left: 25%;
    color: rgba(51, 51, 51, .7);
  }

  .num2 {
    position: absolute;
    bottom: -124px;
    left: 59%;
    color: rgba(51, 51, 51, .7);
  }

  .num3 {
    position: absolute;
    bottom: -124px;
    left: 94%;
    color: rgba(51, 51, 51, .7);
  }

  .num4 {
    position: absolute;
    bottom: -155px;
    left: 25%;
    color: rgba(51, 51, 51, .7);
  }
  .num5 {
    position: absolute;
    bottom: -155px;
    left: 59%;
    color: rgba(51, 51, 51, .7);
  }

  .num6 {
    position: absolute;
    bottom: -155px;
    left: 94%;
    color: rgba(51, 51, 51, .7);
  }

  .nums1 {
    position: absolute;
    bottom: -125px;
    left: 4%;
  }

  .nums2 {
    position: absolute;
    bottom: -125px;
    left: 38%;
  }

  .nums3 {
    position: absolute;
    bottom: -125px;
    left: 69%;
  }

  .nums4 {
    position: absolute;
    bottom: -155px;
    left: 4%;
  }

  .nums5 {
    position: absolute;
    bottom: -155px;
    left: 38%;
  }

  .nums6 {
    position: absolute;
    bottom: -155px;
    left: 69%;
  }

  .main-zscoress {
    margin-top: 5px !important;
  }

  .tab-third tbody tr td:nth-child(3) {
    color: #00a0e8;
  }
  /*.tab-third  tr td {
    font-weight:700;
  }*/
  /*.tabs-con  tr td {
    font-weight: 700;
  }*/
</style>
