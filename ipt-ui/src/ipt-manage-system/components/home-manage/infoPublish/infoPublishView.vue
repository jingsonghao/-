<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">查看详情</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">所属频道</label>
          <div class="col-sm-10">
            {{record.channelName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">新闻标题</label>
          <div class="col-sm-10">
            {{record.title}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">添加时间</label>
          <div class="col-sm-10">
            {{record.createTime}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">是否置顶</label>
          <div class="col-sm-10">
            {{record.isTopName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">内容</label>
          <div class="col-sm-10">
            <div class="summernote ql-editor">
              <div v-html="record.content"></div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">信息图片</label>
          <div class="col-sm-10">
            <img :src="record.image" style="width:170px;margin-top:-21px;margin-right:123px;height:120px;display: inline-block;padding:5px;border: 1px solid #ccc;">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">审核状态</label>
          <div class="col-sm-10">
            {{record.reviewStatusName}}
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
