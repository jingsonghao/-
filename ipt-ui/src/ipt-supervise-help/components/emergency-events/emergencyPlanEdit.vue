<template>
  <ipt-modal @close="reset">
    <span slot="modalTitle">修改</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">应急预案名称</label>
          <div class="col-sm-7">
            <input v-model="editedParams.planName" type="text" class="form-control" placeholder=""
                   v-validate="'required'" name="planName" :class="{'is-danger': errors.has('planName') }">
            <span v-show="errors.firstByRule('planName', 'required')" class="help is-danger">请填写应急预案名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">应急预案主题</label>
          <div class="col-sm-7">
            <input v-model="editedParams.theme" type="text" class="form-control" placeholder=""
                   v-validate="'required'" name="theme" :class="{'is-danger': errors.has('theme') }">
            <span v-show="errors.firstByRule('theme', 'required')" class="help is-danger">请填写应急预案主题</span>
          </div>
        </div>
        <div class="summernote">
          <vue-ueditor ueditorPath="/static/js/ueditor/" @ready="editorReady"></vue-ueditor>
        </div>
      </form>
    </template>
    <template slot="modalFooter">
      <button type="button" class="btn btn-search" @click="saveAdd">保存</button>
      <button type="button" class="btn btn-reset" @click="reset">重置</button>
    </template>
  </ipt-modal>
</template>
<script type="text/ecmascript-6">
  import $ from 'jquery'
  import Api from '@/ipt-supervise-help/api'
  import {mapActions} from 'vuex'
  import IptModal from "@/components/common/modal"
  import VueUeditor from 'vue-ueditor'

  export default {
    components: {
      IptModal, VueUeditor
    },
    props: {
      params: {},
      singleData: {}
    },
    data () {
      return {
        editedParams: {},
        remarkEditor: undefined
      }
    },
    watch: {
      singleData() {
        this.editedParams = JSON.parse(JSON.stringify(this.singleData))
        if (this.remarkEditor) {
          this.remarkEditor.setContent(this.singleData.remark)
        }
      }
    },
    methods: {
      saveAdd () {
        let self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.editedParams.remark = self.remarkEditor.getContent()
            Api.EmergencyPlan.update(self.editedParams.planId, self.editedParams).then((data) => {
              self.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  /** yanggang 2017/12/5 关闭弹出层 */
                  $('#js_edit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
                  /** yanggang 2017/12/5 清空数据 */
                  self.reset()
                }
              })
              /** yanggang 2017/12/4 更新表格分页数据 */
              self.getEmergencyPlanTableData(this.params)
            })
          }
        })
      },
      reset () {
        this.editedParams = JSON.parse(JSON.stringify(this.singleData))
        this.remarkEditor.setContent(this.singleData.remark)
        this.$validator.reset()
      },
      editorReady (Editor) {
        this.remarkEditor = Editor
        if (this.singleData) {
          this.remarkEditor.setContent(this.singleData.remark)
        }
      },
      ...mapActions({
        getEmergencyPlanTableData: 'getEmergencyPlanTableData'
      })
    }
  }
</script>

<style>

</style>
