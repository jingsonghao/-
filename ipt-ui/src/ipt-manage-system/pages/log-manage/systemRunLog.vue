<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li><a>日志管理</a></li>
      <li class="active jsh-active">系统运行日志</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline" id="query-form">
          <div class="form-group">
            <label>操作用户</label>
            <input type="text" class="form-control search-01" placeholder="请输入操作用户" style="width: 150px;"
                   v-model="systemRunLogTableParams.username">
          </div>
          <div class="form-group">
            <label>操作类型</label>
            <select class="form-control search-01" v-model="systemRunLogTableParams.opt">
              <option value="">全部</option>
              <option v-for="option in optEnumList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>方法类型</label>
            <select class="form-control search-01" v-model="systemRunLogTableParams.method">
              <option value="">全部</option>
              <option v-for="option in methodEnumList" :value="option.value">{{ option.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>记录时间</label>
            <el-date-picker v-model="systemRunLogTableParams.createTimeMin" style="width: 200px;"
                            type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="systemRunLogTableParams.createTimeMax" style="width: 200px;"
                            type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>&nbsp;&nbsp;&nbsp;
          </div>
          <div class="form-group">
            <label>日志内容</label>
            <input type="text" class="form-control search-01" placeholder="请输入日志内容" style="width: 150px;"
                   v-model="systemRunLogTableParams.msg">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
          </div>
        </form>
      </div>
    </div>
    <div class="shadow-boxs">

      <div class="col-lg-12">
        <ipt-table :tableData="systemRunLogTableData"
                   :tableConfig.sync="userOptLogTableConfig"
                   :params="systemRunLogTableParams">
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import Api from '@/ipt-manage-system/api'

  export default {
    components: {
      IptTable
    },
    created: function () {
      this.init()
    },
    data: function () {
      return {
        systemRunLogTableParams: {
          username: '',
          opt: '',
          method: '',
          createTimeMin: '',
          createTimeMax: '',
          msg: ''
        },
        userOptLogTableConfig: {
          getApi: 'getSystemRunLogTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "系统运行日志",             // [可选] 表格标题，默认不显示标题
          showTitle: true,                  // [可选] 显示表格标题
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '操作用户', data: 'username'},
            {title: '操作类型', data: 'opt.name'},
            {title: '方法类型', data: 'method.name'},
            {title: '记录时间', data: 'createTime'},
            {title: 'IP地址', data: 'host'},
            {title: '访问路径', data: 'url'},
            {title: '日志内容', data: 'msg'}
          ]
        },
        optEnumList:[],
        methodEnumList:[]
      }
    },
    methods: {
      init: function () {
        this.initQueryList()
        this.getSystemRunLogTableData(this.systemRunLogTableParams)
      },
      initQueryList: function () {
        let _this = this
        Api.LogManage.getPageQueryEnumList().then((data) => {
          _this.optEnumList = data.data.optEnumList
          _this.methodEnumList = data.data.methodEnumList
        })
      },
      reset: function () {
        Object.assign(this.$data.systemRunLogTableParams, this.$options.data().systemRunLogTableParams)
      },
      search: function () {
        this.getSystemRunLogTableData(this.systemRunLogTableParams)
      },
      ...mapActions({
        getSystemRunLogTableData: 'getSystemRunLogTableData'
      })
    },
    computed: mapGetters({
      systemRunLogTableData: 'systemRunLogTableData'
    })
  }
</script>
