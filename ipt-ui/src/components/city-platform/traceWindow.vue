<template>
  <ipt-modal ref="iptModel">
    <span slot="modalTitle">追溯导航</span>
    <template slot="modalBody">
      <div class="col-lg-12 trac-ul">
        <div>
          <ul>
            <li><img src="../../assets/img/11111.png" alt=""><span class="beian">备案</span></li>
            <li class="spa"><span>|</span></li>
            <li><img src="../../assets/img/pc.png" alt=""><span data-toggle="modal" data-target="#js_ipt_record_window">信息录入</span></li>
            <li><img src="../../assets/img/arrow.png" alt="" class="z-arrow"></li>
            <li><img src="../../assets/img/dun.png" alt=""><span @click="go('/traceBack/fillingAudit')">信息审核</span></li>
            <li><img src="../../assets/img/arrow.png" alt="" class="z-arrow"></li>
            <li><img src="../../assets/img/zcopy.png" alt=""><span @click="go('/traceBack/filling')">信息检索</span></li>
          </ul>
        </div>
        <br>
        <div>
          <ul>
            <li><img src="../../assets/img/22222.png" alt=""><span class="fuma">赋码</span></li>
            <li class="spa"><span>|</span></li>
            <li><img src="../../assets/img/zstar.png" alt=""><span @click="go('/codingSystem/approvalManage')">赋码分配</span></li>
            <li><img src="../../assets/img/arrow.png" alt="" class="z-arrow"></li>
            <li><img src="../../assets/img/zwrite.png" alt=""><span @click="go('/codingSystem/approvalManage')">分配审核</span></li>
            <li><img src="../../assets/img/arrow.png" alt="" class="z-arrow"></li>
            <li><img src="../../assets/img/find.png" alt=""><span @click="go('/codingSystem/approvalManage')">信息检索</span></li>
          </ul>
        </div>
        <br>
        <div>
          <ul>
            <li><img src="../../assets/img/33333.png" alt=""><span class="jieshou">数据接收</span></li>
            <li class="spa"><span>|</span></li>
            <li><span @click="go('/traceBack/circulation/placeorigin')">产地</span></li>
            <li><span @click="go('/traceBack/circulation/butcher')">屠宰场</span></li>
            <li><span @click="go('/traceBack/circulation/supermarket')">超市</span></li>
            <li><span @click="go('/traceBack/circulation/retail')">零售</span></li>
          </ul>
        </div>
        <br>
        <div>
          <ul>
            <li><img src="../../assets/img/44444.png" alt=""><span class="clear">数据清洗</span></li>
            <li class="spa"><span>|</span></li>
            <li><span @click="go('/traceBack/deleteRecover')">自动信息剔除</span></li>
            <li><span @click="go('/traceBack/deleteRecover')">剔除信息恢复</span></li>
            <li><span @click="go('/traceBack/deleteRecover')">检索</span></li>
          </ul>
        </div>
        <br>
        <div>
          <ul>
            <li><img src="../../assets/img/55555.png" alt=""><span class="hecheng">链条合成</span></li>
            <li class="spa"><span>|</span></li>
            <li><span @click="go('/traceBack/chainSynthesis')">按码合成</span></li>
            <li><span @click="go('/traceBack/chainSynthesis')">按产地合成</span></li>
            <li><span @click="go('/traceBack/chainSynthesis')">按批次合成</span></li>
            <li><span @click="go('/superviseHelp/emergencyPlan')">预案报告</span></li>
          </ul>
        </div>
      </div>
    </template>
    <template slot="modalFooter">

    </template>
  </ipt-modal>
</template>
<script>
  import IptModal from "@/components/common/modal"
  import $ from 'jquery'

  export default {
    components: {
      IptModal
    },
    methods: {
      go(path) {
        this.$router.push({
          path: path
        })
        $('div.modal-header > button[aria-label="Close"]').trigger('click')
      }
    }
  }
</script>

<style>
  .el-vue-amap-container {
    height: 300px !important;
  }
  .trac-ul ul {
    width: 900px;
  }
  .trac-ul ul .beian {
    color: #8aff8c;
  }
  .trac-ul ul .fuma {
    color: #9fdeff;
  }
  .trac-ul ul .jieshou {
    color: #ebeb53;
  }
  .trac-ul ul .clear {
    color: #eda72c;
  }
  .trac-ul ul .hecheng {
    color: #1a8068;
  }
  .spa {
    width: 50px !important;
  }
  .trac-ul li {
    float: left;
    min-width: 110px;
    display: inline-block;
    height: 100px;
    line-height: 40px;
  }
  .trac-ul li span  {
    cursor: pointer;
  }

  .trac-ul li img {
    margin-right: 15px;
  }
  .trac-ul li:nth-child(1) span {
    display: inline-block;
    width:78px;
  }
  .trac-ul .z-arrow {
    margin-left: 30px;
  }
</style>

