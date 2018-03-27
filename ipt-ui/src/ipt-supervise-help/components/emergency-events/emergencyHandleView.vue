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
          <label class="col-sm-3 control-label">跨城市应急信息上报时间</label>
          <div class="col-sm-7">
            <el-date-picker
              v-model="params.startTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">上报人</label>
          <div class="col-sm-7">
            <input type="text" v-model="questionReport.reportName" name="reportName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('reportName') }">
            <span v-show="errors.firstByRule('reportName', 'required')" class="help is-danger">请填写上报人</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">重要产品类别</label>
          <div class="col-sm-7">
            <select type="text" v-model="params.parentCateName" class="form-control search-01 select-form"
                    placeholder="">
              <option value="">全部</option>
              <option value="0">食品</option>
              <option value="1">中药材</option>
            </select>
            <span v-show="errors.firstByRule('content', 'required')" class="help is-danger">请选择类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">重要产品品种</label>
          <div class="col-sm-7">
            <select type="text" v-model="params.cateName" class="form-control search-01 select-form" placeholder="">
              <option value="">全部</option>
              <option value="0">中药材</option>
            </select>
            <span v-show="errors.firstByRule('content', 'required')" class="help is-danger">请选择类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">流通节点类型</label>
          <div class="col-sm-7">
            <select type="text" v-model="params.circulateCode" class="form-control search-01 select-form"
                    placeholder="">
              <option value="">全部</option>
              <option value="0">食品产地</option>
              <option value="1">超市</option>
            </select>
            <span v-show="errors.firstByRule('content', 'required')" class="help is-danger">请选择类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">企业名称</label>
          <div class="col-sm-7">
            <select type="text" v-model="params.biz_Name" class="form-control search-01 select-form" placeholder="">
              <option value="">全部</option>
              <option value="0">食品产地</option>
              <option value="1">超市</option>
            </select>
            <span v-show="errors.firstByRule('content', 'required')" class="help is-danger">请选择类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">溯源码</label>
          <div class="col-sm-7">
            <input type="text" v-model="params.biz_Name" name="enterpriseName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }">
            <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger">请填写溯源码</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">疑似问题产品</label>
          <div class="col-sm-7">
            <input type="text" v-model="params.biz_Name" name="enterpriseName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }">
            <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger">请填写问题</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">涉及范围</label>
          <div class="col-sm-7">
            <input type="text" v-model="params.biz_Name" name="enterpriseName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }">
            <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger">请填写涉及范围</span>
          </div>
        </div>
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
  import {mapActions} from 'vuex'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-supervise-help/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      params: {}
    },
    data() {
      return {
        questionReport: {
          startTime: '',
          endTime: '',
          reportName: '',
          content: '',
          auditId: '',
          recipientId: ''
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
              that.addQuestionReport(this.params)
            })
            return
          }
          this.$alert('Oh NO!')
        })
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        addQuestionReport: 'addQuestionReport'
      })
    }
  }
</script>
