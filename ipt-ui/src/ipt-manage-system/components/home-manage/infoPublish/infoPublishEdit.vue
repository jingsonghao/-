<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">编辑</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">所属频道</label>
          <div class="col-sm-10">
            <select v-model="editRecord.channel" name="channel" class="form-control" v-validate="'required'" :class="{'is-danger':errors.has('channel') }">
              <option value="">--请选择--</option>
              <option v-for="option in newsEnums.channel" :value="option.value">{{ option.name }}</option>
            </select>
            <span v-show="errors.has('channel')" class="help is-danger">请选择所属频道</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">新闻标题</label>
          <div class="col-sm-10">
            <input type="text" v-model="editRecord.title" name="title" class="form-control" v-validate="'required'" :class="{'is-danger':errors.has('title') }">
            <span v-show="errors.has('title')" class="help is-danger">请填写新闻标题</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">是否置顶</label>
          <div class="col-sm-10">
            <select class="form-control" v-model="editRecord.isTop" name="isTop" :class="{'is-danger':errors.has('isTop') }">
              <option value="">--请选择--</option>
              <option v-for="option in newsEnums.isTop" :value="option.value">{{ option.name }}</option>
            </select>
            <span v-show="errors.has('isTop')" class="help is-danger">请选择是否置顶</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">新闻内容</label>
          <div class="col-sm-10">
            <!--富文本编辑器-->
            <div class="summernote">
              <vue-editor id="editEditor" v-model="editRecord.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
            </div>
            <!--富文本编辑器 end-->
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">上传图片</label>
          <div class="col-sm-10">
            <input type="file" @change="onFileChange" style="margin-bottom: 10px;">
            <span>（支持jpg，png格式图片，图片不大于500kB）</span>
            <img :src="editRecord.image" style="width:170px;margin-top:-21px;float:right;margin-right:123px;height:120px;display: inline-block;padding:5px;border: 1px solid #ccc;">
            <input type="hidden" readonly v-model="editRecord.image" class="form-control" name="image">
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
  import Api from '@/ipt-manage-system/api'
  import CommonApi from '@/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"
  import { VueEditor } from 'vue2-editor'
  import axios from 'axios'

  export default {
    components: {
      IptModal, VueEditor
    },
    data: function () {
      return {
        editRecord: {},
        file: {}
      }
    },
    props: ['newsEnums', 'record'],
    watch: {
      record() {
        this.editRecord = JSON.parse(JSON.stringify(this.record))
      }
    },
    methods: {
      create() {
        var that = this
        that.$validator.validateAll().then((result) => {
          if (result) {
            if (typeof that.file.name === 'undefined') {
              that.saveObj()
            } else {
              that.uploadFile()
            }
          }
        })
      },
      handleImageAdded: function(file, Editor, cursorLocation) {
        CommonApi.Common.handleImageAdded(file, Editor, cursorLocation)
      },
      onFileChange: function(e) {
        var that = this
        var files = e.target.files || e.dataTransfer.files
        var file = files[0]
        var filename = file.name
        var mime = filename.toLowerCase().substr(filename.lastIndexOf("."))
        if (mime !== ".jpg" && mime !== ".jpeg" && mime !== ".png") {
          that.$alert('请选择图片文件!')
          return
        }
        var imagSize = file.size
        if (imagSize > 500 * 1024) {
          that.$alert("请选择500k以下图片文件")
          return
        }
        var r = new FileReader()
        r.readAsDataURL(file)
        $(r).load(function() {
          that.editRecord.image = this.result
        })
        that.file = file
      },
      saveObj() {
        let that = this
        delete that.editRecord.reviewUser
        delete that.editRecord.createUser
        Api.InfoPublish.updateInfoPublish(that.editRecord.newsId, that.editRecord).then((data) => {
          that.$alert(data.msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
            /** yanggang 2017/12/5 关闭弹出层 */
            $('#js_edit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
            }
          })
          /**gaoj 2017/12/4 更新表格分页数据 */
          that.$emit('complete')
        })
      },
      uploadFile() {
        let that = this
        let formData = new FormData()
        formData.append('file', that.file)
        formData.append('root', 'news')
        axios.post('/fileupload/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function(response) {
          let data = response.data
          if (response.status === 200 && data && data.status === 200) {
            that.editRecord.image = data.data.filepath
            that.saveObj()
          }
        })
      },

      reset() {
        this.editRecord = JSON.parse(JSON.stringify(this.record))
      },
    /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getInfoPublishTableData: 'getInfoPublishTableData'
      })
  }
  }
</script>
<style>
  #editEditor {
    height: 350px;
  }
</style>
