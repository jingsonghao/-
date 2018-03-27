<template>
  <div class="col-lg-12">
    <div class="shadow-boxs">
      <div class="col-lg-12 col-12">
        <div style="height: 398px">
          <div class="sum">
            <span class="text-left">宁夏追溯企业综合走势图</span>
          </div>
          <!-- 进度 -->
          <div class="m-progress" style="margin-top: 25px">
            <ipt-echart :echartData="echartData"></ipt-echart>
          </div>
        </div>
      </div>
      <!--考核评价表格-->
      <div class="table-container">
        <div class="thead-bg"></div>
        <div class="col-xs-12 table-box">
          <table class="table table-condensed">
            <thead>
            <tr>
              <th>序号</th>
              <th>考评日期</th>
              <th>参与考评企业数</th>
              <th>考评指标数</th>
              <th>均值分数</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>2017-09-30</td>
              <td>365</td>
              <td>24</td>
              <td>89.32</td>
              <td><a>查看</a></td>
            </tr>
            <tr>
              <td>2</td>
              <td>2017-08-30</td>
              <td>374</td>
              <td>22</td>
              <td>90.32</td>
              <td><a>查看</a></td>
            </tr>
            <tr>
              <td>3</td>
              <td>2017-07-30</td>
              <td>348</td>
              <td>20</td>
              <td>89.55</td>
              <td><a>查看</a></td>
            </tr>
            <tr>
              <td>4</td>
              <td>2017-06-30</td>
              <td>366</td>
              <td>23</td>
              <td>82.2</td>
              <td><a>查看</a></td>
            </tr>
            <tr>
              <td>5</td>
              <td>2017-05-30</td>
              <td>360</td>
              <td>24</td>
              <td>86.66</td>
              <td><a>查看</a></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <nav aria-label="Page navigation" class="pull-right">
        <ul class="pagination pagination-sm">
          <li class="previous disabled">
            <span aria-hidden="true">«</span>
          </li>
          <li class="active "><a>1</a></li>
          <li><a>2</a></li>
          <li><a>3</a></li>
          <li><a>4</a></li>
          <li><a>5</a></li>
          <li class="next">
            <a aria-label="Next">
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import IptEchart from '@/components/common/echart'
  import Api from '@/ipt-supervise-help/api'
  export default {
    created() {
      this.init()
    },
    components: {
      IptEchart, Api
    },
    data () {
      return {
        echartData: {
          id: 'main1',
          height: 300,
          option: {
            textStyle: {
              fontSize: 12,
              color: '#333'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['评分'],
              textStyle: {
                fontSize: 12,
                color: '#000'
              }
            },
            color: ['#61B8eb'],
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            xAxis: [{
              type: 'category',
              name: '',
              data: [],
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
              name: '分数/分',
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
              name: '评分',
              type: 'line',
              data: [],
              barWidth: 30
            }
          }
        }
      }
    },
    methods: {
      init() {
        let obj = this
        Api.TotalExamine.getExamineEchart().then((data) => {
          let nestedData = data.data
          obj.echartData.option.xAxis[0].data = []
          obj.echartData.option.series.data = []
          if (nestedData) {
            nestedData.forEach(element => {
              obj.echartData.option.xAxis[0].data.push(element.examineDateStr)
              obj.echartData.option.series.data.push(element.averageScore)
            })
          }
        })
      }
    }
  }
</script>
<style>

</style>
