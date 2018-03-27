<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">编辑</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label"><b style="color: #ff0016">*</b>企业名称：</label>
          <div class="col-sm-7">
            <input type="text" v-model="editLinksRecord.enterpriseName" name="enterpriseName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }">
            <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger">请填写企业名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label"><b style="color: #ff0016">*</b>企业网址：</label>
          <div class="col-sm-7">
            <input type="text" v-model="editLinksRecord.enterpriseUrl" name="enterpriseUrl" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('enterpriseUrl') }">
            <span v-show="errors.firstByRule('enterpriseUrl', 'required')" class="help is-danger">请填写企业网址</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">logo：</label>
          <div class="col-sm-7">
            <img :src="editLinksRecord.logo" height="200" width="200">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">修改企业logo：</label>
          <div class="col-sm-7 choose-personnel">
            <input type="file" id="edit_logo">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">二维码：</label>
          <div class="col-sm-7">
            <img :src="editLinksRecord.qrCode" height="200" width="200">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">修改企业二维码：</label>
          <div class="col-sm-7 choose-personnel">
            <input type="file" id="edit_qrCode">
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
        editLinksRecord: {}
      }
    },
    props: {
      params: {},
      linksRecord: {}
    },
    watch: {
      linksRecord() {
        this.editLinksRecord = JSON.parse(JSON.stringify(this.linksRecord))
        console.log(this.editLinksRecord)
      }
    },
    mounted: function () {
      var that = this
      $('#edit_logo').change(function (e) {
        e.preventDefault()
        let formData = new FormData()
        var file = $("#edit_logo")[0].files[0]
        var fileSize = file.size
        if (fileSize > 40 * 1024) {
          alert("照片应小于40K")
          return
        }
        // 文件数据，参数："file"
        formData.append('file', file)
        formData.append('root', 'test')
        $.ajax({
          type: 'post',
          url: '/fileupload/api/files/upload',
          contentType: false,
          processData: false,
          data: formData,
          dataType: 'text',
          success: function(data) {
            let json = JSON.parse(data)
            that.editLinksRecord.logo = json['data']['filepath']
            console.log(json['data']['filepath'])
          }
        })
      })
      $('#edit_qrCode').change(function (e) {
        e.preventDefault()
        let formData = new FormData()
        var file = $("#edit_qrCode")[0].files[0]
        var fileSize = file.size
        if (fileSize > 40 * 1024) {
          alert("照片应小于40K")
          return
        }
        // 文件数据，参数："file"
        formData.append('file', file)
        formData.append('root', 'test')
        $.ajax({
          type: 'post',
          url: '/fileupload/api/files/upload',
          contentType: false,
          processData: false,
          data: formData,
          dataType: 'text',
          success: function(data) {
            let json = JSON.parse(data)
            that.editLinksRecord.qrCode = json['data']['filepath']
            console.log(json['data']['filepath'])
          }
        })
      })
    },
    methods: {
      create() {
        var that = this
        /** 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            that.editLinksRecord.createTime = null
            Api.EcommerceLinks.updateECommerceLink(that.linksRecord.ecommerceLinkId, that.editLinksRecord).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  $('#ecommerceLinksEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                }
              })
              /** 2017/12/4 更新表格分页数据 */
              that.getEcommerceLinksTableData(that.params)
            })
            return
          }
          this.$alert('Oh NO!')
        })
      },
      reset() {
        var file = $('#edit_qrCode')
        file.after(file.clone().val(""))
        file.remove()
        var fileLogo = $('#edit_logo')
        fileLogo.after(fileLogo.clone().val(""))
        fileLogo.remove()
        Object.assign(this.editLinksRecord, this.linksRecord)
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getEcommerceLinksTableData: 'getEcommerceLinksTableData'
      })
    }
  }
</script>
