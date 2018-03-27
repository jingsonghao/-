<template>
  <div class="modal fade" id="add-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title myModalLabel">追溯企业新增</h4>
        </div>
        <div class="modal-body row form-control-content">
          <div class="modal-left col-xs-12">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label"><b style="color: #ff0016">*</b>企业名称：</label>
                <div class="col-sm-10 choose-personnel">
                  <input type="text" v-model="backEnterpriseAdd.enterpriseName" name="enterpriseName" class="form-control"
                         v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }">
                  <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger"><p style="color: #ff0016">请输入企业名称</p></span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label"><b style="color: #ff0016">*</b>企业类型</label>
                <div class="col-sm-10">
                  <select v-model="backEnterpriseAdd.enterpriseType" class="form-control" name="enterpriseType" v-validate="'required'" :class="{'is-danger':errors.has('enterpriseType')}">
                    <option selected value="">--请选择--</option>
                    <option v-for="option in enterpriseTypeEnum" :value="option.value">{{ option.name }}</option>
                  </select>
                  <span v-show="errors.firstByRule('enterpriseType', 'required')" class="help is-danger"><p style="color: #ff0016">请选择所属频道</p></span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">公司地址：</label>
                <div class="col-sm-10">
                  <input class="form-control" placeholder="请输入企业地址" v-model="backEnterpriseAdd.address" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">公司地址坐标：</label>
                <div class="col-sm-5">
                  <input class="form-control" placeholder="经度" v-model="backEnterpriseAdd.longitude" readonly/>
                </div>
                <div class="col-sm-5">
                  <input class="form-control" placeholder="维度" v-model="backEnterpriseAdd.latitude" readonly/>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">   </label>
                <div class="col-sm-10 amap-wrapper" style="width: 715px;height: 300px;border: 1px solid #ccc;border-radius:4px;float: right;margin-right: 19px;padding:0px; ">
                  <el-amap
                    vid="amap-2"
                    :zoom="zoom"
                    :center="center"
                    :events="events"
                    class="amap-default">
                    <el-amap-marker
                      v-for="(marker, key) in markers"
                      :position="marker.position"
                      :events="marker.events"
                      :visible="marker.visible"
                      :draggable="marker.draggable"
                      :key="key"
                      :vid="key">
                    </el-amap-marker>
                  </el-amap>
                </div>
              </div>
              <div class="form-group" id="logoShow" >
                <label class="col-sm-2 control-label">logo：</label>
                <div class="col-sm-10 choose-personnel" >
                  <img :src="backEnterpriseAdd.logo" height="200" width="200">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">请上传企业logo：</label>
                <div class="col-sm-10 choose-personnel">
                  <input type="file" @change="onFileChangeLogoB">
                  <span>（支持jpg，png格式图片，图片不大于20kB）</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">企业介绍：</label>
                <div class="col-sm-10">
                  <div class="summernote">
                    <vue-editor id="addEditor" v-model="backEnterpriseAdd.introduce" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-reset" @click="reset">重置</button>
                <button type="button" class="btn btn-search" @click="saveAdd">确定</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Api from '@/ipt-manage-system/api'
  import {mapActions} from 'vuex'
  import IptModal from "@/components/common/modal"
  import $ from "jquery"
  import Utils from "@/utils"
  import axios from 'axios'
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      IptModal, VueEditor
    },
    props: {
      paramsParent:{},
      enterpriseTypeEnum: {}
    },
    data: function () {
      let self = this
      return {
        backEnterpriseAdd: {
          enterpriseType: '',
          enterpriseName: '',
          time: '',
          introduce: '',
          address: '',
          longitude: '',
          latitude: '',
          logo: ''
        },
        markers: [],
        zoom: 10,
        center: [106.226806, 38.492294],
        events: {
          click(e) {
            self.backEnterpriseAdd.longitude = e.lnglat.lng
            self.backEnterpriseAdd.latitude = e.lnglat.lat
            self.addMarker(e.lnglat)
            self.$nextTick()
          }
        },
        plugin: [
          {
            pName: 'Scale',
            events: {
              init(instance) {
                console.log(instance)
              }
            }
          },
          {
            pName: 'ToolBar',
            events: {
              init(instance) {
                console.log(instance)
              }
            }
          }
        ]
      }
    },
    created: function () {
      this.init()
    },
    methods: {
      init: function () {},
      handleImageAdded: function(file, Editor, cursorLocation) {
        Api.Common.handleImageAdded(file, Editor, cursorLocation)
      },
      onFileChangeLogoB: function(e) {
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
            that.backEnterpriseAdd.logo = data.data.filepath
          }
        })
      },
      saveAdd: function () {
        var that = this
        /** 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.BackEnterprise.addBackEnterprise(that.backEnterpriseAdd).then((data) => {
              that.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  /**关闭弹出层 */
                  $('#backEnterpriseAdd div.modal-header > button[aria-label="Close"]').trigger('click')
                  /**清空数据 */
                  this.reset()
                }
              })
              /** 更新表格分页数据 */
              that.getBackEnterpriseTableData(that.paramsParent)
            })
            return
          }
          alert('Oh NO!')
        })
      },
      reset() {
        Object.assign(this.$data.backEnterpriseAdd, this.$options.data().backEnterpriseAdd)
        this.removeMarker(this.marker)
      },
      addMarker(point) {
        let marker = {
          position: [point.lng, point.lat]
        }
        this.removeMarker()
        this.markers.push(marker)
      },
      removeMarker(marker) {
        if (marker) {
          Utils.ArrayUtil.remove(this.markers, marker)
        }
        if (!this.markers.length) {
          return
        }
        this.markers.splice(this.markers.length - 1, 1)
      },
      ...mapActions({
        getBackEnterpriseTableData: 'getBackEnterpriseTableData'
      })
    }
  }
</script>
<style>
  .map1{
    width: 860px;
    height: 500px;
  }
  .form-group .amap-wrapper .amap-default {
    padding: 0;
  }
</style>
