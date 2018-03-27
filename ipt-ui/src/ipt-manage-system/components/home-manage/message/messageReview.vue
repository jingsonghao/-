<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">留言审核</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">留言问题：</label>
          <div class="col-sm-10">
            <span class="form-control">{{editRecord.question}}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">问题类型：</label>
          <div class="col-sm-10">
            <span class="form-control">{{editRecord.messageTypeName}}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">提交时间：</label>
          <div class="col-sm-10">
            <span class="form-control">{{editRecord.createTime}}</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">审核结果：</label>
          <div class="col-sm-10">
            <select v-model="editRecord.reviewStatus" class="form-control" v-validate="'required'" :class="{'is-danger':errors.has('type') }">
              <option value="">--请选择--</option>
              <option v-for="option in reviewStatus" readonly :value="option.value">{{ option.name }}</option>
            </select>
            <span v-show="errors.has('reviewStatus')" class="help is-danger">请选择</span>
          </div>
        </div>
        <div class="form-group">
          <label  class="col-sm-2 control-label">反馈信息：</label>
          <div class="col-sm-10">
            <textarea class="form-control" v-model="editRecord.reply" name="reply" v-validate="'required'" :class="{'is-danger':errors.has('reply') }"></textarea>
            <span v-show="errors.has('reply')" class="help is-danger">请填写反馈信息</span>
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
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-manage-system/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    data: function () {
      return {
        editRecord: {}
      }
    },
  props: ['messageType', 'record', 'reviewStatus'],
  watch: {
    record() {
      this.editRecord = JSON.parse(JSON.stringify(this.record))
    }
  },
  methods: {
    create() {
      var that = this
      /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
      that.$validator.validateAll().then((result) => {
        if (result) {
          Api.LeaveMessage.reviewMessage(that.editRecord.messageId, that.editRecord).then((data) => {
            this.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
              $('#js_review_modal div.modal-header > button[aria-label="Close"]').trigger('click')
          }
        })
          /** yanggang 2017/12/4 更新表格分页数据 */
          that.getNotDealMessageTableData(that.params)
        })
          return
        }
        this.$alert('Oh NO!')
      })
    },
    reset() {
      this.editRecord = JSON.parse(JSON.stringify(this.record))
    }
  }
  }
</script>
