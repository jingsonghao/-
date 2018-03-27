<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">查看留言</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">留言问题：</label>
          <div class="col-sm-10">
            <span class="form-control">{{record.question}}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">留言类型：</label>
          <div class="col-sm-10">
            <span class="form-control">{{record.messageTypeName}}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">提交时间：</label>
          <div class="col-sm-10">
            <span class="form-control">{{record.createTime}}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">审核结果：</label>
          <div class="col-sm-10"><span class="form-control">{{record.reviewStatusName}}</span></div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">反馈信息：</label>
          <div class="col-sm-10">
            <textarea class="form-control" disabled>{{record.reply}}</textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">回复时间：</label>
          <div class="col-sm-10">
            <span class="form-control">{{record.replyTime}}</span>
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
      record: {}
    },
    created: function () {
    }
  }
</script>
