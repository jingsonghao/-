<template>
  <ipt-modal>
    <template slot="modalBody">
  <div>
    <!-- [搜索框] -->
    <!--  1. 在Vue data中预先定义所有表单model的初始值 -->
    <!--  2. 表单中预定义的数据(比如下拉选的可选值)，使用接口获取数据 -->
    <!--  3. 所有表单model的初始值需要作为一个整体对象传递给table组件作为分页的请求参数 -->
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>姓名</label>
            <input type="text" class="form-control" placeholder="" v-model="params.name">
          </div>
          <div class="form-group">
            <label>部门</label>
            <input type="text" class="form-control" placeholder="" v-model="params.departmentName">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-dange btn-reset" @click="reset"> 重置 </button>
            <button type="button" class="btn btn-search" @click="search"> 查询 </button>
          </div>
        </form>
      </div>
    </div>
    <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
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
          :tableData="userTableData"
          :tableConfig.sync="runningReportConfig"
          :params="params">
          <!-- 插槽示例 -->
          <!--<th slot="beforeTitle"><input type="checkbox" @change="checkAll" v-model="checkboxAll"></th>-->
          <!--<td slot="beforeBody" slot-scope="scope">-->
            <!--<input type="checkbox" v-model="checkboxList" :value="scope.columnData.managerId">-->
          <!--</td>-->
          <th slot="afterTitle">请选择</th>
          <td slot="afterBody" slot-scope="scope">
            <input type="checkbox" v-model="userVO" :value="scope.columnData">
          </td>
        </ipt-table>
      </div>
    </div>
  </div>
    </template>
      <!-- [modalFooter]底部插槽 -->
      <template slot="modalFooter">
        <button type="button" class="btn btn-search" @click="findUser">确定</button>
        <button type="button" class="btn btn-reset" @click="cancel">取消</button>
      </template>
  </ipt-modal>
</template>
<script>
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapGetters, mapActions} from 'vuex'
  /** Zhao Yun 2017/11/16 引入表格组件 */
  import IptModal from "@/components/common/modal"
  import IptTable from "@/components/common/table"
  /** Zhao Yun 2017/11/16 引入创建的弹窗组件 */
  /** Zhao Yun 2017/11/17 引入API接口 */
//  import Api from '@/ipt-supervise-help/api'
  import $ from 'jquery'

  export default {
    /** Zhao Yun 2017/11/16 将引入的组件作为子组件 */
    components: {
      IptModal, IptTable
    },
    /** Zhao Yun 2017/11/16 在创建的时候进行初始化 */
    created() {
      this.init()
    },
    data() {
      return {
        /** Zhao Yun 2017/11/16 预定义搜索表单的初始值 */
        params: {
          name: "",
          departmentName: ""
        },
        userVO:[],
        /** Zhao Yun 2017/11/16 定义表格的配置 */
        runningReportConfig: {
          getApi: 'getUserTableData',  // #必须# 数据的的请求Vuex的Action名
          display: 10,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 3,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '姓名', data: 'name'},
            {title: '部门', data: 'departmentName'}
          ]
        },
        checkboxList: [],
        checkboxAll: false,
        runningReport: ''
      }
    },
    /** Zhao Yun 2017/11/16 获取表格需要的数据 */
    computed: mapGetters({
      userTableData: 'userTableData'
    }),
    methods: {
      init() {
        /** Zhao Yun 2017/11/16 获取表格分页数据 */
        this.getUserTableData(this.params)
//        console.log(this.userTableData)
      },
      reset() {
        Object.assign(this.$data, this.$options.data())
      },
      cancel() {
//        this.userVO = []
//        this.reset()
        $('#js_user_modal div.modal-header > button[aria-label="Close"]').trigger('click')
      },
      search() {
        this.getUserTableData(this.params)
      },
      checkAll(event) {
        var self = this
        if (!event.currentTarget.checked) {
          self.checkboxList = []
        } else {
          self.checkboxList = self.userTableData.data.map(item => item.reportId)
        }
      },
      findUser: function () {
        var name = ""
        var userId = ""
        for (var i = 0; i < this.userVO.length; i++) {
          if (i + 1 < this.userVO.length) {
            name += this.userVO[i].name + ","
            userId += this.userVO[i].userId + ","
          } else {
            name += this.userVO[i].name
            userId += this.userVO[i].userId
          }
        }
//        console.log(name)
        this.getFindUser({name: name, userId: userId})
//        this.userVO = []
        $('#js_user_modal div.modal-header > button[aria-label="Close"]').trigger('click')
        this.reset()
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getUserTableData: 'getUserTableData',
        getFindUser: 'getFindUser'
      })
    },
    watch: {
      checkboxList(curVal) {
        this.checkboxAll = curVal.length === this.runningReportConfig.display
      }
    }
  }
</script>
