<template>
  <ipt-modal>
    <span slot="modalTitle">查看</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">应急预案名称</label>
          <div class="col-sm-7">
            <input v-model="singleData.planName" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">应急预案主题</label>
          <div class="col-sm-7">
            <input v-model="singleData.theme" type="text" class="form-control">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">应急预案内容</label>
          <div class="col-sm-7"></div>
          <div class="col-sm-12" v-html="singleData.remark"></div>
        </div>
      </form>
    </template>
  </ipt-modal>
</template>
<script type="text/ecmascript-6">
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      singleData: {}
    }
  }
</script>

<style>

</style>
