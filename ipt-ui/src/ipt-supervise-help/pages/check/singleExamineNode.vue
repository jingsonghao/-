<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>工作考核管理</a></li>
      <li><a>综合性考核</a></li>
      <li class="active jsh-active">按流通节点类型排名</li>
    </ol>
    <!--选项卡组件-->
    <div class="tab-btn-list shadow-boxs">
      <ul id="myTab" class="tab-btn list-inline">
        <li class="">
          <a @click="gotype()">按企业排名</a>
        </li>
        <li class="active">
          <a @click="gosing()">按流通节点类型排名</a>
        </li>
        <li class="">
          <a @click="goindicat()">按考核指标排名</a>
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
                    <label>流通节点类型</label>
                    <select class="form-control search-01" style="width: 150px;" v-model="params.nodeTypeNo">
                      <option value="">全部</option>
                      <option v-for="nodeType in nodeTypes"
                              :value="nodeType.nodeTypeNo">{{nodeType.nodeTypeName}}
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
            <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
            <show-index id="js_show_index"></show-index>
            <ipt-table
              :tableData="singleExamineNode"
              :tableConfig="tableConfig"
              :params="params">
              <template slot="afterTitle">
                <th>排名</th>
                <th>操作</th>
              </template>
              <template slot="afterBody" slot-scope="scope">
                <td>
                  <a @click="approvalBtn(scope.columnData)">{{getSeq(scope.index)}}</a>
                </td>
                <td>
                  <a class="show" @click="showBtn(scope.columnData)" data-toggle="modal"
                     data-target="#js_show_index">查看</a>
                </td>
              </template>
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
  import CommonApi from '@/api'
  import showIndex from "./nodeTypeShowIndex"

  export default {
    created() {
      this.init()
    },
    components: {
      IptEchart, IptTable, Api, showIndex
    },
    data() {
      return {
        echartData: {
          id: 'main3',
          height: 400,
          option: {
            title: {
              text: '按流通节点类型与考核分数排名图表统计',
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
              end: 50
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
              name: '企业名称',
              data: [],
              axisTick: {
                alignWithLabel: true
              },
              nameTextStyle: {
                color: ['rgb(0,0,0)']
              },
              axisLabel: {
                interval: 0,
                rotate: 30,
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
          nodeTypeNo: '',
          examineDate: '',
          value: 2
        },
        nodeTypes: [],  //搜索条件：流通节点类型(下拉菜单)
        examineLevels: [],  //搜索条件：考核等级(下拉菜单)
        tableConfig: {
          getApi: 'getSingleExamineNode',
          title: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          sequenceShow: false,
          columns: [
            {title: '流通节点类型', data: 'nodeTypeName'},
            {title: '考核分数/分', data: 'examineScore'}
          ]
        }
      }
    },
    computed: {
      ranking() {
        return ((this.singleExamineNode.currentPage || 1) - 1) * (this.tableConfig.display || 10) + 1
      },
      ...mapGetters({
        singleExamineNode: 'singleExamineNode',
        singleExamineEnterpriseEtDate: 'singleExamineEnterpriseEtDate'
      })
    },
    methods: {
      getSeq(index) {
        return this.ranking + parseInt(index)
      },
      init() {
        let obj = this
        CommonApi.EnumType.getBusinessTypes({}).then(data => {
          CommonApi.EnumType.getNodeTypes({
            businessTypes: data.data.map(item => item.value).join()
          }).then(nestedData => { //流通节点类型
            this.nodeTypes = nestedData.data
          })
        })
        Api.ExamineManage.getExamineLevelAll().then(data => { //考核等级
          obj.examineLevels = data.data
        })
        this.params.examineDate = this.singleExamineEnterpriseEtDate
        obj.getSingleExamineNode(this.params)
        Api.SingleExamine.getTypeRankEChartsData({
          value: 2,
          examineDate: this.singleExamineEnterpriseEtDate
        }).then((data) => { //ECharts图数据
          let nestedData = data.data
          obj.echartData.option.xAxis.data = []
          obj.echartData.option.series[0].data = []
          if (nestedData) {
            nestedData.forEach(element => {
              obj.echartData.option.xAxis.data.push(element.nodeTypeName)
              obj.echartData.option.series[0].data.push(element.examineScore)
            })
          }
        })
      },
      search() {
        this.getSingleExamineNode(this.params)
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
      showBtn(columnData) {
        this.setShowIndexData(null)// 初始化
        this.setShowIndexData(columnData)
      },
      goBack() {
        this.$router.push('totalExamine')
      },
      ...mapActions({
        getSingleExamineNode: 'getSingleExamineNode',
        setShowIndexData: 'setShowIndexData'
      })
    }
  }
</script>

