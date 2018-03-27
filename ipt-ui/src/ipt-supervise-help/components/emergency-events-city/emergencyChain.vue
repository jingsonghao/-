<template>
  <div>
    <!--tab插件-->
    <div class="tab-btn-list shadow-boxs">
      <ul id="myTab" class="tab-btn list-inline">
        <li class="active"><a href="#tab01" data-toggle="tab" aria-expanded="true">追溯链条01</a></li>
        <li class=""><a href="#tab02" data-toggle="tab" aria-expanded="false">追溯链条02</a></li>
        <li class=""><a href="#tab03" data-toggle="tab" aria-expanded="false">追溯链条03</a></li>
      </ul>
    </div>
    <div id="myTabContent" class="tab-content">
      <!-- TODO v-for -->
      <div class="tab-pane fade in active" id="tab01">
        <div class="tracing-chain">
          <!-- TODO 链条 -->
          <!--标题部分-->
          <div class="table-title-box"><h3>链条合成 </h3><ul class="tool-btn-box pull-right"></ul></div>
          <div class="box">
            <div class="chain-content">
              <ul class="tree" >
                <ipt-chain-tree :chainData="chainData"></ipt-chain-tree>
              </ul>
              <!--链条背景-->
              <div class="bg row">
                <div class="col-xs-2"><div class="tree-top">产地</div></div>
                <div class="col-xs-2"><div class="tree-top">定点屠宰厂</div></div>
                <div class="col-xs-2"><div class="tree-top">配送</div></div>
                <div class="col-xs-2"><div class="tree-top">零售市场</div></div>
                <div class="col-xs-2"><div class="tree-top">超市</div></div>
                <div class="col-xs-2"><div class="tree-top">团体消费单位</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="shadow-boxs">
          <div class="col-lg-12 m-lg">
            <!-- TODO 问题节点表 Table -->
          </div>
        </div>
        <div class="shadow-boxs">
          <div class="col-lg-12 m-lg">
            <!-- TODO 问题批次追溯表 Table -->
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="tab02">
        <div class="tracing-chain">
          <!-- TODO 链条 -->
          <!--标题部分-->
          <div class="table-title-box"><h3>链条合成 </h3><ul class="tool-btn-box pull-right"></ul></div>
          <div class="box">
            <div class="chain-content">
              <ul class="tree" >
                <ipt-chain-tree :chainData="chainData"></ipt-chain-tree>
              </ul>
              <!--链条背景-->
              <div class="bg row">
                <div class="col-xs-2"><div class="tree-top">产地</div></div>
                <div class="col-xs-2"><div class="tree-top">定点屠宰厂</div></div>
                <div class="col-xs-2"><div class="tree-top">定点屠宰厂</div></div>
                <div class="col-xs-2"><div class="tree-top">零售市场</div></div>
                <div class="col-xs-2"><div class="tree-top">超市</div></div>
                <div class="col-xs-2"><div class="tree-top">团体消费单位</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="shadow-boxs"><div class="col-lg-12 m-lg"></div></div>
        <div class="shadow-boxs"><div class="col-lg-12 m-lg"></div></div>
      </div>
      <div class="tab-pane fade" id="tab03">
        <div class="tracing-chain">
          <!-- TODO 链条 -->
          <!--标题部分-->
          <div class="table-title-box"><h3>链条合成 </h3><ul class="tool-btn-box pull-right"></ul></div>
          <div class="box">
            <div class="chain-content">
              <ul class="tree" >
                <ipt-chain-tree :chainData="chainData"></ipt-chain-tree>
              </ul>
              <!--链条背景-->
              <div class="bg row">
                <div class="col-xs-2"><div class="tree-top">产地</div></div>
                <div class="col-xs-2"><div class="tree-top">定点屠宰厂</div></div>
                <div class="col-xs-2"><div class="tree-top">定点屠宰厂</div></div>
                <div class="col-xs-2"><div class="tree-top">零售市场</div></div>
                <div class="col-xs-2"><div class="tree-top">超市</div></div>
                <div class="col-xs-2"><div class="tree-top">团体消费单位</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="shadow-boxs"><div class="col-lg-12 m-lg"></div></div>
        <div class="shadow-boxs"><div class="col-lg-12 m-lg"></div></div>
      </div>
    </div>
  </div>
</template>
<script>
  import IptChainTree from './chainTree'

  export default {
    components: {
      IptChainTree
    },
    mounted() {
      this.init()
    },
    data() {
      return {
        chainData: {}
      }
    },
    methods: {
      init() {
        this.chainData = {
          tacheName: '宁夏大千农牧有限公司',
          productName: '松鹤黑猪',
          tradeDate: '2017-10-10',
          amount: '2000',
          unit: 'kg',
          icon: 'tree-icon1',
          child: [
            {
              tacheName: '方下镇定点屠宰厂',
              productName: '白条',
              tradeDate: '2017-10-10',
              amount: '1500',
              unit: 'kg',
              icon: 'tree-icon2',
              child: [
                {
                  tacheName: '宁夏农贸批发市场',
                  productName: '白条',
                  tradeDate: '2017-10-11',
                  amount: '1000',
                  unit: 'kg',
                  icon: 'tree-icon3',
                  child: [
                    {
                      tacheName: '宁夏农贸零售市场',
                      productName: '白条',
                      tradeDate: '2017-10-11',
                      amount: '600',
                      unit: 'kg',
                      icon: 'tree-icon4',
                      child: [
                        {
                          tacheName: '银座超市',
                          productName: '白条',
                          tradeDate: '2017-10-13',
                          amount: '200',
                          unit: 'kg',
                          icon: 'tree-icon5',
                          child: [
                            {
                              tacheName: '美团配送中心',
                              productName: '白条',
                              tradeDate: '2017-10-14',
                              amount: '100',
                              unit: 'kg',
                              icon: 'tree-icon6',
                              child: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              tacheName: '市定点屠宰厂',
              productName: '白条',
              tradeDate: '2017-10-10',
              amount: '500',
              unit: 'kg',
              icon: 'tree-icon2',
              child: []
            }
          ]
        }
      }
    }
  }
</script>
