<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>工作考核管理</a></li>
      <li><a>综合性考核</a></li>
      <li class="active jsh-active">按考核指标排名</li>
    </ol>
    <!--选项卡组件-->
    <div class="tab-btn-list shadow-boxs">
      <ul id="myTab" class="tab-btn list-inline">
        <li class="">
          <a class="edit" @click="gotype()">按企业排名</a>
        </li>
        <li class="">
          <a class="edit" @click="gosing()">按流通节点类型排名</a>
        </li>
        <li class="active">
          <a class="edit" @click="goindicat()">按考核指标排名</a>
        </li>
      </ul>
    </div>
    <div id="myTabContent" class="tab-content">
      <div class="tab-pane fade in active">

        <!--table 组件-->
        <div class="shadow-boxs">
          <div class="col-lg-12">
            <!--考核评价图标-->
            <!--search 组件-->
            <div>
              <ipt-echart :echartData="echartData"></ipt-echart>
            </div>
            <div class="shadow-boxs">
              <!--search 搜索框 组件-->
              <div class="r-search">
                <form class="form form-inline">
                  <div class="form-group">
                    <label>指标名称</label>
                    <select class="form-control search-01" style="width: 170px;" v-model="params.examineIndexNo">
                      <option value="">全部</option>
                      <option v-for="examineIndex in examineIndexs"
                              :value="examineIndex.eiNo">{{examineIndex.eiName}}
                      </option>
                    </select>
                  </div>
                  <div class="form-group my-group">
                    <button type="button" class="btn btn-reset" @click="reset"> 重置</button>
                    <button type="button" class="btn btn-search" @click.sync="search"> 查询</button>
                    <a class="edit" @click="goBack()">
                      <button type="button" class="btn btn-search"> 返回</button>
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <ipt-table
              :tableData="singleExamineIndex"
              :tableConfig="tableConfig"
              :params="params">
              <th slot="afterTitle">排名</th>
              <td slot="afterBody" slot-scope="scope">
                <a @click="approvalBtn(scope.columnData)">{{getSeq(scope.index)}}</a>
              </td>
            </ipt-table>
          </div>
        </div>
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
          id: 'main3',
          height: 400,
          option: {
            title: {
              text: '按考核指标与考核分数排名图表统计',
              textStyle: {
                color: '#3398DB'
              },
              left: 'center'
            },
            dataZoom: {
              show: true,
              realtime: true,
              y: 300,
              height: 20,
              start: 0,
              end: 100
            },
            grid: {
              left: '12%',
              right: '14%',
              bottom: '22%',
              containLabel: true
            },
            textStyle: {
              fontSize: 15,
              color: '#3398DB'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#3398DB'
                }
              }
            },
            xAxis: {
              type: 'category',
              show: true,
              name: '企业名称+流通节点类型',
              data: [],
              axisTick: {
                alignWithLabel: true
              },
              nameTextStyle: {
                color: ['rgb(0,0,0)']
              },
              axisLabel: {
                interval: 0,
                rotate: 20,
                textStyle: {
                  color: '#000'
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
              name: '考核分数/分',
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['rgba(255,255,255,0)']
                }
              },
              nameTextStyle: {
                color: ['rgb(0,0,0)']
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(51,51,51)',
                  width: 1//这里是为了突出显示加上的
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#000'
                }
              }
            },
            series: [
              {
                name: '考核分数',
                type: 'bar',
                barWidth: '50%',
                data: [],
                itemStyle: {
                  normal: {
                    color: '#60b9eb'
                  }
                }
              }
            ],
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: '#000'
                }
              }
            }
          }
        },
        params: {
          examineIndexNo: '', //指标名称
          examineDate: '',
          value: 3
        },
        etName: [],  //搜索条件：企业名称
        examineIndexs: [],  //搜索条件：考核指标(下拉菜单)
        examineLevels: [],  //搜索条件：考核等级(下拉菜单)
        tableConfig: {
          getApi: 'getSingleExamineIndex',
          title: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          sequenceShow: false,
          columns: [
            {title: '指标名称', data: 'examineIndexName'},
            {title: '考核分数/分', data: 'examineScore'}
          ]
        }
      }
    },
    computed: {
      ranking() {
        return ((this.singleExamineIndex.currentPage || 1) - 1) * (this.tableConfig.display || 10) + 1
      },
      ...mapGetters({
        singleExamineIndex: 'singleExamineIndex',
        singleExamineEnterpriseEtDate: 'singleExamineEnterpriseEtDate'
      })
    },
    methods: {
      getSeq(index) {
        return this.ranking + parseInt(index)
      },
      init() {
        let obj = this
        Api.ExamineManage.getExamineIndexAll().then(data => { //考核指标
          obj.examineIndexs = data.data
        })
        Api.ExamineManage.getExamineLevelAll().then(data => { //考核等级
          obj.examineLevels = data.data
        })
        this.params.examineDate = this.singleExamineEnterpriseEtDate
        obj.getSingleExamineIndex(this.params)
        Api.SingleExamine.getTypeRankEChartsData({
          value: 3,
          examineDate: this.singleExamineEnterpriseEtDate
        }).then((data) => { //ECharts图数据
          let nestedData = data.data
          obj.echartData.option.xAxis.data = []
          obj.echartData.option.series[0].data = []
          if (nestedData) {
            nestedData.forEach(element => {
              obj.echartData.option.xAxis.data.push(element.examineIndexName)
              obj.echartData.option.series[0].data.push(element.examineScore)
            })
          }
        })
      },
      search() {
        this.getSingleExamineIndex(this.params)
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
        this.params.createDate = this.singleExamineEnterpriseEtDate
      },
      gotype() {
        this.$router.push('singleExamineEnterprise')
      },
      gosing() {
        this.$router.push('singleExamineNode')
      },
      goindicat() {
        this.$router.push('singleExamineIndex')
      },
      goBack() {
        this.$router.push('totalExamine')
      },
      ...mapActions({
        getSingleExamineIndex: 'getSingleExamineIndex'
      })
    }
  }
</script>

