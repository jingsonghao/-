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
            <input type="text" class="form-control" v-model="editRunningReport.reportName" name="reportName"
                   v-validate="'required'" :class="{'is-danger': errors.has('reportName') }" readonly="readonly">
            <span v-show="errors.firstByRule('reportName', 'required')" class="help is-danger">请填写名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">问题报告时间</label>
          <div class="col-sm-7">
            <el-date-picker readonly="readonly" v-model="editRunningReport.runningDateMin" style="width: 140px;"
                            type="date" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
            <label>—</label>
            <el-date-picker readonly="readonly" v-model="editRunningReport.runningDateMax" style="width: 140px;"
                            type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59"></el-date-picker>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">内容</label>
          <div class="col-sm-7">
            <div class="col-sm-10" v-html="editRunningReport.content" >
            </div>
            <!--<textarea rows="20" type="text" v-model="editRunningReport.content" name="content" class="form-control"
                      v-validate="'required'" :class="{'is-danger': errors.has('content') }" readonly></textarea>
            <span v-show="errors.has('required')" class="help is-danger">请填写内容</span>-->
          </div>
        </div>
       <!-- <div class="form-group">
          <label class="col-sm-3 control-label">接收人</label>
          <div class="col-sm-7">
            <input type="text" v-model="editRunningReport.recipientName" name="recipientName" class="form-control">
          </div>
          <button v-model="editRunningReport.recipientId" name="recipientId" class="btn btn-reset" type="button">选择人员</button>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">审核人</label>
          <div class="col-sm-7">
            <input type="text" v-model="editRunningReport.auditName" name="auditName" class="form-control">
          </div>
          <button v-model="editRunningReport.auditId" name="auditId" class="btn btn-reset" type="button">选择人员</button>
        </div>-->

      </form>
    </template>
    <!-- [modalFooter]底部插槽 -->
    <template slot="modalFooter">
      <button type="button" class="btn btn-reset" @click="reset">重置</button>
      <button type="button" class="btn btn-search" @click="audit">通过</button>
      <button type="button" class="btn btn-search" @click="auditno(editRunningReport)" data-toggle="modal" data-target="#js_auditno_modal">未通过</button>
    </template>
  </ipt-modal>
</template>
<script>
  import $ from 'jquery'
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapActions} from 'vuex'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-trace-back/api'
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
        editRunningReport: {},
        auditVO: {}
      }
    },
    props: {
      params: {},
      runningReport: {
        runningDateMin:'',
        runningDateMax:'',
        reportName: '',
        content: '',
        auditId:'',
        recipientId:''
      }
    },
    watch: {
      runningReport() {
        this.editRunningReport = JSON.parse(JSON.stringify(this.runningReport))
      }
    },
    methods: {
      init() {
        /** 审核初始赋值 */
        this.auditVO = {rejectReason: null, pass: true}
      },
      reset() {
        this.editRunningReport = JSON.parse(JSON.stringify(this.runningReport))
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
              Api.RunningReport.approvalRunningReport(that.editRunningReport.runningReportId, that.auditVO).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                $('#js_audit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
          }
          })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this.getRunningReportTableData(this.params)
              })
            })
            return
          }
        this.$alert('Oh NO!')
        })
      },
      auditno(editRunningReport) {
        Api.RunningReport.findRunningReport(editRunningReport.runningReportId).then((data) => {
          this.runningReport = data.data
      })
      }/*,
      auditNO() {
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
              Api.RunningReport.approvalRunningReport(that.editRunningReport.runningReportId, that.auditVO).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                $('#js_audit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
          }
          })
            /!** yanggang 2017/12/4 更新表格分页数据 *!/
            this.getRunningReportTableData(this.params)
          })
          })
            return
          }
          this.$alert('Oh NO!')
      })
      }*/,
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getRunningReportTableData: 'getRunningReportTableData'
      })
    }
  }
</script>
