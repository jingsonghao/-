<template>
  <div class="main">
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <!--双日历插件-->
            <label>时间</label>
            <el-date-picker type="date" placeholder="开始日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
            <label>—</label>
            <el-date-picker type="date" placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn  btn-search" @click="search"> 查询 </button>
          </div>
        </form>
      </div>
    </div>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <!--表格标题部分-->
        <div class="table-title-box">
          <h3>特色企业消费结构分析</h3>
        </div>

        <div class="col-lg-5">
          <ipt-echart :echartData="echartData21"></ipt-echart>
        </div>
        <div class="col-lg-7">
          <div class="clearfix">
            <button class="btn btn-search" style="float: right;" type="button">导出报表</button>
          </div>
          <ipt-table :tableData="reportAnalysisTableData"
                     :tableConfig="reportAnalysisTableConfig"
                     :params="reportAnalysisTableParams">
            <!-- 表格插槽 复选框-->
            <th slot="beforeTitle">
              <!-- 全选框 -->
              <input type="checkbox" @change="checkAll">
            </th>
            <!-- 表格复选框 -->
            <td slot="beforeBody" slot-scope="scope">
              <input type="checkbox" v-model="checkboxList" :value="scope.columnData.reportAnalysisId">
            </td>
          </ipt-table>
        </div>
        <!--表格标题部分 end-->
      </div>
    </div>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <!--表格标题部分-->
        <div class="table-title-box">
          <h3>宁夏追溯产品消费结构分析统计图</h3>
        </div>
        <div class="col-lg-5">
          <ipt-echart :echartData="echartData22"></ipt-echart>
        </div>
        <div class="col-lg-7">
          <div class="clearfix">
            <button class="btn btn-search" style="float: right;" type="button">导出报表</button>
          </div>
          <!--<ipt-table :tableData="traceabilityTableData"
                     :tableConfig="traceabilityTableConfig"
                     :params="traceabilityTableParams">
            &lt;!&ndash; 表格插槽 复选框&ndash;&gt;
            <th slot="beforeTitle">
              &lt;!&ndash; 全选框 &ndash;&gt;
              <input type="checkbox" @change="checkAll">
            </th>
            &lt;!&ndash; 表格复选框 &ndash;&gt;
            <td slot="beforeBody" slot-scope="scope">
              <input type="checkbox" v-model="checkboxList" :value="scope.columnData.traceabilityId">
            </td>
          </ipt-table>-->
          <ipt-table :tableData="reportAnalysisTableData"
                     :tableConfig="reportAnalysisTableConfig"
                     :params="reportAnalysisTableParams">
            <!-- 表格插槽 复选框-->
            <th slot="beforeTitle">
              <!-- 全选框 -->
              <input type="checkbox" @change="checkAll">
            </th>
            <!-- 表格复选框 -->
            <td slot="beforeBody" slot-scope="scope">
              <input type="checkbox" v-model="checkboxList" :value="scope.columnData.reportAnalysisId">
            </td>
          </ipt-table>
        </div>
        <!--表格标题部分 end-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  /** 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import { mapGetters, mapActions } from 'vuex'
  /** 引入表格组件 */
  import IptTable from '@/components/common/table'
  import IptEchart from '@/components/common/echart'

  export default {
    /** 将引入的组件作为子组件 */
    components: {
      IptTable, IptEchart
    },
    /** 在创建的时候进行初始化 */
    created: function () {
      this.init()
    },
    data: function () {
      return {
        echartData21: {
          id: 'cover-rate',
          width: '100',
          height: '500',
          option: {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            color: ['#61b8eb', '#84edae', '#ebca6a', '#4c8eb5', '#64c58b', '#f37b1d'],
            legend: {
              orient: 'horizontal',
              left: 'left',
              data: ['万兴生姜', '玉林鸭子', '五福茶叶', '松鹤黑猪', '宁夏香肠', '郎野蜂蜜', '大峰蛋糕', '万邦山楂'],
              textStyle: {
                fontSize: 12,
                color: '#333'
              }
            },
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: 310,
                  name: '万兴生姜'
                },
                {
                  value: 210,
                  name: '玉林鸭子'

                },
                {
                  value: 310,
                  name: '五福茶叶'

                },
                {
                  value: 100,
                  name: '松鹤黑猪'

                },
                {
                  value: 310,
                  name: '宁夏香肠'

                },
                {
                  value: 230,
                  name: '郎野蜂蜜'

                },
                {
                  value: 110,
                  name: '大峰蛋糕'

                },
                {
                  value: 210,
                  name: '万邦山楂'

                }
              ],
              label: {
                normal: {
                  show: true,
                  formatter: '{b}: {d}%'
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          }

        },
        echartData22: {
          id: 'cover-rate2',
          width: '100',
          height: '500',
          option: {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'horizontal',
              left: 'left',
              data: ['胡萝卜', '西红柿', '黄瓜', '土豆', '白菜'],
              textStyle: {
                fontSize: 12,
                color: '#333'
              }
            },
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [{
                value: 310,
                name: '胡萝卜'
              },
                {
                  value: 210,
                  name: '西红柿'

                },
                {
                  value: 310,
                  name: '黄瓜'

                },
                {
                  value: 100,
                  name: '土豆'

                },
                {
                  value: 310,
                  name: '白菜'

                }
              ],
              label: {
                normal: {
                  show: true,
                  formatter: '{b}: {d}%'
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          }

        },
        /** 预定义搜索表单的初始值 */
        reportAnalysisTableParams: {
          type: '',
          name: '',
          title: '',
          timeStart: '',
          timeEnd: ''
        },
        traceabilityTableParams: {
          type: '',
          name: '',
          title: '',
          timeStart: '',
          timeEnd: ''
        },
        // 下拉查询条件
        types: [],
//        productKinds: [],
//        nodeTypes: [],
        /** 定义表格的配置 */
        reportAnalysisTableConfig: {
          getApi: 'getReportAnalysisTableData',  // #必须# 数据的的请求Vuex的Action名
          //title: "信息发布管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 8,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '企业名称', data: 'name'},
            {title: '重要产品品种', data: 'type'},
            {title: '消费量/kg ', data: 'consumption'},
            {title: '占比 ', data: 'proportion '}
          ]
        },
        traceabilityTableConfig: {
          getApi: 'getTraceabilityTableData',  // #必须# 数据的的请求Vuex的Action名
          //title: "信息发布管理",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 8,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '企业名称', data: 'name'},
            {title: '重要产品品种', data: 'type'},
            {title: '消费量/kg ', data: 'consumption'},
            {title: '占比 ', data: 'proportion '}
          ]
        },
        // 复选框条件
        checkboxList: []
      }
    },
    methods: {
      init: function () {
        /** 获取搜索参数的预定义数据，TODO 从后台接口获取 */
//        this.types = [{name: '行业动态', value: 1}, {name: '热点新闻', value: 2}, {name: '最新政策', value: 3}]
//        this.productKinds = [ { name: '猪头', value: 1 }, { name: '大蒜', value: 2 }, { name: '花生', value: 3 } ]
//        this.nodeTypes = [
//          { name: '屠宰节点', value: 1 }, { name: '批发节点', value: 2 }, { name: '农贸节点', value: 3 },
//          { name: '超市节点', value: 4 }, { name: '团体节点', value: 5 }
//        ]
        /** 获取表格分页数据 */
        this.getReportAnalysisTableData(this.reportAnalysisTableParams)
      },
      search: function () {
        this.getReportAnalysisTableData(this.reportAnalysisTableParams)
      },
      // 全选框
      checkAll: function (event) {
        var self = this
        if (!event.currentTarget.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.reportAnalysisTableData.data.map(item => item.reportAnalysisId)
          /*self.checkboxList = self.traceabilityTableData.data.map(item => item.traceabilityId)*/
        }
      },
      /** 获取请求数据的action */
      ...mapActions({
        getReportAnalysisTableData: 'getReportAnalysisTableData',
        getTraceabilityTableData: 'getTraceabilityTableData'
      })
    },
    /** 获取表格需要的数据 */
    computed: mapGetters({
      reportAnalysisTableData: 'reportAnalysisTableData',
      traceabilityTableData: 'traceabilityTableData'
    })
  }
</script>

