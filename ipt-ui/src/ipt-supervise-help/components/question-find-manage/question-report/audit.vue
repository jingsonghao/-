<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">审核</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label  class="col-sm-3 control-label">问题报告名称</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" disabled v-model="editQuestionReport.reportName" name="reportName"
                   v-validate="'required'" :class="{'is-danger': errors.has('reportName') }">
            <span v-show="errors.firstByRule('reportName', 'required')" class="help is-danger">请填写名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">问题报告时间</label>
          <div class="col-sm-7">
            <el-date-picker v-model="editQuestionReport.startTime" style="width: 140px;"
                            type="date" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00" disabled></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="editQuestionReport.endTime" style="width: 140px;"
                            type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59" disabled></el-date-picker>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">内容</label>
          <div class="col-sm-7">
            <div class="col-sm-10" v-html="editQuestionReport.content" >
            </div>
            <!--<textarea rows="20" type="text" v-model="editQuestionReport.content" name="content" class="form-control"
                      v-validate="'required'" :class="{'is-danger': errors.has('content') }"></textarea>
            <span v-show="errors.firstByRule('content', 'required')" class="help is-danger">请填写内容</span>-->
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">接收人</label>
          <div class="col-sm-7">
            <input type="text" v-model="editQuestionReport.recipientName" name="recipientName" class="form-control" disabled>
          </div>
          <!--<button type="button" class="btn btn-reset" data-toggle="modal" data-target="#js_user_modal">选择人员</button>-->
        </div>
        <!--<div class="form-group">
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
      <button type="button" class="btn btn-reset" @click="reset">重置</button>
      <button type="button" class="btn btn-search" @click="audit">通过</button>
      <button type="button" class="btn btn-search" @click="auditNO(editQuestionReport)" data-toggle="modal" data-target="#js_auditNo_modal">未通过</button>
    </template>
  </ipt-modal>
</template>
<script>
  import $ from 'jquery'
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapActions, mapGetters} from 'vuex'
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
      },
      findUser() {
        this.editQuestionReport.recipientName = this.findUser.name
        this.editQuestionReport.recipientId = this.findUser.userId
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
      audit() {
        var that = this
        /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            this.$confirm('是否审核通过?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {
              Api.QuestionReport.approvalQuestionReport(that.editQuestionReport.reportId, that.auditVO).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                $('#js_audit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
          }
          })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this.getQuestionReportTableData(this.params)
              })
            })
            return
          }
        this.$alert('Oh NO!')
        })
      },
      /*auditNO() {
        var that = this
        that.auditVO.pass = false
        /!** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 *!/
        that.$validator.validateAll().then((result) => {
          if (result) {
            this.$confirm('是否审核不通过?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {
              Api.QuestionReport.approvalQuestionReport(that.editQuestionReport.reportId, that.auditVO).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                $('#js_audit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
          }
          })
            /!** yanggang 2017/12/4 更新表格分页数据 *!/
            this.getQuestionReportTableData(this.params)
          })
          })
            return
          }
          this.$alert('Oh NO!')
      })
      },*/
      auditNO(editQuestionReport) {
        Api.QuestionReport.findQuestionReport(editQuestionReport.reportId).then((data) => {
          this.questionReport = data.data
      })
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getQuestionReportTableData: 'getQuestionReportTableData'
      })
    },
    computed: mapGetters({
      findUser: 'findUser'
    })
  }
</script>
