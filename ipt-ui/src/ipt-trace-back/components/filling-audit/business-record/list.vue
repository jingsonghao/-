<template>
  <div>
    <!-- [搜索框] -->
    <!--  1. 在Vue data中预先定义所有表单model的初始值 -->
    <!--  2. 表单中预定义的数据(比如下拉选的可选值)，使用接口获取数据 -->
    <!--  3. 所有表单model的初始值需要作为一个整体对象传递给table组件作为分页的请求参数 -->
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>自然人责任主体名称</label>
            <input type="text" class="form-control search-01" placeholder="" v-model="params.bizName">
            <label>登记人</label>
            <input type="text" class="form-control search-01" placeholder="" v-model="params.recordUserName">
          </div>
          <div class="form-group">
            <label>审核结果</label>
            <el-select v-model="params.isConfirm" name="isConfirm" filterable placeholder="请选择">
              <el-option key="" label="请选择" value=""></el-option>
              <el-option
                v-for="item in isConfirms"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-dange btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
            <button type="button" class="btn btn-reset1" data-toggle="modal" data-target="#js_add_modal"> 新增</button>
          </div>
        </form>
      </div>
    </div>
    <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
    <ipt-view id="js_show_modal" :businessBaseInfoId="businessBaseInfoId"></ipt-view>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <!-- [表格] -->
        <!--  1. tableData：请求接口得到的表格的数据 -->
        <!--  2. tableConfig：表格的预定义配置 -->
        <!--  3. [可选]params：搜索框的请求参数 -->
        <!--  4. [可选]使用插槽扩展表格，##标题+内容同时使用## -->
        <!--     使用scope可以获取子组件的数据 -->
        <!--     标题/列之前[beforeTitle+beforeBody] -->
        <!--     标题/列之后[afterTitle+afterBody] -->
        <ipt-table
          :tableData="businessesRecordList"
          :tableConfig.sync="businessesRecordConfig"
          :params="params">
          <!-- 插槽示例 -->
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" href="javascript:;" data-toggle="modal" data-target="#js_show_modal"
               @click="businessBaseInfoId = scope.columnData.businessBaseInfoId">查看</a>
            <a class="add-link" href="javascript:;" @click="approvalBtn(scope.columnData)">审核</a>
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
</template>
<script>
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapGetters, mapActions} from 'vuex'
  /** Zhao Yun 2017/11/16 引入表格组件 */
  import IptTable from "@/components/common/table"
  /** Zhao Yun 2017/11/16 引入创建的弹窗组件 */
  import IptView from "./view"
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-trace-back/api'

  export default {
    /** Zhao Yun 2017/11/16 将引入的组件作为子组件 */
    components: {
      IptTable, IptView
    },
    /** Zhao Yun 2017/11/16 在创建的时候进行初始化 */
    created() {
      this.init()
    },
    data() {
      return {
        /** Zhao Yun 2017/11/16 预定义搜索表单的初始值 */
        params: {
          enterpriseName: "",
          enterpriseType: "",
          isConfirm: ""
        },
        /** Zhao Yun 2017/11/16 定义表格的配置 */
        businessesRecordConfig: {
          getApi: 'getBusinessesRecordList',  // #必须# 数据的的请求Vuex的Action名
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '自然人责任主体编码', data: 'bizCode'},
            {title: '自然人责任主体', data: 'bizName'},
            {title: '联系人', data: 'contacts'},
            {title: '登记人', data: 'recordUserName'},
            {title: '备案日期', data: 'recordDate'},
            {title: '审核人', data: 'confirmUserName'},
            {title: '审核日期', data: 'confirmTime'},
            {title: '审核结果', data: 'isConfirmEnum.name'}
          ]
        },
        checkboxList: [],
        checkboxAll: false,
        businessBaseInfoId: ''
      }
    },
    methods: {
      init() {
        /** Zhao Yun 2017/11/16 获取表格分页数据 */
        this.getBusinessesRecordList(this.params)
        this.getIsConfirms()
        this.getProperties()
        this.findRegionParentList()
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      search() {
        this.getBusinessesRecordList(this.params)
      },
      approvalBtn (columnData) {
        let this_ = this
        this_.$confirm('是否审核通过?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          let params = {pass: true}
          Api.BusinessesRecord.approval(columnData.businessBaseInfoId, params).then((data) => {
            this_.$message({
              type: 'success',
              message: '操作成功!'
            })
            /** yanggang 2017/12/4 更新表格分页数据 */
            this_.getBusinessesRecordList(this.params)
          })
        }, function () {
          this_.$prompt('不通过的原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({value}) => {
            let params = {pass: false, rejectReason: value}
            Api.BusinessesRecord.approval(columnData.businessBaseInfoId, params).then((data) => {
              this_.$message({
                type: 'success',
                message: '操作成功!'
              })
              /** yanggang 2017/12/4 更新表格分页数据 */
              this_.getBusinessesRecordList(this_.params)
            })
          })
        })
      },
      checkAll(event) {
        var self = this
        if (!event.currentTarget.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.businessesRecordList.data.map(item => item.businessBaseInfoId)
        }
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getBusinessesRecordList: 'getBusinessesRecordList',
        getIsConfirms: 'getIsConfirms',
        getProperties: 'getProperties',
        findRegionParentList: 'findRegionParentList'
      })
    },
    /** Zhao Yun 2017/11/16 获取表格需要的数据 */
    computed: mapGetters({
      isConfirms: 'isConfirms',
      businessesRecordList: 'businessesRecordList'
    }),
    watch: {
      checkboxList(curVal) {
        this.checkboxAll = curVal.length === this.businessesRecordConfig.display
      }
    }
  }
</script>
