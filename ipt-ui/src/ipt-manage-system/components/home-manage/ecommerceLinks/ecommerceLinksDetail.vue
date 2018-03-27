<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">添加</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">公司名称</label>
          <div class="col-sm-7">
            {{linkRecord.enterpriseName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">公司网址</label>
          <div class="col-sm-7">
            {{linkRecord.enterpriseUrl}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">logo</label>
          <div class="col-sm-7">
            <img :src="linkRecord.logo" height="200" width="200">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">二维码</label>
          <div class="col-sm-7">
            <img :src="linkRecord.qrCode" height="200" width="200">
          </div>
        </div>
      </form>
    </template>
  </ipt-modal>
</template>
<script>
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      linkRecord: {}
    },
    created: function () {

    }
  }
</script>
