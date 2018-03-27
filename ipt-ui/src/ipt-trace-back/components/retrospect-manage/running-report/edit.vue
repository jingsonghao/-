<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">编辑</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label  class="col-sm-3 control-label">运行报告名称</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" v-model="editRunningReport.reportName" name="reportName"
                   v-validate="'required'" :class="{'is-danger': errors.has('reportName') }">
            <span v-show="errors.firstByRule('reportName', 'required')" class="help is-danger">请填写名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">运行报告时间</label>
          <div class="col-sm-7">
            <el-date-picker v-model="editRunningReport.runningDateMin" style="width: 140px;"
                            type="date" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="editRunningReport.runningDateMax" style="width: 140px;"
                            type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59"></el-date-picker>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">内容</label>
          <div class="col-sm-7">
            <vue-editor id="editEditor" v-model="editRunningReport.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
   <!--         <textarea rows="20" type="text" v-model="editRunningReport.content" name="content" class="form-control"
                      v-validate="'required'" :class="{'is-danger': errors.has('content') }"></textarea>-->
            <span v-show="errors.firstByRule('content', 'required')" class="help is-danger">请填写内容</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">接收人</label>
          <div class="col-sm-7">
            <input type="text" v-model="editRunningReport.recipientName" name="recipientName" class="form-control" >
          </div>
          <button class="btn btn-reset" type="button" data-toggle="modal" data-target="#js_user_modal" >选择人员</button>
          <input type="hidden" v-model="editRunningReport.recipientId">
        </div>
       <!-- <div class="form-group">
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
      <button type="button" class="btn btn-search" @click="create">保存</button>
    </template>
  </ipt-modal>
</template>
<script>
  import $ from 'jquery'
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapActions, mapGetters} from 'vuex'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-trace-back/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  /** luxinwei 02.09 */
  import CommonApi from '@/api'
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      IptModal, VueEditor
    },
    data: function () {
      return {
        editRunningReport: {}
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
        recipientName:'',
        recipientId:''
      }
    },
    watch: {
      runningReport() {
        this.editRunningReport = JSON.parse(JSON.stringify(this.runningReport))
      },
      findUser() {
        this.editRunningReport.recipientName = this.findUser.name
        this.editRunningReport.recipientId = this.findUser.userId
      }
    },
    methods: {
      create() {
        var that = this
        /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.RunningReport.updateAdminRecord(that.editRunningReport.runningReportId, that.editRunningReport).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  $('#js_edit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
                }
              })
              /** yanggang 2017/12/4 更新表格分页数据 */
              that.getRunningReportTableData(that.params)
              this.reset()
            })
            return
          }
          this.$alert('Oh NO!')
        })
      },
      handleImageAdded: function(file, Editor, cursorLocation) {
        CommonApi.Common.handleImageAdded(file, Editor, cursorLocation)
      },
      reset() {
        this.editRunningReport = JSON.parse(JSON.stringify(this.runningReport))
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getRunningReportTableData: 'getRunningReportTableData'
      })
    },
    computed: mapGetters({
      findUser: 'findUser'
    })
  }
</script>
