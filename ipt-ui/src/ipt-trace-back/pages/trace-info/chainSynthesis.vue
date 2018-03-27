<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>追溯管理系统</a></li>
      <li><a>追溯信息管理</a></li>
      <li class="active jsh-active">追溯链条合成</li>
    </ol>
    <!--search 组件-->
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>批次号</label>
            <input v-model="params.tranCode" type="text" class="form-control search-01" placeholder="">
            <label>追溯码</label>
            <input v-model="params.traceCode" type="text" class="form-control search-01" placeholder="">
            <label>产品名称</label>
            <input v-model="params.productName" type="text" class="form-control search-01" placeholder="">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-dange btn-reset" @click="reset"> 重置</button>
            <button type="button" class="btn btn-search" @click="search"> 查询</button>
          </div>
        </form>
      </div>
    </div>
    <!--search 组件 end-->
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="chainSynthesisTableData" :tableConfig="tableDataConfig" :params="params">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)">查看</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  export default {
    components: {
      IptTable
    },
    created() {
      this.init()
    },
    data() {
      return {
        params: { //参数
          tranCode: '',
          traceCode: '',
          productName: ''
        },
        tableDataConfig: { //表格
          getApi: 'getChainSynthesisTableData',
          title: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          sequenceShow: true,
          columns: [
            {title: '产品名称', data: 'productName'},
            {title: '重量/kg', data: 'weight'},
            {title: '单价/元', data: 'price'},
            {title: '追溯码', data: 'traceCode'},
            {title: '批次号', data: 'tranCode'}
          ]
        },
        productCategorys: [], //下拉列表数据
        productVarietys: [], //下拉列表数据
        nodeTypes: [] //下拉列表数据
      }
    },
    computed: mapGetters({
      chainSynthesisTableData: 'chainSynthesisTableData'
    }),
    methods: {
      init() {
        /* 获取表格分页数据 */
        this.getChainSynthesisTableData(this.params)
        this.productCategorys = [{value: 1, name: "食品"}, {value: 2, name: "食品"}, {value: 3, name: "食用农产品"}]
        this.productVarietys = [{value: 1, name: "食品"}]
        this.nodeTypes = [{value: 1, name: "食品"}]
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      search() {
        this.getChainSynthesisTableData(this.params)
      },
      showBtn(columnData) {
        this.$router.push({
          path: `/traceBack/chainSynthesis/chainSynthesisTree`,
          query: {id: columnData.chainMiddleId}
        })
      },
      /* 获取请求数据的action */
      ...mapActions({
        getChainSynthesisTableData: 'getChainSynthesisTableData'
      })
    }
  }
</script>
