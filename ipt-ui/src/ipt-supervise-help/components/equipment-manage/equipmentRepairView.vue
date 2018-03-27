<template>
  <ipt-modal>
    <span slot="modalTitle">设备维护详情</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">设备编号</label>
          <div class="col-sm-7">{{ viewParams.equipmentCode }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">重要产品类别</label>
          <div class="col-sm-7">{{ viewParams.cateName }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备类别</label>
          <div class="col-sm-7">{{ viewParams.equipmentTypeName }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">设备型号</label>
          <div class="col-sm-7">{{ viewParams.equipmentModelName }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">使用企业</label>
          <div class="col-sm-7">{{ viewParams.enterpriseName }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">修理状态</label>
          <div class="col-sm-7">{{ viewParams.repairStatusName }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">送还日期</label>
          <div class="col-sm-7">{{ viewParams.returnDate }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">维护日期</label>
          <div class="col-sm-7">{{ viewParams.repairDate }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">送还操作人</label>
          <div class="col-sm-7">{{ viewParams.returnOperateUser }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">送还原因</label>
          <div class="col-sm-7">{{ viewParams.returnRemarks }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">修理操作人</label>
          <div class="col-sm-7">{{ viewParams.repairOperateUser }}</div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">维护信息</label>
          <div class="col-sm-7">{{ viewParams.repairRemarks }}</div>
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
