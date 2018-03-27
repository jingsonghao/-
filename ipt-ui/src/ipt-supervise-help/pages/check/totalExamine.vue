<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>工作考核管理</a></li>
      <li class="active jsh-active">综合性考核</li>
    </ol>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <!--表格标题部分-->
        <div class="table-title-box">
          <h3>宁夏追溯企业综合考核走势图（当前日期前一年）</h3>
        </div>
        <!--考核评价图标-->
        <ipt-echart :echartData="echartData" id="main"></ipt-echart>
        <div class="shadow-boxs">
          <div class="r-search">
            <form class="form form-inline">
              <div class="form-group">
                <!--双日历插件-->
                <label>考评年月</label>
                <div class="form-group">
                  <el-date-picker v-model="params.minDate" name="minDate" type="month" value-format="yyyy-MM-DD"
                                  format="yyyy-MM" placeholder="选择年月"></el-date-picker>
                </div>
                <label>—</label>
                <div class="form-group">
                  <el-date-picker id="ids" v-model="params.maxDate" name="maxDate" type="month" value-format="yyyy-MM-DD"
                                  format="yyyy-MM" placeholder="选择年月"></el-date-picker>
                </div>
              </div>
              <div class="form-group my-group">
                <button type="button" class="btn btn-reset" @click="reset"> 重置</button>
                <button type="button" class="btn btn-search" @click.sync="search"> 查询</button>
              </div>
            </form>
          </div>
        </div>
        <ipt-table
          :tableData="totalExamine"
          :tableConfig="tableConfig"
          :params="params">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)">查看</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>

</template>

<script>
  import IptEchart from '@/components/common/echart'
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import Api from '@/ipt-supervise-help/api'
  export default {
    created() {
      this.init()
    },
    components: {
      IptEchart, IptTable, Api
    },
    data() {
      return {
        echartData: {
          id: 'main',
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
              data: ['评分']
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            xAxis: [{
              type: 'category',
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
            yAxis: [
              {
                type: 'value',
                name: '分数/分',
                min: 0,
                max: 100,
                interval: 10,
                axisLabel: {
                  textStyle: {
                    color: '#000',
                    fontSize: '16',
                    formatter: '{value} 分'
                  }
                }
              },
              {
                type: 'value',
                name: '分数/分',
                min: 0,
                max: 100,
                interval: 10,
                axisLabel: {
                  textStyle: {
                    color: '#000',
                    fontSize: '16',
                    formatter: '{value} 分'
                  }
                }
              }
            ],
            series: [{
              name: '评分',
              type: 'line',
              itemStyle: {
                //通常情况下：
                normal:{
                  color: '#61b8eb'
                }
              },
              yAxisIndex: 1,
              data: []
            }
            ]
          }
        },
        params: {
          minDate: '',
          maxDate: ''
        },
        tableConfig: {
          getApi: 'getTotalExamine',
          title: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          sequenceShow: true,
          columns: [
            {title: '考评年月', data: 'examineDateStr'},
            {title: '参与考评企业数/个', data: 'enterpriseCount'},
            {title: '考评指标数/个', data: 'examineIndexCount'},
            {title: '均值分数/分', data: 'averageScore'}
          ]
        }
      }
    },
    computed: mapGetters({
      totalExamine: 'totalExamine'
    }),
    methods: {
      init() {
        let obj = this
        obj.getTotalExamine(this.params)
        Api.TotalExamine.getExamineEchart().then((data) => {
          let nestedData = data.data
          obj.echartData.option.xAxis[0].data = []
          obj.echartData.option.series[0].data = []
          if (nestedData) {
            nestedData.forEach(element => {
              obj.echartData.option.xAxis[0].data.push(element.examineDateStr)
              obj.echartData.option.series[0].data.push(element.averageScore)
            })
          }
        })
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      search() {
        this.getTotalExamine(this.params)
      },
      showBtn(columnData) {
        this.setSingleExamineEnterpriseEtDate(columnData.examineDate)
        this.$router.push({path: 'singleExamineEnterprise'})
      },
      ...mapActions({
        getTotalExamine: 'getTotalExamine',
        setSingleExamineEnterpriseEtDate: 'setSingleExamineEnterpriseEtDate'
      })
    }
  }
</script>
