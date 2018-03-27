<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">编辑</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">指标编号</label>
          <div class="col-sm-7">
            <input type="text" v-model="examineIndexEdit.eiNo" name="eiNo" class="form-control" readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">指标名称</label>
          <div class="col-sm-7">
            <input type="text" v-model="examineIndexEdit.eiName" name="eiName" class="form-control" readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">指标类别</label>
          <div class="col-sm-7">
            <select type="text" class="form-control" v-model="examineIndexEdit.examineTypeId" name="examineTypeId"
                    v-validate="'required'" :class="{'is-danger': errors.has('eiType') }">
              <option v-for="examineType in examineTypes"
                      :value="examineType.id">{{examineType.etName}}
              </option>
            </select>
            <span v-show="errors.has('eiType')" class="help is-danger">请选择指标类别</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">产品类别</label>
          <div class="col-sm-7">
            <select style="display: block " type="text" class="form-control" v-model="examineIndexEdit.cateCode"
                    name="cateCode"
                    v-validate="'required'" :class="{'is-danger': errors.has('parentType') }">
              <option value="'0000'">通用</option>
              <option v-for="cate in cates"
                      :value="cate.cateCode">{{cate.cateName}}
              </option>
            </select>
            <span v-show="errors.has('childType')" class="help is-danger">请选择产品类别</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">流通节点类型</label>
          <div class="col-sm-7">
            <select type="text" class="form-control" v-model="examineIndexEdit.nodeTypeNo" name="nodeTypeNo">
              <option :value="'0000'">通用</option>
              <option v-for="nodeType in nodeTypes"
                      :value="nodeType.nodeTypeNo">{{nodeType.nodeTypeName}}
              </option>
            </select>
            <span v-show="errors.has('circulateCode')" class="help is-danger">请选择流通节点类型</span>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">指标内容</label>
          <div class="col-sm-7">
            <input type="text" v-model="examineIndexEdit.eiContent" name="eiContent" class="form-control" readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">参数设置</label>
          每天上传完整、规范的追溯信息条数>
          <input class="input-text-small" type="text" v-model="examineIndexEdit.settingNumber" name="settingNumber">
          条，即记为实际上传追溯信息天数
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">指标状态</label>
          <div class="col-sm-7">
            <select type="text" class="form-control" v-model="examineIndexEdit.eiState" name="eiState"
                    v-validate="'required'" :class="{'is-danger': errors.has('circulateCode') }">
              <option v-for="indexState in indexStates"
                      :value="indexState.value">{{indexState.name}}
              </option>
            </select>
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
  /** 引入API接口 */
  import CommonApi from '@/api'
  import {mapActions} from 'vuex'
  import Api from '@/ipt-supervise-help/api'
  /** 引入弹窗组件 */
  import IptModal from "@/components/common/modal"
  export default {
    components: {
      IptModal, CommonApi, Api
    },
    created() {
      this.init()
    },
    data() {
      return {
        examineTypes: [],
        cates: [],
        nodeTypes: [],
        indexStates: []
      }
    },
    props: {
      examineIndexEdit: {}
    },
    methods: {
      init() {
        let obj = this
        CommonApi.EnumType.getExamineIndexState().then(data => {  //考核指标状态
          obj.indexStates = data.data
        })
        CommonApi.EnumType.getBusinessTypes({}).then(data => { //业务类型
          CommonApi.EnumType.getNodeTypes({
            businessTypes: data.data.map(item => item.value).join()
          }).then(nestedData => { //流通节点类型
            obj.nodeTypes = nestedData.data
          })
        })
        Api.ExamineManage.getOneLevelCateList().then(data => { //重要产品类别
          obj.cates = data.data
        })
        Api.ExamineType.getExamineTypeAll().then(data => { //考核指标类别
          obj.examineTypes = data.data
        })
      },
      create() {
        var that = this
        /** 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.ExamineManage.saveExamineIndex(that.examineIndexEdit).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  $('#js_edit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
                }
              })
              /** 更新表格分页数据 */
              that.getIndexBaseTableData(this.params)
            })
            return
          }
          this.$alert('保存失败!')
        })
      },
      reset() {
        Api.ExamineManage.findIndexBase(this.examineIndexEdit.id).then((data) => {
          this.examineIndexEdit = data.data
        })
      },
      /** 获取请求数据的action */
      ...mapActions({
        getIndexBaseTableData: 'getIndexBaseTableData'
      })
    }
  }
</script>
