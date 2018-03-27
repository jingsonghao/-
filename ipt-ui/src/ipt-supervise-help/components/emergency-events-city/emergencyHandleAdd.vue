<template>
  <ipt-modal @close="reset">
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">问题报告</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <!-- [验证] -->
        <!-- 1. 使用[name]+[v-validate]一起使用进行校验 -->
        <!--    可使用的验证规则：http://vee-validate.logaretm.com/rules.html#available-validations -->
        <!-- 2. 使用errors对象获取错误信息 -->
        <!--    errors.has('name'): name属性是否又错误 -->
        <!--    errors.firstByRule('name', 'rule'): 获取name属性的rule规则的错误 -->
        <div class="form-group">
          <label class="col-sm-3 control-label">来源城市</label>
          <div class="col-sm-7">
            <input type="text" v-model="editedParams.sourceCity" name="sourceCity" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('sourceCity') }">
            <span v-show="errors.firstByRule('sourceCity', 'required')" class="help is-danger">请填写来源城市</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">应急事件报告名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="editedParams.emergencyName" name="emergencyName" class="form-control"
                   v-validate="'required'" :class="{'is-danger': errors.has('emergencyName') }">
            <span v-show="errors.firstByRule('emergencyName', 'required')" class="help is-danger">请填写应急事件报告名称</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">流通节点类型</label>
          <div class="col-sm-7">
            <el-select v-model="editedParams.nodeTypeNo" filterable placeholder="请选择" @change="getEnterprises"
                       name="nodeTypeNo" v-validate="'required'">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in nodeTypes"
                :key="item.nodeTypeNo"
                :label="item.nodeTypeName"
                :value="item.nodeTypeNo">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('nodeTypeNo', 'required')" class="help is-danger">请选择节点类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">企业名称</label>
          <div class="col-sm-7">
            <el-select v-validate="'required'" v-model="editedParams.enterpriseNo" name="enterpriseNo"
                       filterable placeholder="请选择">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in enterprises"
                :key="item.enterpriseNo"
                :label="item.enterpriseName"
                :value="item.enterpriseNo">
              </el-option>
            </el-select>
            <span v-show="errors.firstByRule('enterpriseNo', 'required')" class="help is-danger">请选择企业</span>
          </div>
        </div>
        <div>
          <div class="col-sm-1"></div>
          <div class="form-group col-sm-5 margin-left-delet">
            <label class="col-sm-3 control-label">溯源码</label>
            <div class="col-sm-7 input-list">
              <div v-for="(item, index) in editedParams.sourceTranCodes" :key="uuids[index]">
                <input type="text" v-model="editedParams.sourceTranCodes[index]"
                       :name="'sourceTranCodes_' + uuids[index]" class="form-control"
                       v-validate="'required|dupTranCodeAdd|availableTranCodeAdd'"
                       :class="{'is-danger': errors.has('sourceTranCodes_' + uuids[index]) }">
                <span v-show="errors.firstByRule('sourceTranCodes_' + uuids[index], 'required')"
                      class="help is-danger">请填写溯源码</span>
                <span v-show="errors.firstByRule('sourceTranCodes_' + uuids[index], 'dupTranCodeAdd')"
                      class="help is-danger">重复的溯源码</span>
                <span v-show="errors.firstByRule('sourceTranCodes_' + uuids[index], 'availableTranCodeAdd')"
                      class="help is-danger">无效的溯源码</span>
                <span style="visibility: visible">&nbsp;</span>
              </div>
            </div>
          </div>
          <div class="form-group col-sm-6">
            <label class="col-sm-2 control-label">疑似问题产品</label>
            <div class="col-sm-10">
              <div v-for="(item, index) in relatedProducts" :key="index">
                <div class="col-sm-8">
                  <input type="text" v-model="relatedProducts[index]" class="form-control" readonly>
                  <span style="visibility: visible">&nbsp;</span>
                </div>
                <div class="col-sm-4">
                  <a class="add-link" @click="addTrace(index + 1)">添加</a>
                  <a class="delete-link" @click="deleteTrace(index)">删除</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">涉及范围</label>
          <div class="col-sm-7">
            <textarea type="text" v-model="editedParams.invokeScope" name="invokeScope" class="form-control"
                      v-validate="'required'" :class="{'is-danger': errors.has('invokeScope') }"></textarea>
            <span v-show="errors.firstByRule('invokeScope', 'required')" class="help is-danger">请填写涉及范围</span>
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
  import Api from '@/ipt-supervise-help/api'
  import TraceBackApi from '@/ipt-trace-back/api'
  import CommonApi from '@/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"
  import { Validator } from 'vee-validate'

  export default {
    components: {
      IptModal
    },
    props: {
      params: {}
    },
    created() {
      this.init()
    },
    data() {
      return {
        editedParams: {
          sourceCity: '',
          emergencyName: '',
          nodeTypeNo: '',
          enterpriseNo: '',
          invokeScope: '',
          sourceTranCodes: []
        },
        relatedProducts: [],
        uuids: [],
        nodeTypes: [],
        enterprises: [],
        tempTranData: []
      }
    },
    methods: {
      init() {
        CommonApi.EnumType.getBusinessTypes({}).then(data => {
          CommonApi.EnumType.getNodeTypes({ businessTypes: data.data.map(item => item.value).join() }).then(nestedData => {
            this.nodeTypes = nestedData.data
          })
        })
        this.tempTranData = {
          '11111': { tranCode: '11111', relatedProduct: '猪头' },
          '22222': { tranCode: '11111', relatedProduct: '黑猪' },
          '33333': { tranCode: '11111', relatedProduct: '辣椒' }
        }
        this.editedParams.sourceTranCodes.push('')
        this.relatedProducts.push('')
        this.uuids.push(window.uuidV4())
        this.getEnterprises()
        Validator.extend('dupTranCodeAdd', {
          getMessage: field => '重复的追溯码！',
          validate: value => new Promise(resolve => {
            resolve({
              valid: this.editedParams.sourceTranCodes.filter(item => item === value).length <= 1
            })
          })
        })
        Validator.extend('availableTranCodeAdd', {
          getMessage: field => '无效的追溯码！',
          validate: value => new Promise(resolve => {
            resolve({
              valid: this.changeTranCode(value)
            })
          })
        })
      },
      create() {
        let that = this
        /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.EmergencyCityHandle.create(that.editedParams).then((data) => {
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
              that.getEmergencyCityHandleTableData(this.params)
            })
          }
        })
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
        this.init()
        this.$validator.reset()
      },
      getEnterprises() {
        TraceBackApi.SubjectInfo.getNodeRecordList({ size: -1, nodeTypeNo: this.editedParams.nodeTypeNo }).then(data => {
          this.enterprises = data.data
        })
      },
      changeTranCode(value) {
        if (value) {
          let index = this.editedParams.sourceTranCodes.indexOf(value)
          let tempTranDatum = this.tempTranData[value]
          this.relatedProducts[index] = tempTranDatum ? tempTranDatum.relatedProduct : ''
          return tempTranDatum
        }
      },
      addTrace(index) {
        this.editedParams.sourceTranCodes.splice(index, 0, '')
        this.relatedProducts.splice(index, 0, '')
        this.uuids.splice(index, 0, window.uuidV4())
      },
      deleteTrace(index) {
        if (this.editedParams.sourceTranCodes.length > 1) {
          this.editedParams.sourceTranCodes.splice(index, 1)
          this.relatedProducts.splice(index, 1)
          this.uuids.splice(index, 1)
        }
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getEmergencyCityHandleTableData: 'getEmergencyCityHandleTableData'
      })
    }
  }
</script>
<style>
  .form-horizontal .margin-left-delet {
    margin-left: 40px;
  }
</style>
