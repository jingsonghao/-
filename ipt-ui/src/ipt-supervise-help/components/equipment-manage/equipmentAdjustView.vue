<template>
  <ipt-modal>
    <span slot="modalTitle">设备调整详情</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">设备编号</label>
          <div class="col-sm-7">
            {{viewParams.equipmentCode}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">重要产品类别</label>
          <div class="col-sm-7">
            {{viewParams.cateName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备类别</label>
          <div class="col-sm-7">
            {{viewParams.equipmentTypeName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备型号</label>
          <div class="col-sm-7">
            {{viewParams.equipmentModelName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备状态</label>
          <div class="col-sm-7">
            {{viewParams.equipmentStatusName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">调整日期</label>
          <div class="col-sm-7">
            {{viewParams.adjustDate}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">操作人</label>
          <div class="col-sm-7">
            {{viewParams.operateUser}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">使用企业</label>
          <div class="col-sm-7">
            {{viewParams.enterpriseName}}
          </div>
        </div>
      </form>
    </template>
  </ipt-modal>
</template>
<script>
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      viewParams: {}
    }
  }
</script>
