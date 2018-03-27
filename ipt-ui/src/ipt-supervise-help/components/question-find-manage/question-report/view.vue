<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">查看</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">问题报告作者</label>
          <div class="col-sm-7">
          <input type="text" v-model="questionReport.authorName" name="authorName" class="form-control" disabled>
            </div>
        </div>
        <div class="form-group">
          <label  class="col-sm-3 control-label">问题报告名称</label>
          <div class="col-sm-7">
          <input type="text" class="form-control" placeholder="" v-model="questionReport.reportName" disabled>
            </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">问题报告时间</label>
          <div class="col-sm-7">
          <el-date-picker v-model="questionReport.startTime" style="width: 140px;"
                          type="date" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00" disabled></el-date-picker>
          <label>—</label>
          <el-date-picker v-model="questionReport.endTime" style="width: 140px;"
                          type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59" disabled></el-date-picker>
            </div>
        </div>
        <div class="form-group">
          <label  class="col-sm-3 control-label">问题报告生成时间</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" placeholder="" v-model="questionReport.sendDate" disabled>
          </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label">内容</label>
          <div class="col-sm-7">
            <div class="col-sm-10" v-html="questionReport.content" >
            </div>
           <!-- <textarea rows="20" type="text" v-model="questionReport.content" name="content" class="form-control" disabled></textarea>-->
            </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">接收人</label>
          <div class="col-sm-7">
          <input type="text" v-model="questionReport.recipientName" name="recipientName" class="form-control" disabled>
            </div>
            <!--<button v-model="questionReport.recipientId" name="recipientId" class="btn btn-reset" type="button">选择人员</button>-->
        </div>
        <div class="form-group" v-if="questionReport.auditStatus !== 0">
          <label class="col-sm-3 control-label">审核人</label>
          <div class="col-sm-7">
          <input type="text" v-model="questionReport.auditName" name="auditName" class="form-control" disabled>
            </div>
          <!--<button v-model="questionReport.auditId" name="auditId" class="btn btn-reset" type="button">选择人员</button>-->
        </div>
        <div class="form-group" v-if="questionReport.auditStatus !== 0">
          <label  class="col-sm-3 control-label">审核时间</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" placeholder="" v-model="questionReport.auditDate" disabled>
          </div>
        </div>
        <div class="form-group" v-if="questionReport.auditStatus === 2">
          <label  class="col-sm-3 control-label">未通过原因</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" placeholder="" v-model="questionReport.noByReason" disabled>
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
      questionReport: {}
    },
    created: function () {

    }
  }
</script>
