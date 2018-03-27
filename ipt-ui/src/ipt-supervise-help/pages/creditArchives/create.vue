
<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">添加</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-3 control-label">企业名称</label>
            <div class="col-sm-7">
              <select type="text" class="form-control" v-model="creditArchives.enterpriseNo" name="enterpriseNo"
                      v-validate="'required'" :class="{'is-danger': errors.has('enterpriseNo') }">
                <option value="">请选择</option>
                <option v-for="option in enterpriseInfoEnumDate.data" :value="option.enterpriseNo">{{ option.enterpriseName }}</option>
              </select>
              <span v-show="errors.has('enterpriseNo')" class="help is-danger">请选择企业</span>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">企业类型</label>
            <div class="col-sm-7">
              <input type="text" class="form-control search-01" placeholder="" v-model="creditArchives.enterpriseType" name="enterpriseType" readonly>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">行为类型</label>
            <div class="col-sm-7">
              <select type="text" class="form-control" v-model="creditArchives.htType" name="htType"
                      v-validate="'required'" :class="{'is-danger': errors.has('htType') }">
                <option value="">请选择</option>
                <option v-for="option in honestyTypeEnumDate.data" :value="option.id">{{ option.htName }}</option>
              </select>
              <span v-show="errors.has('htType')" class="help is-danger">请选择行为类型</span>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">行为描述</label>
            <div class="col-sm-7">
              <textarea type="text" class="form-control" v-model="creditArchives.describe" name="describe"
                        v-validate="'required'" :class="{'is-danger': errors.has('describe') }"></textarea>
              <span v-show="errors.has('describe')" class="help is-danger">请输入行为描述</span>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">加减分</label>
            <div class="col-sm-7" id="addHt" style="display: none">
              <select type="text" class="form-control"  v-model="creditArchives.hrScore" name="hrScore"
                      v-validate="'required'" :class="{'is-danger': errors.has('hrScore') }">
                <option value="">请选择</option>
                <option value="1">+1分</option>
                <option value="2">+2分</option>
                <option value="3">+3分</option>
              </select>
              <span v-show="errors.has('hrScore')" class="help is-danger">请选择加减分</span>
            </div>
            <div class="col-sm-7" id="minusHt" >
              <select type="text" class="form-control"  v-model="creditArchives.hrScore" name="hrScore"
                      v-validate="'required'" :class="{'is-danger': errors.has('hrScore') }">
                <option value="">请选择</option>
                <option value="1">-1分</option>
                <option value="2">-2分</option>
                <option value="3">-3分</option>
              </select>
              <span v-show="errors.has('hrScore')" class="help is-danger">请选择加减分</span>
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
  import Api from '@/ipt-supervise-help/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      params: {}
    },
    data() {
      return {
        creditArchives: {
          enterpriseNo: '',
          enterpriseType: '',
          circulateCode: '',
          hlType: '',
          htType: '',
          hrScore: '',
          describe: '',
          enterprisesOwners: '',
          contactWay: '',
          addPeople: '',
          addDate: '',
          isDelete:''
        }
      }
    },
    watch: {
      "creditArchives.enterpriseNo": {
        handler: function (curVal) {
          for (var i = 0; i < this.enterpriseInfoEnumDate.data.length; i++) {
            var obj = this.enterpriseInfoEnumDate.data[i]
            if (curVal === obj.enterpriseNo) {
              if (obj.enterpriseType === 0) {
                this.creditArchives.enterpriseType = "种植(养殖)企业"
              }
              if (obj.enterpriseType === 1) {
                this.creditArchives.enterpriseType = "超市单位"
              }
              if (obj.enterpriseType === 2) {
                this.creditArchives.enterpriseType = "团消单位"
              }
              if (obj.enterpriseType === 3) {
                this.creditArchives.enterpriseType = "特色企业"
              }
            }
          }
        },
        deep: true
      },
      "creditArchives.htType": {
        handler: function (curVal) {
          if (curVal === 1) {
            $("#minusHt").hide()
            $("#addHt").show()
          }
          if (curVal === 0) {
            $("#addHt").hide()
            $("#minusHt").show()
          }
        },
        deep: true
      }

    },
    /** Zhao Yun 2017/11/16 在创建的时候进行初始化 */
    created() {
      this.getHonestyTypeEnumDate()
      this.getEnterpriseInfoEnumDate()
    },
    computed: mapGetters({
      /*这里的配置也影响参数显示*/
      integrityRecordTableData: 'integrityRecordTableData',
      honestyTypeEnumDate: 'honestyTypeEnumDate',
      enterpriseInfoEnumDate: 'enterpriseInfoEnumDate'
    }),
    methods: {
      create() {
        var that = this
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.CreditArchives.getAddCreditArchives(that.creditArchives).then((data) => {
              that.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                /** yanggang 2017/12/5 关闭弹出层 */
                $('#js_add_modal div.modal-header > button[aria-label="Close"]').trigger('click')
            /** yanggang 2017/12/5 清空数据 */
            this.reset()
          }
          })
            /** yanggang 2017/12/4 更新表格分页数据 */
            that.getIntegrityRecordTableData(this.params)
          })
            return
          }
          this.$alert('Oh NO!')
      })
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getIntegrityRecordTableData: 'getIntegrityRecordTableData',
        getHonestyTypeEnumDate: 'getHonestyTypeEnumDate',
        getEnterpriseInfoEnumDate: 'getEnterpriseInfoEnumDate'
      })
    }
  }
</script>

