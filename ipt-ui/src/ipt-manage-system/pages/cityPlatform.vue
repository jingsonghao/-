<template>
  <div class="main">
    <ol class="breadcrumb">
      <li class="active jsh-active">平台首页</li>
    </ol>
    <div class="col-lg-4">
      <ipt-summary-panel :data="summaryData"></ipt-summary-panel>
      <ipt-credit-panel :data="creditData"></ipt-credit-panel>
    </div>
    <div class="col-lg-4">
      <div class="shadow-boxs ">
        <div class="col-lg-12">
          <div class="sum">
                        <span class="text-left">企业汇总<img :src="img.help" alt=""><br>
                        <span>2017.10.10</span>
                        </span>
            <span class="construction-rate">
                          <br>
                          <span class="con-rate">24.0%</span>
                        </span>
          </div>
          <!--考核评价图标-->
          <ipt-echart :echartData="echartData3"></ipt-echart>
          <div class="col-lg-12">
            <ipt-table :tableData="creditRankTableData" :tableConfig="busSumConfig"></ipt-table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12">
            <div class="sum">
                        <span class="text-left">追溯汇总<img :src="img.help" alt=""><br>
                        <span>2017.10.10</span>
                        </span>
              <span class="construction-rate">
                          <span>&nbsp;&nbsp;追&nbsp;溯&nbsp;合&nbsp;成&nbsp;率</span>
                          <br>
                          <span class="con-rate">24.0%</span>
                        </span>
            </div>
            <div class="dropdown">
              <button class="btn btn-default-a  " type="button" id="dropdownMenu1" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="true">
                超市单位
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu m-dropdown-menu " aria-labelledby="dropdownMenu1">
                <li><a href="#">超市单位</a></li>
                <li><a href="#">种植（养殖）企业</a></li>
                <li><a href="#">团消单位</a></li>
                <li><a href="#">特色企业</a></li>
              </ul>
            </div>
            <!--考核评价图标-->
            <ipt-echart :echartData="echartData4"></ipt-echart>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="shadow-boxs">
          <div class="col-lg-12">
            <div class="sum">
              <span class="text-left">分析报告<br>
              <span>2017.10.10</span>
              </span>
              <div class="construction-rate">
                <div class="dropdown">
                  <button class="btn btn-default-a " type="button" id="dropdownMenu1" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="true">
                    超市单位
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu m-dropdown-menu " aria-labelledby="dropdownMenu1">
                    <li><a href="#">超市单位</a></li>
                    <li><a href="#">种植（养殖）企业</a></li>
                    <li><a href="#">团消单位</a></li>
                    <li><a href="#">特色企业</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <ipt-table :tableData="creditRankTableData" :tableConfig="reportConfig"></ipt-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptEchart from '@/components/common/echart'
  import IptSummaryPanel from '@/components/city-platform/summaryPanel'
  import IptCreditPanel from '@/components/city-platform/creditPanel'
  import Dot2 from '@/assets/img/dot-2.png'
  import Help from '@/assets/img/help.png'

  export default {
    data() {
      return {
        busSumConfig: {
          getApi: 'getCreditRankTableData',
          titleShow: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          checkboxShow: false,
          sequenceShow: true,
          columns: [
            { title: '主键', data: 'enterpriseId' },
            { title: '企业编号', data: 'enterpriseNo' },
            { title: '节点主键', data: 'nodeBaseInfoId' },
            { title: '企业名称', data: 'enterpriseName' },
            { title: '组织机构码', data: 'orgNumber' }
          ]
        },
        reportConfig: {
          getApi: 'getCreditRankTableData',
          titleShow: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          checkboxShow: false,
          sequenceShow: true,
          columns: [
            { title: '主键', data: 'enterpriseId' },
            { title: '企业编号', data: 'enterpriseNo' },
            { title: '节点主键', data: 'nodeBaseInfoId' },
            { title: '企业名称', data: 'enterpriseName' },
            { title: '组织机构码', data: 'orgNumber' }
          ]
        },
        img: {Dot2, Help},
        summaryData: {
          title: '企业汇总',
          date: '2017.10.10',
          rateName: '建　　设　　率',
          rate: '36.0%',
          list: [
            {
              shortName: 'C1',
              name: '种植（养殖）企业',
              successRate: '50%',
              warningRate: '40%',
              dangerRate: '5%'
            },
            {
              shortName: 'C2',
              name: '超市单位',
              successRate: '50%',
              warningRate: '40%',
              dangerRate: '5%'
            },
            {
              shortName: 'C3',
              name: '团消单位',
              successRate: '50%',
              warningRate: '40%',
              dangerRate: '5%'
            },
            {
              shortName: 'C4',
              name: '特色产品',
              successRate: '50%',
              warningRate: '40%',
              dangerRate: '5%'
            }
          ]
        },
        creditData: {
          title: '企业信用排名',
          date: '2017.10.10',
          rateName: '建　　设　　率',
          rate: '36.0%',
          list: [
            {
              shortName: 'C1',
              name: '种植（养殖）企业',
              successRate: '50%',
              warningRate: '40%',
              dangerRate: '5%'
            },
            {
              shortName: 'C2',
              name: '超市单位',
              successRate: '50%',
              warningRate: '40%',
              dangerRate: '5%'
            },
            {
              shortName: 'C3',
              name: '团消单位',
              successRate: '50%',
              warningRate: '40%',
              dangerRate: '5%'
            },
            {
              shortName: 'C4',
              name: '特色产品',
              successRate: '50%',
              warningRate: '40%',
              dangerRate: '5%'
            }
          ]
        },
        echartData3: {
          id: 'main3',
          height: 430,
          option: {
            radar: [
              {
                indicator: [
                  {text: '种植（养殖）企业'},
                  {text: '超市单位'},
                  {text: '特色企业'},
                  {text: '团消单位'}
                ],
                center: ['50%', '50%'],
                radius: 90,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                name: {
                  formatter: '{value}',
                  textStyle: {
                    color: '#fff'
                  }
                },
                splitArea: {
                  areaStyle: {
                    color: ['rgba(26, 64, 83, 0.5)',
                      'rgba(26, 64, 83, 0.5)', 'rgba(26, 64, 83, 0.5)',
                      'rgba(26, 64, 83, 0.5)'],
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 10
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                  }
                }
              }
            ],
            series: [
              {
                name: '雷达图',
                type: 'radar',
                itemStyle: {
                  emphasis: {
                    // color: 各异,
                    lineStyle: {
                      width: 4
                    }
                  }
                },
                data: [
                  {
                    value: [100, 8, 0.40, -80],
                    name: '合格供应商企业',
                    symbol: 'rect',
                    symbolSize: 5,
                    lineStyle: {
                      normal: {
                        type: 'dashed'
                      }
                    }
                  },
                  {
                    value: [60, 5, 0.30, -100],
                    name: '超市单位',
                    areaStyle: {
                      normal: {
                        color: 'rgba(255, 255, 255, 0.5)'
                      }
                    }
                  },
                  {
                    value: [30, 22, 0.40, -100],
                    name: '特色企业',
                    areaStyle: {
                      normal: {
                        color: 'rgba(255, 255, 255, 0.5)'
                      }
                    }
                  },
                  {
                    value: [60, 5, 0.90, -1200],
                    name: '团消单位',
                    areaStyle: {
                      normal: {
                        color: 'rgba(255, 255, 255, 0.5)'
                      }
                    }
                  }
                ]
              }
            ]
          }
        },
        echartData4: {
          id: 'main4',
          option: {
            color: ['#09e4c7', '#09c9e8'],
            tooltip: {
              trigger: 'axis'
            },

            calculable: false,
            legend: {
              data: ['同比', '环比'],
              textStyle: {    //图例文字的样式
                color: '#fff',
                fontSize: 12
              }
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: true,
                data: ['4月', '5月', '6月', '7月', '8月', '9月', '10月'],
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                }
              }
            ],
            series: [
              {
                name: '同比',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '环比',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
              }
            ]
          },
          height: 300
        }
      }
    },
    components: {
      IptEchart, IptSummaryPanel, IptCreditPanel, IptTable
    },
    computed: mapGetters({
      creditRankTableData: 'creditRankTableData'
    }),
    created() {
      this.$store.dispatch('getCreditRankTableData', {page: 1})
    }
  }
</script>

<style>

</style>
