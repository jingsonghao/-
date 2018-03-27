<template>

  <!--【空的了】-->
  <!--<div class="col-lg-12">-->
    <!--<div class="shadow-boxs" style="height: 395px;">-->
      <!--<div class="col-lg-12 col-12">-->
        <!--<div class="sum">-->
          <!--<span class="text-left">诚信排名</span>-->
          <!--<span class="flr">2017.12.27</span>-->
        <!--</div>-->
        <!--<div class="construction-rate">-->

          <!--<div class="dropdown">-->
            <!--<button class="btn btn-default-a dropdown-toggle" type="button" id="dropdownMenu1"-->
                    <!--data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">-->
              <!--{{creditRankParams.rankType.name}}-->
              <!--<span class="caret"></span>-->
            <!--</button>-->
            <!--<ul class="dropdown-menu m-dropdown-menu " aria-labelledby="dropdownMenu1">-->
              <!--<li v-for="type in rankTypes" @click="changeCreditRankRankType(type)"><a-->
                <!--href="javascript:;">{{ type.name }}</a></li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="col-lg-12" style="margin-top: 20px;">-->
        <!--<ipt-table :tableData="creditRankTableData" :tableConfig="creditRankConfig" :params="creditRankParams" :pagerShow="false"></ipt-table>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
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
