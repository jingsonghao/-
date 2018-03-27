<template>
  <div class="main">
    <!--search 组件 按考核指标排名详细-->
    <div class=" shadow-boxs">
      <!--search 搜索框 组件-->
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>指标名称</label>
            <input type="text" class="form-control search-01" placeholder="">
            <label>指标类别</label>
            <select class="form-control search-01">
              <option>全部</option>
              <option>优秀</option>
              <option>良好</option>
              <option>较差</option>
              <option>黑名单</option>
            </select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search">查询</button>
            <button type="button" class="btn btn-search">重置</button>
            <a href="javascript:;" class="edit" @click="goback()"><button type="button" class="btn btn-search"> 返回 </button></a>
          </div>
        </form>
      </div>
    </div>
    <!--table 组件-->
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <div class="table-container">
          <div class="thead-bg"></div>
          <div class="col-xs-12 table-box">
            <table class="table table-condensed">
              <thead>
              <tr>
                <th>
                  <span>序号</span>
                </th>
                <th>
                  指标编号
                </th>
                <th>
                  指标名称
                </th>
                <th>
                  指标类别
                </th>

                <th>
                  产品类别
                </th>
                <th>
                  流通节点
                </th>
                <th>
                  考核等级
                </th>
                <th>
                  指标得分
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <span>01</span>
                </td>
                <td>
                  01-01-001
                </td>
                <td>
                  企业生产经营资格
                </td>
                <td>
                  法律法规
                </td>
                <td>
                  通用
                </td>
                <td>
                  通用
                </td>
                <td>
                  优秀
                </td>
                <td>
                  92.25
                </td>
              </tr>
              <tr>
                <td>
                  <span>02</span>
                </td>
                <td>
                  01-01-001
                </td>
                <td>
                  原材料农药检测合格率
                </td>
                <td>
                  食品安全
                </td>
                <td>
                  中药材 - 植物类
                </td>
                <td>
                  中药材产地
                </td>
                <td>
                  优秀
                </td>
                <td>
                  96
                </td>
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
  </div>
</template>
<script>
  import IptEchart from '@/components/common/echart'
  import { mapGetters, mapActions } from 'vuex'
  import IptTable from "@/components/common/table"

  export default {
    created() {
      this.init()
    },
    components: {
      IptEchart, IptTable
    },
    data() {
      return {
        params: {
          productType: 3,
          productKind: null,
          nodeType: null,
          enterpriseName: ''
        },
        productTypes: [],
        productKinds: [],
        nodeTypes: [],
        tableConfig: {
          getApi: 'getSuperviseSystemTableData',
          title: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          sequenceShow: true,
          columns: [
            { title: '排名', data: 'checkDate' },
            { title: '流通节点类型', data: 'checkNumber' },
            { title: '企业名称', data: 'checkExponent' },
            { title: '考核分数/分', data: 'meanGrade' }
          ]
        },
        checkboxList: []
      }
    },
    computed: mapGetters({
      superviseSystemTableData: 'superviseSystemTableData'
    }),
    methods: {
      init() {
        /** Zhao Yun 2017/11/16 获取表格分页数据 */
        this.getSuperviseSystemTableData(this.params)
      },
      search() {
        this.getSuperviseSystemTableData(this.params)
      },
      goback() {
        this.$router.push('typeCheckNormManage')
      },
    /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getSuperviseSystemTableData: 'getSuperviseSystemTableData'
      })
  }
  }
</script>
