<!--备案信息统计-->
<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>追溯管理系统</a></li>
      <li><a>经营主体管理</a></li>
      <li class="active jsh-active">备案信息统计</li>
    </ol>
    <!--search 组件-->
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <!--双日历插件-->
            <label>备案日期：</label>
            <el-date-picker v-model="params.startTime" type="date" placeholder="开始日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="params.endTime" type="date" placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn  btn-search" @click="search"> 查询 </button>
          </div>
        </form>
      </div>
    </div>
    <!--search 组件 end-->
    <div class="table-title-box">
      <h3>备案信息统计</h3>
    </div>
    <div class="shadow-boxs">
      <!--信息备案管理图-->
      <ipt-echart :echartData="fileStatisticsEchartData"></ipt-echart>
    </div>
    <div class="mb-30">
      <ipt-table
        :tableData="enterpriseInfoTableData"
        :tableConfig.sync="enterpriseInfoListConfig"
        :params="params">
      </ipt-table>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapGetters, mapActions} from 'vuex'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import IptEchart from '@/components/common/echart'
  import IptTable from "@/components/common/table"

  export default {
    data: function () {
      return {
        params: {
          startTime: '',
          endTime: ''
        },
        enterpriseInfoListConfig: {
          getApi: 'getEnterpriseInfoTableData',  // #必须# 数据的的请求Vuex的Action名
          display: 5,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '企业名称', data: 'enterpriseName'},
            {title: '企业类型', data: 'enterpriseTypeEnum.name'},
            {title: '地址', data: 'address'},
            {title: '联系人', data: 'contacts'},
            {title: '联系电话', data: 'telephone'}
          ]
        },
        fileStatisticsEchartData: {
          id: 'main3',
          height: 500,
          option: {
            textStyle: {
              fontSize: 15,
              color: '#333'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['备案数量统计'],
              textStyle: {
                fontSize: 15,
                color: '#000'
              }
            },
            grid: {
              x: 100,
              y: 150,
              x2: 140,
              y2: 80
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            xAxis: [{
              type: 'category',
              name: '追溯企业类型',
              data: [],
              axisPointer: {
                type: 'shadow'
              },
              axisLabel: {
                textStyle: {
                  color: '#000',
                  fontSize: '16'
                }
              }
            }],
            yAxis: {
              type: 'value',
              name: '追溯企业数量/个',
              nameLocation: 'end',
              min: 0,
//              max: 50,
//              interval: 5,
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#000',
                  fontSize: '16'
                }
              }
            },
            series: {
              name: '备案数量统计',
              type: 'bar',
              data: [],
              itemStyle: {
                normal: {
                  color: '#61b8eb'
                }
              },
              barWidth: 30
            }
          }
        }
      }
    },
    components: {
      IptEchart, IptTable
    },
    watch: {
      fileStatisticsData(curVal) {
        this.fileStatisticsEchartData.option.xAxis[0].data = []
        this.fileStatisticsEchartData.option.series.data = []
        for (let i = 0; i < curVal.data.length; i++) {
          let obj = curVal.data[i]
          this.fileStatisticsEchartData.option.xAxis[0].data.push(obj.enterpriseTypeName)
          this.fileStatisticsEchartData.option.series.data.push(obj.count)
        }
      }
    },
    created: function () {
      this.search()
    },
    computed: mapGetters({
      fileStatisticsData: 'fileStatisticsData',
      enterpriseInfoTableData: 'enterpriseInfoTableData'
    }),
    methods: {
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      search() {
        this.getFileStatisticsData(this.params)
        this.getEnterpriseInfoTableData(this.params)
      },
      ...mapActions({
        getFileStatisticsData: 'getFileStatisticsData',
        getEnterpriseInfoTableData: 'getEnterpriseInfoTableData'
      })
    }
  }
</script>
