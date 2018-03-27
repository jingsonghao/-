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
          <!-- 文本编辑器 -->
          <!-- 1. 导入文本编辑器，作为组件使用 -->
          <!-- 2. 预定义model的初始值 -->
          <!-- 3. useCustomImageHandler 使用自定义的图片处理，默认为base64的字符串 -->
          <!-- 4. handleImageAdded 自定义图片处理的方法 -->
          <!--    文件上传的处理的公共请求已经实现，引入组件直接调用即可 -->
          <vue-editor id="plan-edit-editor" v-model="editedParams.remark" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
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
  import CommonApi from '@/api'
  import {mapActions} from 'vuex'
  import IptModal from "@/components/common/modal"
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      IptModal, VueEditor
    },
    props: {
      params: {},
      singleData: {}
    },
    data: function () {
      return {
        editedParams: {}
      }
    },
    watch: {
      singleData() {
        this.editedParams = JSON.parse(JSON.stringify(this.singleData))
      }
    },
    methods: {
      saveAdd: function () {
        let self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            Api.EmergencyPlan.update(this.editedParams.planId, this.editedParams).then((data) => {
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
      reset: function () {
        this.editedParams = JSON.parse(JSON.stringify(this.singleData))
        this.$validator.reset()
      },
      handleImageAdded: function(file, Editor, cursorLocation) {
        CommonApi.Common.handleImageAdded(file, Editor, cursorLocation)
      },
      ...mapActions({
        getEmergencyPlanTableData: 'getEmergencyPlanTableData'
      })
    }
  }
</script>

<style>

</style>
