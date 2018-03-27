<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">编辑</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label"><b style="color: #ff0016">*</b>企业名称：</label>
                <div class="col-sm-10">
                  <input type="text" v-model="enterpriseEdit.enterpriseName" name="enterpriseName" class="form-control"
                         v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }">
                  <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger">请输入企业名称</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label"><b style="color: #ff0016">*</b>企业类型</label>
                <div class="col-sm-10">
                  <select v-model="enterpriseEdit.enterpriseType" class="form-control" name="enterpriseType" v-validate="'required'" :class="{'is-danger':errors.has('enterpriseType')}">
                    <option selected value="">--请选择--</option>
                    <option v-for="option in enterpriseTypeEnum" :value="option.value">{{ option.name }}</option>
                  </select>
                  <span v-show="errors.firstByRule('enterpriseType', 'required')" class="help is-danger"><p style="color: #ff0016">请选择所属频道</p></span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">公司地址：</label>
                <div class="col-sm-10">
                  <input class="form-control" placeholder="请输入企业地址" v-model="enterpriseEdit.address" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">公司地址坐标：</label>
                <div class="col-sm-5">
                  <input class="form-control" placeholder="经度" v-model="enterpriseEdit.longitude" readonly/>
                </div>
                <div class="col-sm-5">
                  <input class="form-control" placeholder="维度" v-model="enterpriseEdit.latitude" readonly/>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">   </label>
                <div class="col-sm-10 amap-wrapper" style="width: 715px;height: 300px;border: 1px solid #ccc;border-radius:4px;float: right;margin-right: 19px;padding:0px; ">
                  <el-amap
                    vid="amap-3"
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
                  <img :src="enterpriseEdit.logo" height="200" width="200">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">请上传企业logo：</label>
                <div class="col-sm-10 choose-personnel">
                  <input type="file" @change="onFileChangeLogoBE">
                  <span>（支持jpg，png格式图片，图片不大于20kB）</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">企业介绍：</label>
                <div class="col-sm-10">
                  <vue-editor id="editEditor" v-model="enterpriseEdit.introduce" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
                </div>
              </div>
            </form>
      </template>
    <template slot="modalFooter">
              <div class="modal-footer">
                <button type="button" class="btn btn-reset" @click="reset">重置</button>
                <button type="button" class="btn btn-search" @click="saveEdit">确定</button>
              </div>
    </template>
  </ipt-modal>
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
      params:{},
      editRecord: {},
      enterpriseTypeEnum: {}
    },
    data: function () {
      let self = this
      return {
        enterpriseEdit: {
          enterpriseType: '',
          logo: ''
        },
        showRecord: {},
        point: {},
        markers: [],
        zoom: 10,
        center: [106.226806, 38.492294],
        events: {
          click(e) {
            self.enterpriseEdit.longitude = e.lnglat.lng
            self.enterpriseEdit.latitude = e.lnglat.lat
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
    mounted: function () {
    },
    watch: {
      editRecord() {
        Object.assign(this.enterpriseEdit, this.editRecord)
        console.log(this.editRecord)
        this.enterpriseEdit.awardEnterpriseId = null
        this.enterpriseEdit.createTime = null
        this.point = {lng: this.editRecord.longitude, lat: this.editRecord.latitude}
        this.addMarker(this.point)
      }
    },
    methods: {
      init: function () {
      },
      handleImageAdded: function(file, Editor, cursorLocation) {
        Api.Common.handleImageAdded(file, Editor, cursorLocation)
      },
      onFileChangeLogoBE: function(e) {
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
            that.enterpriseEdit.logo = data.data.filepath
          }
          console.log(that.enterpriseEdit)
        })
      },
      saveEdit: function () {
        var that = this
        /** 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.BackEnterprise.updateBackEnterprise(that.editRecord.awardEnterpriseId, that.enterpriseEdit).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  $('#backEnterpriseEdit div.modal-header > button[aria-label="Close"]').trigger('click')
                }
              })
              /** 2017/12/4 更新表格分页数据 */
              that.getBackEnterpriseTableData(that.params)
            })
            return
          }
          alert('Oh NO!')
        })
      },
      reset() {
        Object.assign(this.enterpriseEdit, this.editRecord)
        this.addMarker(this.point)
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

