<template>
  <ipt-modal @close="close" ref="iptModel">
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">添加</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">城市编码</label>
          <div class="col-sm-7">
            <el-select v-model="businessesRecord.cityCode" name="cityCode" filterable placeholder="请选择城市编码"
                       v-validate="'required'" :class="{'is-danger': errors.has('cityCode') }">
              <el-option key="" label="请选择城市编码" value=""></el-option>
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
          <label class="col-sm-3 control-label">自然人责任主体名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="businessesRecord.bizName" name="bizName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('bizName') }">
            <span v-show="errors.firstByRule('bizName', 'required')" class="help is-danger">请填写自然人责任主体名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营者性质代码</label>
          <div class="col-sm-7">
            <el-select v-model="businessesRecord.property" name="property" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('property') }">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in properties"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('property', 'required')" class="help is-danger">请填写经营者性质代码</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">备案日期</label>
          <div class="col-sm-7">
            <el-date-picker v-model="businessesRecord.recordDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-validate="'required'"
                            :class="{'is-danger': errors.has('recordDate') }">
            </el-date-picker>
            <span v-show="errors.firstByRule('recordDate', 'required')" class="help is-danger">请填写备案日期</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">所属地区编码</label>
          <div class="col-sm-7">
            <el-select v-model="businessesRecord.areaCode" name="areaCode" filterable placeholder="请选择"
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
          <label class="col-sm-3 control-label">所属企业</label>
          <div class="col-sm-7">
            <el-select v-model="businessesRecord.recordEnterpriseNo" name="recordEnterpriseNo" filterable placeholder="请选择"
                       v-validate="'required'" :class="{'is-danger': errors.has('recordEnterpriseNo') }">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in enterprisesList"
                :key="item.enterpriseNo"
                :label="item.enterpriseName"
                :value="item.enterpriseNo">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('recordEnterpriseNo', 'required')" class="help is-danger">请选择所属企业</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系人</label>
          <div class="col-sm-7">
            <input type="text" v-model="businessesRecord.contacts" name="contacts" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('contacts') }">
            <span v-show="errors.firstByRule('contacts', 'required')" class="help is-danger">请填写联系人</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系电话</label>
          <div class="col-sm-7">
            <input type="text" v-model="businessesRecord.tel" name="tel" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('tel') }">
            <span v-show="errors.firstByRule('tel', 'required')" class="help is-danger">请填写联系电话</span>
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
  import { mapGetters, mapActions } from 'vuex'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-trace-back/api'
  import BaseApi from '@/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from '@/components/common/modal'

  export default {
    components: {
      IptModal
    },
    props: {
      businessBaseInfoId: '',
      params: {}
    },
    data () {
      return {
        enterprisesList: {},
        businessesRecord: {},
        areaList: []
      }
    },
    watch: {
      'businessesRecord.cityCode': {
        handler: function (curVal, oldVal) {
          if (curVal === oldVal) {
            return
          }
          let this_ = this
          Object.assign(this_.areaList, {})
          this_.businessesRecord.areaCode = ''
          BaseApi.EnumType.findByParentIdList({parentRegionId: curVal}).then(function (data) {
            Object.assign(this_.areaList, data.data)
          })
        },
        deep: true
      },
      businessBaseInfoId (curVal) {
        if (!curVal) {
          return
        }
        let this_ = this
        Api.BusinessesRecord.getOne(curVal).then((data) => {
          if (data.status !== 200) {
            this.businessBaseInfoId = ''
            this.businessesRecord = {}
            this_.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.close()
              }
            })
            return
          }
          this.businessesRecord = data.data
        })
      }
    },

    methods: {
      create () {
        var that = this
        /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.BusinessesRecord.update(that.businessBaseInfoId, that.businessesRecord).then((data) => {
              that.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.close()
                }
              })
              /** yanggang 2017/12/4 更新表格分页数据 */
              that.getBusinessesRecordList(this.params)
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
      reset () {
        Object.assign(this.$data.businessesRecord, this.$options.data().businessesRecord)
      },
      ...mapActions({
        getBusinessesRecordList: 'getBusinessesRecordList'
      })
    },
    computed: mapGetters({
      properties: 'properties',
      regionParentList: 'regionParentList'
    }),
    mounted () {
      let this_ = this
      Api.EnterpriseInfo.findEnterprisesList().then((data) => {
        Object.assign(this_.enterprisesList, data.data)
      })
    }
  }
</script>
<style>
  .el-vue-amap-container {
    height: 300px !important;
  }
</style>
