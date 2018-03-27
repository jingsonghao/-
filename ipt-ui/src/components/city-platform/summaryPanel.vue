<template>
  <div class="col-lg-12">
    <div class="shadow-boxs">
      <div class="col-lg-12 col-12">
        <div style="height: 398px">
          <div class="sum">
                <span class="text-left">企业备案数量</span><span class="flr">{{ nowDate }}</span>
          </div>
          <!-- 进度 -->
          <div class="m-progress" style="margin-top: 25px">
            <ipt-echart :echartData="fileStatisticsEchartData"></ipt-echart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import IptEchart from '@/components/common/echart'
  import {mapGetters, mapActions} from 'vuex'
  import utils from '@/utils'

  export default {
    data: function () {
      return {
        nowDate: '2018-01-01',
        fileStatisticsEchartData: {
          id: 'main1',
          height: 300,
          option: {
            title: {
              text: '总计0'
            },
            textStyle: {
              fontSize: 12,
              color: '#333'
            },
            tooltip: {
              trigger: 'axis'
            },
//            legend: {
//              data: ['法人责任主体', '门店', '自然人责任主体'],
//              textStyle: {
//                fontSize: 12,
//                color: '#000'
//              }
//            },
            color:['#61B8eb'],
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            xAxis: [{
              type: 'category',
              name: '',
              data: ['法人责任主体', '门店', '自然人责任主体'],
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                textStyle: {
                  color: '#000',
                  fontSize: 12
                }
              }
            }],
            yAxis: {
              type: 'value',
              name: '备案数量',
              nameLocation: 'end',
              min: 0,
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#000',
                  fontSize: 12
                }
              }
            },
            series: {
              name: '备案数量',
              type: 'bar',
              data: [],
              barWidth: 35,
              itemStyle:{
                normal:{
                  // 定制显示（按顺序）
                  color: function(params) {
                    var colorList = ['#61b8eb', '#4cbeb5', '#65c4c3']
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          }
        }
      }
    },
    created: function () {
      let _this = this
      _this.init()
    },
    methods:{
      init: function () {
        let _this = this
        // 当前日期
        _this.nowDate = utils.DateUtil.parseTime(new Date(), '{y}.{m}.{d}')
        _this.getEnterpriseRecordsNumCountData()
      },
      ...mapActions({
        getEnterpriseRecordsNumCountData: 'getEnterpriseRecordsNumCountData'
      })
    },
    watch:{
      enterpriseRecordsNumCountData: function () {
        let _this = this
        _this.fileStatisticsEchartData.option.series.data[0] = _this.enterpriseRecordsNumCountData.enterpriseNumCount
        _this.fileStatisticsEchartData.option.series.data[1] = _this.enterpriseRecordsNumCountData.storeNumCount
        _this.fileStatisticsEchartData.option.series.data[2] = _this.enterpriseRecordsNumCountData.businessNumCount
        _this.fileStatisticsEchartData.option.title.text = '总计 ' + (parseInt(_this.enterpriseRecordsNumCountData.enterpriseNumCount) + parseInt(_this.enterpriseRecordsNumCountData.storeNumCount) + parseInt(_this.enterpriseRecordsNumCountData.businessNumCount))
      }
    },
    computed:mapGetters({
      enterpriseRecordsNumCountData: 'enterpriseRecordsNumCountData'
    }),
    components: {
      IptEchart
    }
  }
</script>
