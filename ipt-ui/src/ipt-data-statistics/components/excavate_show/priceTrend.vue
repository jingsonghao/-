<template>
  <div class="col-lg-6">
    <div id="myTabContent" class="tab-content  col-lg-11">
      <div class="tab-pane fade in active" id="tab01">
        <div class="r-search">
          <form class="form form-inline">
            <div class="form-group">
              <label>重要产品品种</label>
              <input type="text" class="form-control search-01">
            </div>
            <div class="form-group my-group">
              <button type="button" class="btn  btn-search"> 查询</button>
            </div>
          </form>
        </div>
        <div class="shadow-boxs" style="height: 302px;padding: 5px;">
          <ipt-table :tableData="priceTrendTableData" :tableConfig="deviceTypeConfig">
          </ipt-table>
        </div>
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
        deviceTypeConfig: {
          getApi: 'getPriceTrendTableData',
          display: 10,
          pagegroup: 5,
          checkboxShow: false,
          sequenceShow: true,
          columns: [
            {title: '企业名称', data: 'enterpriseNo'},
            {title: '产品种类', data: 'nodeBaseInfoId'},
            {title: '价格/元', data: 'enterpriseName'},
            {title: '浮动', data: 'float'}
          ]
        }
      }
    },
    computed: mapGetters({
      priceTrendTableData: 'priceTrendTableData'
    }),
    created() {
      this.$store.dispatch('getPriceTrendTableData', {page: 1})
    }
  }
</script>
