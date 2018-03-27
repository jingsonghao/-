<template>
  <ipt-modal @close="close" ref="iptModel">
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">添加</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">请选择所属企业名称</label>
          <div class="col-sm-7">
            <el-select v-model="storeRecord.enterpriseNo" name="enterpriseNo" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }"
                       @change="storeRecord.nodeTypeNo = ''">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in enterprisesList"
                :key="item.enterpriseNo"
                :label="item.enterpriseName"
                :value="item.enterpriseNo">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger">请填写所属企业名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">请选择所属节点类型</label>
          <div class="col-sm-7">
            <el-select v-model="storeRecord.nodeTypeNo" name="nodeTypeNo" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('nodeTypeNo') }">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in availableNodeTypes"
                :key="item.nodeTypeNo"
                :label="item.nodeTypeName"
                :value="item.nodeTypeNo">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('nodeTypeNo', 'required')" class="help is-danger">请填写所属节点类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">城市编码</label>
          <div class="col-sm-7">
            <el-select v-model="storeRecord.cityCode" name="cityCode" filterable placeholder="请选择"
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
          <label class="col-sm-3 control-label">经营主体（门店）名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="storeRecord.storeName" name="storeName" class="form-control"
                   :class="{'is-danger': errors.has('storeName') }">
            <span v-show="errors.firstByRule('storeName', 'required')" class="help is-danger">请填写经营主体（门店）名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营主体顺序码</label>
          <div class="col-sm-7">
            <input type="text" v-model="storeRecord.storeNo" name="storeNo" class="form-control"
                   :class="{'is-danger': errors.has('storeNo') }">
            <span v-show="errors.firstByRule('storeNo', 'required')" class="help is-danger">请填写经营主体顺序码</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营地址</label>
          <div class="col-sm-7">
            <input type="text" v-model="storeRecord.address" name="address" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('address') }">
            <span v-show="errors.firstByRule('address', 'required')" class="help is-danger">请填写经营地址</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">所属地区编码</label>
          <div class="col-sm-7">
            <el-select v-model="storeRecord.areaCode" name="areaCode" filterable placeholder="请选择"
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
          <label class="col-sm-3 control-label">证照有效期至</label>
          <div class="col-sm-7">
            <el-date-picker v-model="storeRecord.termOfValidity"
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
          <label class="col-sm-3 control-label">备案日期</label>
          <div class="col-sm-7">
            <el-date-picker v-model="storeRecord.recordDate"
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
          <label class="col-sm-3 control-label">注册日期</label>
          <div class="col-sm-7">
            <el-date-picker v-model="storeRecord.issuingDate"
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
          <label class="col-sm-3 control-label">联系人</label>
          <div class="col-sm-7">
            <input type="text" v-model="storeRecord.contacts" name="contacts" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('contacts') }">
            <span v-show="errors.firstByRule('contacts', 'required')" class="help is-danger">请填写联系人</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系电话</label>
          <div class="col-sm-7">
            <input type="text" v-model="storeRecord.telephone" name="telephone" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('telephone') }">
            <span v-show="errors.firstByRule('telephone', 'required')" class="help is-danger">请填写联系电话</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">传真</label>
          <div class="col-sm-7">
            <input type="text" v-model="storeRecord.fax" name="fax" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('fax') }">
            <span v-show="errors.firstByRule('fax', 'required')" class="help is-danger">请填写传真</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营地址GPS经度</label>
          <div class="col-sm-7">
            <input type="text" v-model="storeRecord.longitude" name="longitude" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('longitude') }" disabled>
            <span v-show="errors.firstByRule('longitude', 'required')" class="help is-danger">请填写经营地址GPS经度</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营地址GPS纬度</label>
          <div class="col-sm-7">
            <input type="text" v-model="storeRecord.latitude" name="latitude" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('latitude') }" disabled>
            <span v-show="errors.firstByRule('latitude', 'required')" class="help is-danger">请填写经营地址GPS纬度</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3"></label>
          <div class="col-sm-7 amap-wrapper amap-page-container">
            <!-- https://elemefe.github.io/vue-amap/#/zh-cn/examples/base/amap -->
            <el-amap
              vid="amap-fsr2"
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
      storeId: '',
      params: {}
    },
    data() {
      let self = this
      return {
        enterprisesList: {},
        businessTypeList: [],
        nodeTypeNoList: [],
        storeRecord: {},
        areaList: [],
        markers: [],
        zoom: 10,
        center: [106.226806, 38.492294],
        events: {
          click(e) {
            self.storeRecord.longitude = e.lnglat.lng
            self.storeRecord.latitude = e.lnglat.lat
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
      storeId (curVal) {
        if (!curVal) {
          return
        }
        let this_ = this
        Api.StoreRecord.getOne(curVal).then((data) => {
          if (data.status !== 200) {
            this.enterpriseId = ''
            this.storeRecord = {}
            this_.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.close()
              }
            })
            return
          }
          this.storeRecord = data.data
        })
      },
      'storeRecord.cityCode': {
        handler: function (curVal, oldVal) {
          if (curVal === oldVal) {
            return
          }
          let this_ = this
          Object.assign(this_.areaList, {})
          this_.storeRecord.areaCode = ''
          BaseApi.EnumType.findByParentIdList({parentRegionId: curVal}).then(function (data) {
            Object.assign(this_.areaList, data.data)
          })
        },
        deep: true
      },
      'storeRecord.nodeTypeNos': {
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
            this.storeRecord.nodeTypeNos = ''
            return
          }
          this.storeRecord.nodeTypeNos = curVal.join(',')
        },
        deep: true
      },
      'storeRecord.businessTypes': {
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
            this.storeRecord.businessTypes = ''
            this.getNodeTypes({ businessTypes: this.storeRecord.businessTypes })
            return
          }
          this.nodeTypeNoList = []
          this.storeRecord.businessTypes = curVal.join(',')
          this.getNodeTypes({ businessTypes: this.storeRecord.businessTypes })
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
            Api.StoreRecord.update(that.storeId, that.storeRecord).then((data) => {
              that.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.close()
                }
              })
              /** yanggang 2017/12/4 更新表格分页数据 */
              that.getStoreRecordList(this.params)
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
        Object.assign(this.$data.storeRecord, this.$options.data().storeRecord)
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
        getStoreRecordList: 'getStoreRecordList'
      })
    },
    computed: {
      enterpriseNoData() {
        let result = {}
        this.enterprisesList.forEach(item => {
          result[item.enterpriseNo] = item
        })
        return result
      },
      availableNodeTypes() {
        if (!this.storeRecord || !this.storeRecord.enterpriseNo) {
          return this.nodeTypes
        }
        return this.nodeTypes.filter(item =>
          this.enterpriseNoData[this.storeRecord.enterpriseNo].nodeTypeNos.split(',').indexOf(item.nodeTypeNo) > -1
        )
      },
      ...mapGetters({
        nodeTypes: 'nodeTypes',
        regionParentList: 'regionParentList'
      })
    },
    mounted() {
      let this_ = this
      Api.EnterpriseInfo.findEnterprisesList().then((data) => {
        this_.enterprisesList = data.data
      })
    }
  }
</script>
<style>
  .el-vue-amap-container {
    height: 300px !important;
  }
</style>
