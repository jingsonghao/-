<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">审核不通过</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">

        <div class="form-group">
          <label class="col-sm-3 control-label">不通过原因</label>
          <div class="col-sm-7">
            <textarea rows="10" type="text" v-model="editQuestionReport.noByReason" name="noByReason" class="form-control"
                      v-validate="'required'" :class="{'is-danger': errors.has('noByReason') }"></textarea>
            <span v-show="errors.firstByRule('noByReason', 'required')" class="help is-danger">请填写不通过原因</span>
          </div>
        </div>
       <!-- <div class="form-group">
          <label class="col-sm-3 control-label">接收人</label>
          <div class="col-sm-7">
            <input type="text" v-model="editQuestionReport.recipientName" name="recipientName" class="form-control">
          </div>
          <button v-model="editQuestionReport.recipientId" name="recipientId" class="btn btn-reset" type="button">选择人员</button>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">审核人</label>
          <div class="col-sm-7">
            <input type="text" v-model="editQuestionReport.auditName" name="auditName" class="form-control">
          </div>
          <button v-model="editQuestionReport.auditId" name="auditId" class="btn btn-reset" type="button">选择人员</button>
        </div>-->

      </form>
    </template>
    <!-- [modalFooter]底部插槽 -->
    <template slot="modalFooter">
      <button type="button" class="btn btn-search" @click="auditNO(editQuestionReport)" data-toggle="modal" data-target="#js_auditNo_modal">确认</button>
    </template>
  </ipt-modal>
</template>
<script>
  import $ from 'jquery'
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapActions} from 'vuex'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-supervise-help/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    created() {
      this.init()
    },
    data: function () {
      return {
        editQuestionReport: {},
        auditVO: {}
      }
    },
    props: {
      params: {},
      questionReport: {
        startTime:'',
        endTime:'',
        reportName: '',
        content: '',
        auditId:'',
        noByReason:'',
        recipientName:'',
        recipientId:''
      }
    },
    watch: {
      questionReport() {
        this.editQuestionReport = JSON.parse(JSON.stringify(this.questionReport))
      }
    },
    methods: {
      init() {
        /** 审核初始赋值 */
        this.auditVO = {rejectReason: null, pass: true}
      },
      reset() {
        this.editQuestionReport = JSON.parse(JSON.stringify(this.questionReport))
      },
      auditNO(editQuestionReport) {
        var that = this
        that.auditVO.pass = false
        that.auditVO.rejectReason = editQuestionReport.noByReason
        /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
              Api.QuestionReport.approvalQuestionReport(that.editQuestionReport.reportId, that.auditVO).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  $('#js_auditNo_modal div.modal-header > button[aria-label="Close"]').trigger('click')
                  $('#js_audit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
                }
              })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this.getQuestionReportTableData(this.params)
          })
            return
          }
          this.$alert('Oh NO!')
      })
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getQuestionReportTableData: 'getQuestionReportTableData'
      })
    }
  }
</script>
