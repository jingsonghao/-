<template>
  <ipt-modal @close="reset">
    <span slot="modalTitle">添加</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">模板名称</label>
          <div class="col-sm-7">
            <input v-model="editedParams.templateName" type="text" class="form-control" placeholder=""
                   v-validate="'required'" name="planName" :class="{'is-danger': errors.has('planName') }">
            <span v-show="errors.firstByRule('planName', 'required')" class="help is-danger">请填写模板名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">模板类型</label>
          <div class="col-sm-7">
            <el-select v-model="editedParams.templateType" name="templateType" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('templateType') }">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in templateTypeEnums"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('templateType', 'required')" class="help is-danger">请选择模板类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">模板路径</label>
          <div class="col-sm-7">
            <input v-model="editedParams.templatePath" type="text" class="form-control" placeholder=""
                   v-validate="'required'" name="theme" :class="{'is-danger': errors.has('theme') }">
            <span v-show="errors.firstByRule('theme', 'required')" class="help is-danger">请填写模板路径</span>
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
  import { mapGetters, mapActions } from 'vuex'
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      params: {}
    },
    data () {
      return {
        editedParams: {
          templateName: '',
          templatePath: '',
          templateContent: '',
          templateType: ''
        },
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
    methods: {
      saveAdd () {
        let self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            Api.TemplateManage.create(self.editedParams).then((data) => {
              self.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  /** yanggang 2017/12/5 关闭弹出层 */
                  $('#js_add_modal div.modal-header > button[aria-label="Close"]').trigger('click')
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
      reset () {
        Object.assign(this.$data, this.$options.data())
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
    },
    computed: {
      editCodemirror() {
        return this.$refs.editCodemirror.codemirror
      },
      ...mapGetters({
        templateTypeEnums: 'templateTypeEnums'
      })
    }
  }
</script>

<style>

</style>
