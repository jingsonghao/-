<template>
  <div>
    <ol class="breadcrumb">
      <li><a>追溯管理系统</a></li>
      <li><a>追溯信息管理</a></li>
      <li class="active jsh-active">剔除信息恢复</li>
    </ol>
    <div class="main">
      <!--search 组件-->
      <div class="shadow-boxs">
        <div class="r-search">
          <form class="form form-inline">
            <div class="form-group">
              <label>企业名称</label>
              <input type="text" class="form-control search-01" v-model="params.enterpriseName">
              <label>剔除原因</label>
              <el-select v-model="params.rejectReason" class="search-01">
                <el-option
                  v-for="item in rejectReasonTypes"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <label>剔除状态</label>
              <el-select v-model="params.rejectStauts" class="search-01">
                <el-option
                  v-for="item in rejectStautsTypes"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="form-group my-group">
              <button type="button" class="btn btn-reset" @click="reset"> 重置</button>
              <button type="button" class="btn btn-search" @click="search"> 查询</button>
            </div>
          </form>
        </div>
      </div>
      <!--search 组件 end-->
      <div class="shadow-boxs">
        <div class="col-lg-12">
          <ipt-table :tableData="deleteRecoverTableData" :tableConfig="tableDataConfig" :params="params">
            <th slot="afterTitle">操作</th>
            <td slot="afterBody" slot-scope="scope">
              <a class="look-link no-click" v-if="scope.columnData.rejectStauts == '1'">已恢复</a>
              <a class="delete-link" v-if="scope.columnData.rejectStauts != '1'" @click="showBtn(scope.columnData)">恢复</a>
            </td>
          </ipt-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import Api from '@/ipt-trace-back/api'

  export default {
    components: {
      IptTable
    },
    created() {
      this.init()
    },
    data() {
      return {
        value1: [],
        stateShow: '',
        params: { //参数
          enterpriseName: "",
          rejectStauts: '',
          rejectReason: ''
        },
        tableDataConfig: { //表格
          getApi: 'getDeleteRecoverTableData',
          title: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          sequenceShow: true,
          columns: [
            {title: '企业名称', data: 'enterpriseName'},
            {title: '流通节点', data: 'nodeName'},
            {title: '商品名称', data: 'productName'},
            {title: '剔除原因', data: 'rejectReasonName'},
            {title: '剔除时间', data: 'rejectDate'},
            {title: '恢复时间', data: 'restoreDate'}
          ]
        },
        rejectStautsTypes: [],
        rejectReasonTypes: []
      }
    },
    computed: mapGetters({
      deleteRecoverTableData: 'deleteRecoverTableData'
    }),
    methods: {
      init() {
        /* 获取表格分页数据 */
        this.getDeleteRecoverTableData(this.params)
        this.rejectReasonTypes = [ { value: 1, name: "错误数据" }, { value: 0, name: "重复数据" } ]
        this.rejectStautsTypes = [ { value: 0, name: "已剔除" }, { value: 1, name: "已恢复" } ]
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      search() {
        this.getDeleteRecoverTableData(this.params)
      },
      showBtn(columnData) {
        Api.DeleteRecover.restore(columnData.rejectInformationId).then(data => {
          this.$alert('恢复成功')
          this.getDeleteRecoverTableData(this.params)
        })
      },
      /* 获取请求数据的action */
      ...mapActions({
        getDeleteRecoverTableData: 'getDeleteRecoverTableData'
      })
    }
  }
</script>

<style>
  a.no-click{
    color: #ebbe44;
    cursor: auto;
  }
  .popper__arrow{
    left: 50% !important;
  }
</style>


