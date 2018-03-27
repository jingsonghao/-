<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>视频集中管理</a></li>
      <li class="active jsh-active">监控记录</li>
    </ol>
    <div class="shadow-boxs">
      <!--search 搜索框 组件-->
      <div class="r-search search2">
        <form class="form form-inline">
          <div class="form-group">
            <label>企业名称 </label>
            <input type="text" class="form-control search-01" placeholder="" style="width: 200px;">
            <label>企业类型 </label>
            <select class="form-control search-01" v-model="params.businessType">
              <option value="0">全部</option>
              <option v-for="option in businessTypes" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search"> 查询</button>
          </div>
        </form>
      </div>
    </div>
    <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
    <ipt-show id="js_show_modal"></ipt-show>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table
          :tableData="videoRecordTableData"
          :tableConfig="videoRecordConfig"
          :params="params">
          <th slot="afterTitle">监控记录</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)" data-toggle="modal"
               data-target="#js_show_modal">查看</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import IptShow from "./showRecord"

  export default {
    components: {
      IptTable, IptShow
    },
    created() {
      this.init()
    },
    data() {
      return {
        params: {
          businessType: 0
        },
        businessTypes: [],
        videoRecordConfig: {
          getApi: 'getVideoRecordTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "监控记录",             // [可选] 表格标题，默认不显示标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '企业名称', data: 'enterpriseId'},
            {title: '企业类型', data: 'enterpriseNo'},
            {title: '监控设备数量/个', data: 'nodeBaseInfoId'}
          ]
        }
      }
    },
    computed: mapGetters({
      videoRecordTableData: 'videoRecordTableData'
    }),
    methods: {
      init() {
        this.businessTypes = [{name: '1', value: 1}, {name: '2', value: 2}, {name: '3', value: 3}]
        this.getVideoRecordTableData(this.params)
      },
      showBtn(columnData) {

      },
      ...mapActions({
        getVideoRecordTableData: 'getVideoRecordTableData'
      })
    }
  }
</script>


