<template>
  <!--问题项 管理-->
  <div class="main">
    <div class="shadow-boxs">
      <!--search 搜索框 组件-->
      <div class="r-search search2">
        <form class="form form-inline">
          <div class="form-group">
            <label>预警类型 </label>
            <select type="text" class="form-control search-01 select-form" placeholder="">
              <option>全部</option>
              <option>1</option>
              <option>2</option>
            </select>
            <label>预警对象 </label>
            <select type="text" class="form-control search-01 select-form" placeholder="">
              <option>全部</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div class="form-group">
            <!--双日历插件-->
            <label>预警指标内容</label>
            <input type="text" class="form-control search-01" placeholder="" style="width: 200px;">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-reset"> 重置</button>
            <button type="button" class="btn btn-search"> 查询</button>
          </div>
        </form>
      </div>
    </div>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table  :tableData="earlyWarningTableData" :tableConfig="adjustManageConfig" :optionConfig="OptionConfig"></ipt-table>
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
          getApi: 'getEarlyWarningTableData',
          titleShow: true,
          title: "问题项管理",
          display: 10,
          pagegroup: 5,
          checkboxShow: false,
          sequenceShow: true,
          columns: [
            { title: '预警类型', data: 'earlyWarningType' },
            { title: '预警对象', data: 'earlyWarningName' },
            { title: '预警指标内容', data: 'earlyWarningContent' }
          ]
        },
        OptionConfig: {
          isShow: true,
          showBtn: {
            isShow: false
          },
          deleteBtn: {
            isShow: false,
            getApi: ''
          },
          updateBtn: {
            isShow: true,
            getApi: ''
          }
        }
      }
    },
    computed: mapGetters({
      earlyWarningTableData: 'earlyWarningTableData'
    }),
    created() {
      this.$store.dispatch('getEarlyWarningTableData', {page: 1})
    }
  }
</script>
