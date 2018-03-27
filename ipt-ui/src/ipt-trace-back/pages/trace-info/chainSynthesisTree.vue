<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>追溯管理系统</a></li>
      <li><a>追溯信息管理</a></li>
      <li class="active jsh-active">追溯链条合成</li>
    </ol>
    <div id="myTabContent" class="tab-content">
      <div class="tracing-chain">
        <div class="text-right btn-box-j" style="margin-bottom: 20px">
          <a class="btn btn-search btn-back-j" @click="returnLastPage">返回</a>
        </div>
        <!--标题部分-->
        <div class="box">
          <div class="chain-content">
            <ul class="tree">
              <ipt-chain-tree :chainData="chainData" :iconIndex="iconIndex"></ipt-chain-tree>
            </ul>
            <!--链条背景-->
            <div class="bg row">
              <div class="col-xs-2">
                <div class="tree-top">产地</div>
              </div>
              <div class="col-xs-2">
                <div class="tree-top">定点屠宰厂</div>
              </div>
              <div class="col-xs-2">
                <div class="tree-top">配送</div>
              </div>
              <div class="col-xs-2">
                <div class="tree-top">零售市场</div>
              </div>
              <div class="col-xs-2">
                <div class="tree-top">超市</div>
              </div>
              <div class="col-xs-2">
                <div class="tree-top">团体消费单位</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import IptChainTree from './chainTree'
  import Api from '@/ipt-trace-back/api'

  export default {
    components: {
      IptChainTree
    },
    mounted () {
      this.init()
    },
    data () {
      return {
        chainData: {},
        iconIndex: 1
      }
    },
    computed: {
      queryId () {
        return this.$router.currentRoute.query.id
      }
    },
    methods: {
      init () {
        Api.ChainSynthesis.getChain(this.queryId).then((data) => {
          this.chainData = data.data
        })
      },
      returnLastPage() {
        this.$router.push({
          path: `/traceBack/chainSynthesis`
        })
      }
    }
  }
</script>
