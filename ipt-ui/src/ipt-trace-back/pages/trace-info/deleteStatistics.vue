<template>
  <div>
    <ol class="breadcrumb">
      <li><a>追溯管理系统</a></li>
      <li><a>追溯信息管理</a></li>
      <li class="active jsh-active">剔除信息统计</li>
    </ol>
    <div class="main">
      <div class="shadow-boxs">
        <div class="col-lg-12">
          <!--表格标题部分-->
          <div class="table-title-box">
            <h3>年度剔除信息统计</h3>
            <el-select v-model="params.year" @change="search" class="search-02">
              <el-option
                v-for="item in yearList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!--考核评价图标-->
          <ipt-echart :echartData="DeleteStatisticsEchartData"></ipt-echart>
        </div>
      </div>
      <ipt-table
        :tableData="deleteStatisticsTableData"
        :tableConfig="tableDataConfig"
        :pagerShow="pagerShow"
        :params="params.year">
      </ipt-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptEchart from '@/components/common/echart'
  import IptTable from "@/components/common/table"

  export default {
    components: {
      IptEchart,
      IptTable
    },
    created() {
      this.init()
    },
    data: function () {
      return {
        DeleteStatisticsEchartData: {
          id: 'main2',
          height: 300,
          option: {
            title: {
              text: '',
              textStyle: {
                color: '#000'
              },
              left: 'left'
            },
            textStyle: {
              fontSize: 15,
              color: '#000'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#000'
                }
              }
            },
            legend: {
              data: ['剔除重复信息数', '剔除错误信息数'],
              textStyle: {    //图例文字的样式
                color: '#000',
                fontSize: 15
              }
            },
            xAxis: [{
              type: 'category',
              data: [],
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                interval: 0, //横轴信息全部显示
                rotate: 0, //-30度角倾斜显示
                textStyle: {
                  color: '#000',
                  fontSize: '16'
                }
              }
            }],
            yAxis: [
              {
                type: 'value',
                name: '条数',
//                min: 0,
//                max: 100,
//                interval: 10,
                splitLine: {
                  lineStyle: {
                    // 使用深浅的间隔色
                    color: ['rgba(255,255,255,0)']
                  }
                },
                axisLabel: {
                  formatter: '{value}',
                  textStyle: {
                    color: '#000',
                    fontSize: '16'
                  }
                }
              }
            ],
            series: [
              {
                name: '剔除重复信息数',
                type: 'bar',
                data: [],
                itemStyle: {
                  //通常情况下：
                  normal: {
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
                name: '剔除错误信息数',
                type: 'bar',
                data: [],
                itemStyle: {
                  //通常情况下：
                  normal: {
                    color: '#84edae'
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
        params: {
          year: '2017'
        },
        yearList: [],
        pagerShow: false,
        tableDataConfig: { //表格
          getApi: 'getDeleteStatisticsTableData',
          title: false,  //决定表格的标题内容
          sequenceShow: false,
          columns: [
            {title: '月份', data: 'monthName'},
            {title: '剔除重复信息数量/条', data: 'repeatNumber'},
            {title: '剔除错误信息数量/条', data: 'errorNumber'}
          ]
        }
      }
    },
    computed: mapGetters({
      deleteStatisticsTableData: 'deleteStatisticsTableData'
    }),
    watch: {
      deleteStatisticsTableData(curVal) {
        this.DeleteStatisticsEchartData.option.xAxis[0].data = []
        this.DeleteStatisticsEchartData.option.series[0].data = []
        this.DeleteStatisticsEchartData.option.series[1].data = []
        for (let i = 0; i < curVal.data.length; i++) {
          let obj = curVal.data[i]
          this.DeleteStatisticsEchartData.option.xAxis[0].data.push(obj.monthName)
          this.DeleteStatisticsEchartData.option.series[0].data.push(obj.repeatNumber)
          this.DeleteStatisticsEchartData.option.series[1].data.push(obj.errorNumber)
        }
      }
    },
    methods: {
      init: function () {
        let _this = this
        _this.yearList = []
        let date = new Date()
        _this.params.year = date.getFullYear()
        for (let i = 0; i < 4; i++) {
          _this.yearList.push({'name': date.getFullYear(), 'value': date.getFullYear()})
          date.setFullYear(date.getFullYear() - 1)
        }
        _this.search()
      },
      search: function () {
        let _this = this
        _this.getDeleteStatisticsTableData(_this.params.year)
      },
      /* 获取请求数据的action */
      ...mapActions({
        getDeleteStatisticsTableData: 'getDeleteStatisticsTableData'
      })
    }
  }
</script>
<style>
</style>
