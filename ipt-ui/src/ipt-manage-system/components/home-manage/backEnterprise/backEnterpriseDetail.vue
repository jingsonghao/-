<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">详细</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
        <label class="col-sm-3 control-label">公司名称</label>
        <div class="col-sm-7">
          {{backEnterpriseRecord.enterpriseName}}
        </div>
      </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">公司类型</label>
          <div class="col-sm-7">
            {{backEnterpriseRecord.enterpriseTypeName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">公司地址</label>
          <div class="col-sm-7">
            {{backEnterpriseRecord.address}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">创建日期</label>
          <div class="col-sm-7">
            {{backEnterpriseRecord.createTime}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">企业介绍</label>
          <div class="col-sm-7">
            {{backEnterpriseRecord.introduce}}
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
      backEnterpriseRecord: {
        enterpriseTypeName: ''
      }
    },
    created: function () {

    }
  }
</script>
