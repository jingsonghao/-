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
          <input type="text" v-model="runningReport.authorName" readonly name="authorName" class="form-control">
            </div>
        </div>
        <div class="form-group">
          <label  class="col-sm-3 control-label">问题报告名称</label>
          <div class="col-sm-7">
          <input type="text" class="form-control" placeholder="" readonly v-model="runningReport.reportName">
            </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">问题报告时间</label>
          <div class="col-sm-7">
          <el-date-picker v-model="runningReport.runningDateMin" readonly style="width: 140px;"
                          type="date" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
          <label>—</label>
          <el-date-picker v-model="runningReport.runningDateMax" readonly style="width: 140px;"
                          type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59"></el-date-picker>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label">内容</label>
          <div class="col-sm-7">
            <div class="col-sm-10" v-html="runningReport.content" >
            </div>
            <!--          <vue-editor id="editEditor" readonly v-model="runningReport.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
             <textarea rows="20" type="text" readonly v-model="runningReport.content" name="content" class="form-control"></textarea> -->
            </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">接收人</label>
          <div class="col-sm-7">
          <input type="text" v-model="runningReport.recipientName" readonly name="recipientName" class="form-control">
            </div>
            <!--<button v-model="runningReport.recipientId" name="recipientId" class="btn btn-reset" type="button">选择人员</button>-->
        </div>
        <div v-if="runningReport.auditStatus != 0" class="form-group">
          <label class="col-sm-3 control-label">审核人</label>
          <div class="col-sm-7">
          <input type="text" v-model="runningReport.auditName" readonly name="auditName" class="form-control">
            </div>
          <!--<button v-model="runningReport.auditId" name="auditId" class="btn btn-reset" type="button">选择人员</button>-->
        </div>
        <div v-if="runningReport.auditStatus == 2" class="form-group">
          <label class="col-sm-3 control-label">审核不通过原因</label>
          <div class="col-sm-7">
            <textarea rows="3" type="text" readonly v-model="runningReport.noByReason" name="noByReason" class="form-control"></textarea>
          </div>
          <!--<button v-model="runningReport.auditId" name="auditId" class="btn btn-reset" type="button">选择人员</button>-->
        </div>
      </form>
    </template>
  </ipt-modal>
</template>
<script>
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  /** luxinwei 02.09 */
  import CommonApi from '@/api'
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      IptModal, VueEditor
    },
    methods: {
      handleImageAdded: function(file, Editor, cursorLocation) {
        CommonApi.Common.handleImageAdded(file, Editor, cursorLocation)
      }
    },
    props: {
      runningReport: {}
    },
    created: function () {

    }
  }
</script>
