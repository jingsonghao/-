<template>
  <!--问题项 管理-->
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>问题发现管理</a></li>
      <li class="active jsh-active">问题报告管理</li>
    </ol>
    <div class="shadow-boxs">
      <!--search 搜索框 组件-->
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>问题报告名称</label>
            <input type="text" class="form-control search-01" placeholder="">
          </div>
          <div class="form-group">
            <!--双日历插件-->
            <label>问题报告时间</label>
            <div class="input-prepend input-group">
              <input id="plantStartTime1" placeholder="" type="text" class="form-control plantTime"/>
              <i class="search-right"></i>
            </div>
            <label>—</label>
            <div  class="input-prepend input-group">
              <input id="plantEndTime1" placeholder="" type="text" class="form-control plantTime"/>
              <i class="search-right"></i>
            </div>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-reset1"> 新增 </button>
            <button type="button" class="btn  btn-search"> 查询 </button>
          </div>
        </form>
      </div>
    </div>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table  :tableData="questionReportTableData" :tableConfig="adjustManageConfig" :optionConfig="OptionConfig"></ipt-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import IptTable from "@/components/common/table"

  export default {
    components: {
      IptTable
    },
    data() {
      return {
        adjustManageConfig: {
          getApi: 'getQuestionReportTableData',
          titleShow: true,
          title: "问题项管理",
          display: 10,
          pagegroup: 5,
          checkboxShow: false,
          sequenceShow: true,
          columns: [
            { title: '问题报告名称', data: 'questionReportName' },
            { title: '问题报告时间', data: 'questionReportTime' }
          ]
        },
        OptionConfig: {
          isShow: true,
          showBtn: {
            isShow: true
          },
          deleteBtn: {
            isShow: false,
            getApi: ''
          },
          updateBtn: {
            isShow: false,
            getApi: ''
          }
        }
      }
    },
    computed: mapGetters({
      questionReportTableData: 'questionReportTableData'
    }),
    created() {
      this.$store.dispatch('getQuestionReportTableData', {page: 1})
    }
  }
</script>
