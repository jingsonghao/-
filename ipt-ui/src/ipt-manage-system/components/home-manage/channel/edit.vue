<template>
  <ipt-modal @close="reset">
    <span slot="modalTitle">修改</span>
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">栏目名称</label>
          <div class="col-sm-7">
            <input v-model="editedParams.channelName" type="text" class="form-control" placeholder=""
                   v-validate="'required'" name="channelName" :class="{'is-danger': errors.has('channelName') }">
            <span v-show="errors.firstByRule('channelName', 'required')" class="help is-danger">请填写栏目名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">栏目描述</label>
          <div class="col-sm-7">
            <textarea v-model="editedParams.channelDescription" type="text" class="form-control" placeholder=""
                      v-validate="'required'" name="channelDescription" style="resize: vertical" rows="3"
                      :class="{'is-danger': errors.has('channelDescription') }"></textarea>
            <span v-show="errors.firstByRule('channelDescription', 'required')" class="help is-danger">请填写栏目描述</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">栏目路径</label>
          <div class="col-sm-7">
            <input v-model="editedParams.channelPath" type="text" class="form-control" placeholder=""
                   v-validate="'required'" name="channelPath" :class="{'is-danger': errors.has('channelPath') }">
            <span v-show="errors.firstByRule('channelPath', 'required')" class="help is-danger">请填写栏目路径</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">栏目类型</label>
          <div class="col-sm-7">
            <el-select v-model="editedParams.channelType" name="channelType" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('channelType') }">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in channelTypeEnums"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('channelType', 'required')" class="help is-danger">请选择栏目类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">内容模板</label>
          <div class="col-sm-7">
            <el-select v-model="editedParams.contentTemplateId" name="contentTemplateId" filterable placeholder="请选择">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in allTemplateData.data"
                :key="item.templateId"
                :label="item.templateName"
                :value="item.templateId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">列表模板</label>
          <div class="col-sm-7">
            <el-select v-model="editedParams.listTemplateId" name="listTemplateId" filterable placeholder="请选择">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in allTemplateData.data"
                :key="item.templateId"
                :label="item.templateName"
                :value="item.templateId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">首页导航</label>
          <div class="col-sm-7">
            <el-checkbox v-model="editedParams.isMenu" true-label="0" false-label="1">首页导航</el-checkbox>
          </div>
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
      params: {},
      singleData: {}
    },
    data () {
      return {
        editedParams: {}
      }
    },
    watch: {
      singleData() {
        this.editedParams = JSON.parse(JSON.stringify(this.singleData))
        this.editedParams.isMenu = this.editedParams.isMenu + ''
        this.editedParams.channelType = this.editedParams.channelType + ''
      }
    },
    methods: {
      saveAdd() {
        let self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            Api.ChannelManage.update(self.editedParams.channelId, self.editedParams).then((data) => {
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
              self.getChannelManageTableData(this.params)
            })
          }
        })
      },
      reset() {
        this.editedParams = JSON.parse(JSON.stringify(this.singleData))
        this.$validator.reset()
      },
      ...mapActions({
        getChannelManageTableData: 'getChannelManageTableData'
      })
    },
    computed: mapGetters({
      allTemplateData: 'templateManageTableData',
      templateTypeEnums: 'templateTypeEnums',
      channelContentTypeEnums: 'channelContentTypeEnums',
      channelStateEnums: 'channelStateEnums',
      channelTypeEnums: 'channelTypeEnums',
      isMenuEnums: 'isMenuEnums'
    })
  }
</script>
