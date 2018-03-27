<template>
  <ipt-modal @close="reset">
    <span slot="modalTitle">修改</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">模板名称</label>
          <div class="col-sm-7">
            <input v-model="editedParams.templateName" type="text" class="form-control" placeholder=""
                   v-validate="'required'" name="planName" :class="{'is-danger': errors.has('planName') }">
            <span v-show="errors.firstByRule('planName', 'required')" class="help is-danger">请填写应急预案名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">模板路径</label>
          <div class="col-sm-7">
            <input v-model="editedParams.templatePath" type="text" class="form-control" placeholder=""
                   v-validate="'required'" name="theme" :class="{'is-danger': errors.has('theme') }">
            <span v-show="errors.firstByRule('theme', 'required')" class="help is-danger">请填写应急预案主题</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">模板内容</label>
        </div>
        <div>
          <codemirror
            ref="editCodemirror"
            v-model="editedParams.templateContent"
            :options="editorOpts"
            @ready="editorReady"
          ></codemirror>
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
  import Api from '@/ipt-manage-system/api'
  import { mapActions } from 'vuex'
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      params: {},
      singleData: {}
    },
    data () {
      return {
        editedParams: {},
        editorOpts: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          extraKeys: { "Ctrl": "autocomplete" },
          mode: 'htmlmixed',
          lineWrapping: true,
          theme: 'mbo'
        }
      }
    },
    watch: {
      singleData() {
        this.editedParams = JSON.parse(JSON.stringify(this.singleData))
        this.editCodemirror.refresh()
      }
    },
    computed: {
      editCodemirror() {
        return this.$refs.editCodemirror.codemirror
      }
    },
    methods: {
      saveAdd() {
        let self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            Api.TemplateManage.update(self.editedParams.templateId, self.editedParams).then((data) => {
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
              self.getTemplateManageTableData(this.params)
            })
          }
        })
      },
      reset() {
        this.editedParams = JSON.parse(JSON.stringify(this.singleData))
        this.$validator.reset()
        this.editCodemirror.refresh()
      },
      editorReady(codemirror) {
        codemirror.refresh()
        codemirror.focus()
      },
      ...mapActions({
        getTemplateManageTableData: 'getTemplateManageTableData'
      })
    }
  }
</script>
