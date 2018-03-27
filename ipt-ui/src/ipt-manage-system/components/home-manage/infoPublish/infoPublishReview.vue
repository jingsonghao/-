<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">审核</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">所属频道</label>
          <div class="col-sm-10">
            {{editRecord.channelName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">新闻标题</label>
          <div class="col-sm-10">
            {{editRecord.title}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">添加时间</label>
          <div class="col-sm-10">
            {{editRecord.createTime}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">是否置顶</label>
          <div class="col-sm-10">
            {{editRecord.isTopName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">新闻内容</label>
          <div class="col-sm-10" v-html="editRecord.content" >
          </div>
        </div>
        <div class="form-group" v-show="imgShow">
          <label class="col-sm-2 control-label">上传图片</label>
          <div class="col-sm-10">
            <img :src="editRecord.image" height="120" width="170">
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label">审核结果</label>
          <div class="col-sm-10">
            <select v-model="editRecord.reviewStatus" name="reviewStatus" class="form-control" v-validate="'required'" :class="{'is-danger':errors.has('reviewStatus') }" @change="change">
              <option v-if="option.value != 0" v-for="option in newsEnums.reviewStatus" readonly :value="option.value">{{ option.name }}</option>
            </select>
            <span v-show="errors.has('reviewStatus')" class="help is-danger">请选择审核结果</span>
          </div>
        </div>
        <div class="form-group"v-show="reasonShow">
          <label class="col-sm-2 control-label">未通过原因</label>
          <div class="col-sm-10">
            <textarea cols="80" rows="5" v-model="editRecord.notPassRe" :class="{'is-danger':errors.has('notPassReason') }"></textarea>
            <span v-show="errors.has('content')" class="help is-danger">请填写未通过原因</span>
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
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    data: function () {
      return {
        editRecord: {},
        imgShow: true,
        reasonShow: false
      }
    },
    props: ['newsEnums', 'record'],
    watch: {
      record() {
        this.editRecord = JSON.parse(JSON.stringify(this.record))
      },
      "editRecord.image": {
        handler: function (val, oldVal) {
          if (val === null || val === '') {
            this.imgShow = false
          } else {
            this.imgShow = true
          }
        },
        deep: true
      }
    },
    methods: {
      create() {
        var that = this
        /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            delete that.editRecord.reviewUser
            delete that.editRecord.createUser
            Api.InfoPublish.approvalInfoPublish(that.editRecord.newsId, that.editRecord).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  $('#js_review_modal div.modal-header > button[aria-label="Close"]').trigger('click')
                }
              })
              this.$emit('complete')
            })
          }
        })
      },
      change(e) {
        if (e.target.value === "2") {
          this.reasonShow = true
        } else {
          this.reasonShow = false
        }
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
