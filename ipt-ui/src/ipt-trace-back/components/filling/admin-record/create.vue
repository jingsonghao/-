<template>
  <ipt-modal @close="close" ref="iptModel">
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">添加</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">管理者姓名</label>
          <div class="col-sm-7">
            <input type="text" v-model="adminRecord.managerName" name="managerName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('managerName') }">
            <span v-show="errors.firstByRule('managerName', 'required')" class="help is-danger">请填写管理者姓名</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">管理者职务</label>
          <div class="col-sm-7">
            <input type="text" v-model="adminRecord.managerJob" name="managerJob" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('managerJob') }">
            <span v-show="errors.firstByRule('managerJob', 'required')" class="help is-danger">请填写管理者职务</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">所属企业</label>
          <div class="col-sm-7">
            <input type="text" v-model="adminRecord.enterpriseName" name="enterpriseName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('enterpriseName') }">
            <span v-show="errors.firstByRule('enterpriseName', 'required')" class="help is-danger">请填写所属企业</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">备案日期</label>
          <div class="col-sm-7">
            <el-date-picker v-model="adminRecord.recordDate"
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
          <label class="col-sm-3 control-label">联系方式</label>
          <div class="col-sm-7">
            <input type="text" v-model="adminRecord.phone" name="phone" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('phone') }">
            <span v-show="errors.firstByRule('phone', 'required')" class="help is-danger">请填写联系方式</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">邮箱</label>
          <div class="col-sm-7">
            <input type="text" v-model="adminRecord.email" name="email" class="form-control"
                   v-validate="'required|email'" :class="{'is-danger': errors.has('email') }">
            <span v-show="errors.firstByRule('email', 'required')" class="help is-danger">请填写邮箱</span>
            <span v-show="errors.firstByRule('email', 'email')" class="help is-danger">邮箱格式不正确</span>
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
  import { mapActions } from 'vuex'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-trace-back/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from '@/components/common/modal'
  import Utils from '@/utils'

  export default {
    components: {
      IptModal
    },
    props: {
      params: {}
    },
    data () {
      return {
        enterprisesList: {},
        adminRecord: {}
      }
    },
    methods: {
      create () {
        var that = this
        /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.AdminRecord.create(that.adminRecord).then((data) => {
              that.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.close()
                }
              })
              /** yanggang 2017/12/4 更新表格分页数据 */
              that.getAdminRecordTableData(this.params)
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
        Object.assign(this.$data.adminRecord, {})
      },
      addMarker (point) {
        let marker = {
          position: [point.lng, point.lat]
        }
        this.removeMarker()
        this.markers.push(marker)
      },
      removeMarker (marker) {
        if (marker) {
          Utils.ArrayUtil.remove(this.markers, marker)
        }
        if (!this.markers.length) {
          return
        }
        this.markers.splice(this.markers.length - 1, 1)
      },
      ...mapActions({
        getAdminRecordTableData: 'getAdminRecordTableData'
      })
    },
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
