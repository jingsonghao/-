<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">问题报告</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <!-- [验证] -->
        <!-- 1. 使用[name]+[v-validate]一起使用进行校验 -->
        <!--    可使用的验证规则：http://vee-validate.logaretm.com/rules.html#available-validations -->
        <!-- 2. 使用errors对象获取错误信息 -->
        <!--    errors.has('name'): name属性是否又错误 -->
        <!--    errors.firstByRule('name', 'rule'): 获取name属性的rule规则的错误 -->
        <div class="form-group">
          <label class="col-sm-3 control-label">请选择问题报告时间</label>
          <div class="col-sm-7">
            <el-date-picker v-model="questionReport.startTime" style="width: 140px;"
                            type="date" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 00:00:00"></el-date-picker>
            <label>—</label>
            <el-date-picker v-model="questionReport.endTime" style="width: 140px;"
                            type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd 23:59:59"></el-date-picker>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">问题报告名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="questionReport.reportName" name="reportName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('reportName') }">
            <span v-show="errors.firstByRule('reportName', 'required')" class="help is-danger">请填写名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">内容</label>
          <div class="col-sm-7">
            <vue-editor id="addNewsEditor" v-model="questionReport.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
        <!--    <textarea rows="20" type="text" v-model="questionReport.content" name="content" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('content') }"></textarea>-->
            <span v-show="errors.firstByRule('content', 'required')" class="help is-danger">请填写内容</span>
          </div>
        </div>
        <!--<div class="form-group">
          <label class="col-sm-3 control-label">审核人</label>
          <div class="col-sm-7">
              <input type="text" v-model="questionReport.auditName" name="auditName" class="form-control">
          </div>
          <button v-model="questionReport.auditId" name="auditId" class="btn btn-reset" type="button">选择人员</button>
        </div>-->
        <div class="form-group">
          <label class="col-sm-3 control-label">接收人</label>
          <div class="col-sm-7">
            <input type="text" v-model="questionReport.recipientName" class="form-control" disabled>
          </div>
          <button type="button" class="btn btn-reset" data-toggle="modal" data-target="#js_user_modal">选择人员</button>
          <!-- 隐藏域 -->
          <input type="hidden" v-model="questionReport.recipientId">
        </div>
        <!--<span>{{ questionReport }}</span>-->
      </form>
      <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->

    </template>
    <!-- [modalFooter]底部插槽 -->
    <template slot="modalFooter">
      <button type="button" class="btn btn-reset" @click="reset">重置</button>
      <button type="button" class="btn btn-search" @click="create">提交审核</button>
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

  /** luxinwei 02.09 */
  import CommonApi from '@/api'
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      IptModal, VueEditor
    },
    props: {
      params: {}
    },
    data() {
      return {
        questionReport: {
          startTime:'',
          endTime:'',
          reportName: '',
          content: '',
          auditId:'',
          recipientName:'',
          recipientId:''
        }
      }
    },
    methods: {
      create() {
        var that = this
        /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.QuestionReport.addQuestionReport(that.questionReport).then((data) => {
              that.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  /** yanggang 2017/12/5 关闭弹出层 */
                  $('#js_add_modal div.modal-header > button[aria-label="Close"]').trigger('click')
                  /** yanggang 2017/12/5 清空数据 */
                  this.reset()
                }
              })
              /** yanggang 2017/12/4 更新表格分页数据 */
              that.getQuestionReportTableData(this.params)
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
        Object.assign(this.$data, this.$options.data())
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getQuestionReportTableData: 'getQuestionReportTableData'
      })
    },
    watch: {
      findUser() {
        this.questionReport.recipientName = this.findUser.name
        this.questionReport.recipientId = this.findUser.userId
      }
    },
    computed: mapGetters({
      findUser: 'findUser'
    })
  }
</script>
