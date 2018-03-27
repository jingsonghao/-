<template>
  <div class="col-lg-12">
    <div class="shadow-boxs" style="height: 395px;">
      <div class="col-lg-12 col-12">
        <div class="sum">
          <span class="text-left">企业考核排名</span>
          <span class="flr">2017.12.27</span>
        </div>
        <div class="construction-rate">

          <div class="dropdown">
            <button class="btn btn-default-a dropdown-toggle" type="button" id="dropdownMenu1"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              {{creditRankParams.rankType.name}}
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu m-dropdown-menu " aria-labelledby="dropdownMenu1">
              <li v-for="type in rankTypes" @click="changeCreditRankRankType(type)"><a
                href="javascript:;">{{ type.name }}</a></li>
            </ul>
            <!--<span style="display: inline-block;border: 1px solid #ccc;padding: 2px;border-radius: 2px;cursor:pointer;color: #70ff93;float: right;margin-right: 15px;"><img-->
              <!--src="../../assets/img/dong.png" alt=""></span>-->
            <!--<span style="display: inline-block;border: 1px solid #ccc;padding: 2px;border-radius: 2px;cursor:pointer;color: #a83c2c;float: right;"><img-->
              <!--src="../../assets/img/qiu.png" alt=""></span>-->
            <!--<span style="display: inline-block;border: 1px solid #ccc;padding: 2px;border-radius: 2px;cursor:pointer;color:#ebeb53;float: right;"><img-->
              <!--src="../../assets/img/xia.png" alt=""></span>-->
            <!--<span style="display: inline-block;border: 1px solid #ccc;padding: 2px;border-radius: 2px;cursor:pointer;color:#75a0ff;float: right;"><img-->
              <!--src="../../assets/img/chun.png" alt=""></span>-->
            <select class="form-control" style="display: inline-block;border: 1px solid #ccc;padding: 2px;border-radius: 5px;cursor:pointer;background-color:rgba(204,204,204,0.5);width: 150px;float: right;margin-right: 15px;" >
              <option style="background-color: #fff;">第一季度</option>
              <option style="background-color: #fff;">第二季度</option>
              <option style="background-color: #fff;">第三季度</option>
              <option style="background-color: #fff;">第四季度</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-lg-12" style="margin-top: 20px;">
        <ipt-table :tableData="creditRankTableData" :tableConfig="creditRankConfig" :params="creditRankParams" :pagerShow="false"></ipt-table>
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
        rankTypes: [],
        creditRankParams: {
          rankType: {name: '诚信Top5', value: 1}
        },
        creditRankConfig: {
          getApi: 'getCreditRankTableData',
          titleShow: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 3,
          checkboxShow: false,
          sequenceShow: true,
          columns: [
            {title: '类型', data: 'enterpriseType'},
            {title: '企业名称', data: 'enterpriseName'}
          ]
        }
      }
    },
    computed: mapGetters({
      creditRankTableData: 'creditRankTableData'
    }),
    created() {
      this.init()
      this.$store.dispatch('getCreditRankTableData', {page: 1})
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.rankTypes = [
          {name: '诚信Top5', value: 1},
          {name: '诚信Top10', value: 2}
        ]
      },
      changeCreditRankRankType(rankType) {
        this.creditRankParams.rankType = rankType
        this.$store.dispatch('getCreditRankTableData', {rankType: rankType.value, page: 1})
      }
    }
  }
</script>
<style>

</style>
