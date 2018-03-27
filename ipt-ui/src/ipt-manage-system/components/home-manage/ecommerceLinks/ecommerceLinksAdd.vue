<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">添加</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal" id="add-form">
        <div class="form-group">
          <label class="col-sm-2 control-label"><b style="color: #ff0016">*</b>企业名称：</label>
          <div class="col-sm-10 choose-personnel">
            <input type="text" v-model="params.enterpriseName" name="enterpriseName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }">
            <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger">请输入企业名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label"><b style="color: #ff0016">*</b>企业网址：</label>
          <div class="col-sm-10 choose-personnel">
            <input type="text" v-model="params.enterpriseUrl" name="enterpriseUrl" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('enterpriseUrl') }">
            <span v-show="errors.firstByRule('enterpriseUrl', 'required')" class="help is-danger">请输入企业网址</span>
          </div>
        </div>
        <div class="form-group" id="logoShow" >
          <label class="col-sm-2 control-label">logo：</label>
          <div class="col-sm-10 choose-personnel" >
            <img :src="params.logo" height="200" width="200">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">请上传企业logo：</label>
          <div class="col-sm-10 choose-personnel">
            <input type="file" @change="onFileChangeLogo">
            <span>（支持jpg，png格式图片，图片不大于20kB）</span>
          </div>
        </div>
        <div class="form-group" id="qrCode" >
          <label class="col-sm-2 control-label">二维码：</label>
          <div class="col-sm-10 choose-personnel" >
            <img :src="params.qrCode" height="200" width="200">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">上传企业二维码：</label>
          <div class="col-sm-10 choose-personnel">
            <input type="file" @change="onFileChangeQrCode">
            <div class="show-info">
              如何生成二维码？
              <p>请将企业官网地址输入任意二维码转换网站生成二维码上传至城市平台。参考二维码生成网址：https://cli.im/</p>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template slot="modalFooter">
      <button type="button" class="btn btn-reset" @click="reset">重置</button>
      <button type="button" class="btn btn-search" @click="saveAdd">确定</button>
    </template>
  </ipt-modal>
</template>
<script type="text/ecmascript-6">
  import Api from '@/ipt-manage-system/api'
  import {mapActions} from 'vuex'
  import IptModal from "@/components/common/modal"
  import $ from "jquery"
  import axios from 'axios'
  export default {
    components: {
      IptModal
    },
    props: {
      paramsParent:{}
    },
    data: function () {
      return {
        params: {
          enterpriseName: '',
          logo: '',
          qrCode: ''
        }
      }
    },
    methods: {
      init: function () {
      },
      onFileChangeLogo: function(e) {
        console.log(e)
        var files = e.target.files || e.dataTransfer.files
        var file = files[0]
        var filename = file.name
        var mime = filename.toLowerCase().substr(filename.lastIndexOf("."))
        if (mime !== ".jpg" && mime !== ".jpeg" && mime !== ".png") {
          this.$alert('请选择图片文件!')
          return
        }
        var imagSize = file.size
        if (imagSize > 40 * 1024) {
          this.$alert("请选择40k以下图片文件")
          return
        }
        let formData = new FormData()
        formData.append('file', file)
        formData.append('root', 'news')
        let that = this
        axios.post('/fileupload/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function(response) {
          let data = response.data
          if (response.status === 200 && data && data.status === 200) {
            that.params.logo = data.data.filepath
          }
        })
      },
      onFileChangeQrCode: function(e) {
        var files = e.target.files || e.dataTransfer.files
        var file = files[0]
        var filename = file.name
        var mime = filename.toLowerCase().substr(filename.lastIndexOf("."))
        if (mime !== ".jpg" && mime !== ".jpeg" && mime !== ".png") {
          this.$alert('请选择图片文件!')
          return
        }
        var imagSize = file.size
        if (imagSize > 40 * 1024) {
          this.$alert("请选择40k以下图片文件")
          return
        }
        let formData = new FormData()
        formData.append('file', file)
        formData.append('root', 'news')
        let that = this
        axios.post('/fileupload/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function(response) {
          let data = response.data
          if (response.status === 200 && data && data.status === 200) {
            that.params.qrCode = data.data.filepath
          }
        })
      },
      saveAdd: function () {
        var that = this
        /** 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            console.log(that.params)
            Api.EcommerceLinks.addEcommerceLinks(that.params).then((data) => {
              that.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  /**关闭弹出层 */
                  $('#ecommerceLinksAdd div.modal-header > button[aria-label="Close"]').trigger('click')
                  /**清空数据 */
                  this.reset()
                }
              })
              /** 更新表格分页数据 */
              that.getEcommerceLinksTableData(that.paramsParent)
            })
            return
          }
          alert('Oh NO!')
        })
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
        var file = $('#edit_qrCode')
        file.after(file.clone().val(""))
        file.remove()
        var fileLogo = $('#edit_logo')
        fileLogo.after(fileLogo.clone().val(""))
        fileLogo.remove()
      },
      ...mapActions({
        getEcommerceLinksTableData: 'getEcommerceLinksTableData'
      })
    }
  }
</script>
