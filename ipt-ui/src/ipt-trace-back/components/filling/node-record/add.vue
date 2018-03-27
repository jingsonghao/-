<template>
  <ipt-modal @close="close" ref="iptModel">
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">添加企业备案</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">企业名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.enterpriseName" name="enterpriseName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }">
            <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger">请填写企业名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">企业类型</label>
          <div class="col-sm-7">
            <el-select v-model="nodeRecord.enterpriseType" name="enterpriseType" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('enterpriseType') }">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in enterpriseTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('enterpriseType', 'required')" class="help is-danger">请填写企业类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营范围</label>
          <div class="col-sm-7">
            <el-checkbox-group v-model="businessTypeList">
              <el-checkbox
                v-for="item in businessTypes"
                :key="item.value"
                :label="item.value">
                {{item.name}}
              </el-checkbox>
            </el-checkbox-group>
            <span v-show="errors.firstByRule('businessType', 'required')" class="help is-danger">请填写经营范围</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">流通节点类型</label>
          <div class="col-sm-7">
            <el-checkbox-group v-model="nodeTypeNoList">
              <el-checkbox
                v-for="item in nodeTypes"
                :key="item.value"
                :label="item.nodeTypeNo">
                {{item.nodeTypeName}}
              </el-checkbox>
            </el-checkbox-group>
            <span v-show="errors.firstByRule('businessType', 'required')" class="help is-danger">请填写流通节点类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">备案日期</label>
          <div class="col-sm-7">
            <el-date-picker v-model="nodeRecord.recordDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            v-validate="'required'"
                            :class="{'is-danger': errors.has('recordDate') }">
            </el-date-picker>
            <span v-show="errors.firstByRule('recordDate', 'required')" class="help is-danger">请填写备案日期</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">城市编码</label>
          <div class="col-sm-7">
            <el-select v-model="nodeRecord.cityCode" name="cityCode" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('cityCode') }">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in regionParentList"
                :key="item.regionNo"
                :label="item.regionName"
                :value="item.regionNo">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('cityCode', 'required')" class="help is-danger">请填写城市编码</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">所属地区编码</label>
          <div class="col-sm-7">
            <el-select v-model="nodeRecord.areaCode" name="areaCode" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('areaCode') }">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in areaList"
                :key="item.regionNo"
                :label="item.regionName"
                :value="item.regionNo">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('areaCode', 'required')" class="help is-danger">请填写所属地区编码</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营地址</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.address" name="address" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('address') }">
            <span v-show="errors.firstByRule('address', 'required')" class="help is-danger">请填写经营地址</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">法人代表名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.legalRepresent" name="legalRepresent" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('legalRepresent') }">
            <span v-show="errors.firstByRule('legalRepresent', 'required')" class="help is-danger">请填写法人代表名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">法人身份证号码</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.legalId" name="legalId" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('legalId') }">
            <span v-show="errors.firstByRule('legalId', 'required')" class="help is-danger">请填写法人身份证号码</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">法人责任主体类型</label>
          <div class="col-sm-7">
            <el-select v-model="nodeRecord.legalType" name="legalType" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('legalType') }">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in legalTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('legalType', 'required')" class="help is-danger">请填写法人责任主体类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">统一社会信用代码</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.socialCreditCode" name="socialCreditCode" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('socialCreditCode') }">
            <span v-show="errors.firstByRule('socialCreditCode', 'required')" class="help is-danger">请填写统一社会信用代码</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">注册日期</label>
          <div class="col-sm-7">
            <el-date-picker v-model="nodeRecord.issuingDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            v-validate="'required'"
                            :class="{'is-danger': errors.has('issuingDate') }">
            </el-date-picker>
            <span v-show="errors.firstByRule('issuingDate', 'required')" class="help is-danger">请填写注册日期</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">证照有效期至</label>
          <div class="col-sm-7">
            <el-date-picker v-model="nodeRecord.termOfValidity"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            v-validate="'required'"
                            :class="{'is-danger': errors.has('termOfValidity') }">
            </el-date-picker>
            <span v-show="errors.firstByRule('termOfValidity', 'required')" class="help is-danger">请填写证照有效期</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系人</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.contacts" name="contacts" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('contacts') }">
            <span v-show="errors.firstByRule('contacts', 'required')" class="help is-danger">请填写联系人</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系电话</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.telephone" name="telephone" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('telephone') }">
            <span v-show="errors.firstByRule('telephone', 'required')" class="help is-danger">请填写联系电话</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">传真</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.fax" name="fax" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('fax') }">
            <span v-show="errors.firstByRule('fax', 'required')" class="help is-danger">请填写传真</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营地址GPS经度</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.longitude" name="longitude" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('longitude') }" disabled>
            <span v-show="errors.firstByRule('longitude', 'required')" class="help is-danger">请填写经营地址GPS经度</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营地址GPS纬度</label>
          <div class="col-sm-7">
            <input type="text" v-model="nodeRecord.latitude" name="latitude" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('latitude') }" disabled>
            <span v-show="errors.firstByRule('latitude', 'required')" class="help is-danger">请填写经营地址GPS纬度</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3"></label>
          <div class="col-sm-7 amap-wrapper amap-page-container">
            <!-- https://elemefe.github.io/vue-amap/#/zh-cn/examples/base/amap -->
            <el-amap
              vid="amap-fnra1"
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
  import {mapGetters, mapActions} from 'vuex'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-trace-back/api'
  import BaseApi from '@/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"
  import Utils from "@/utils"

  export default {
    components: {
      IptModal
    },
    props: {
      params: {}
    },
    data() {
      let self = this
      return {
        businessTypeList: [],
        nodeTypeNoList: [],
        nodeRecord: {},
        areaList: [],
        markers: [],
        zoom: 10,
        center: [106.226806, 38.492294],
        events: {
          click(e) {
            self.nodeRecord.longitude = e.lnglat.lng
            self.nodeRecord.latitude = e.lnglat.lat
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
    watch: {
      'nodeRecord.cityCode': {
        handler: function (curVal, oldVal) {
          if (curVal === oldVal) {
            return
          }
          let this_ = this
          Object.assign(this_.areaList, {})
          this_.nodeRecord.areaCode = ''
          BaseApi.EnumType.findByParentIdList({parentRegionId: curVal}).then(function (data) {
            Object.assign(this_.areaList, data.data)
          })
        },
        deep: true
      },
      'nodeRecord.nodeTypeNos': {
        handler: function (curVal, oldVal) {
          if (curVal === oldVal) {
            return
          }
          if (!curVal) {
            this.nodeTypeNoList = []
            return
          }
          this.nodeTypeNoList = curVal.split(',')
        },
        deep: true
      },
      'nodeTypeNoList': {
        handler: function (curVal, oldVal) {
          if (curVal === oldVal) {
            return
          }
          if (curVal.length === 0) {
            this.nodeRecord.nodeTypeNos = ''
            return
          }
          this.nodeRecord.nodeTypeNos = curVal.join(',')
        },
        deep: true
      },
      'nodeRecord.businessTypes': {
        handler: function (curVal, oldVal) {
          if (curVal === oldVal) {
            return
          }
          if (!curVal) {
            this.businessTypeList = []
            return
          }
          this.businessTypeList = curVal.split(',')
        },
        deep: true
      },
      'businessTypeList': {
        handler: function (curVal, oldVal) {
          if (curVal === oldVal) {
            return
          }
          if (curVal.length === 0) {
            this.nodeTypeNoList = []
            this.nodeRecord.businessTypes = ''
            this.getNodeTypes({ businessTypes: this.nodeRecord.businessTypes })
            return
          }
          this.nodeTypeNoList = []
          this.nodeRecord.businessTypes = curVal.join(',')
          this.getNodeTypes({ businessTypes: this.nodeRecord.businessTypes })
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
            Api.NodeRecord.create(that.nodeRecord).then((data) => {
              that.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.close()
                }
              })
              /** yanggang 2017/12/4 更新表格分页数据 */
              that.getNodeRecordList(this.params)
            })
            return
          }
          this.$alert('Oh NO!')
        })
      },
      close () {
        $(this.$el).find('div.modal-header > button[aria-label="Close"]').trigger('click')
        this.reset()
        this.$validator.reset()
      },
      reset() {
        Object.assign(this.$data.nodeRecord, this.$options.data().nodeRecord)
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
        getNodeTypes: 'getNodeTypes',
        getNodeRecordList: 'getNodeRecordList'
      })
    },
    computed: mapGetters({
      businessTypes: 'businessTypes',
      enterpriseTypes: 'enterpriseTypes',
      nodeTypes: 'nodeTypes',
      legalTypes: 'legalTypes',
      regionParentList: 'regionParentList'
    })
  }
</script>
<style>
  .el-vue-amap-container {
    height: 300px !important;
  }
</style>
