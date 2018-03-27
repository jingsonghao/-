<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">选择接收人</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <div>
        <div class="r-search search2" style="margin-top: 20px;">
          <form class="form form-inline">
            <div class="form-group">
              <label>姓名：</label>
              <input v-model="userManageTableParams.username" type="text" class="form-control search-01"
                     style="width: 200px;" placeholder="">
            </div>
            <div class="form-group">
              <label>部门：</label>
              <el-select v-model="userManageTableParams.departmentId" filterable placeholder="请选择">
                <el-option key="" label="请选择" value=""></el-option>
                <el-option
                  v-for="item in departmentList"
                  :key="item.departmentId"
                  :label="item.departmentName"
                  :value="item.departmentId">
                </el-option>
              </el-select>
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-reset" @click="search">查询</button>
            </div>
          </form>
        </div>
        <div class="shadow-boxs">
          <div class="col-lg-12">
            <ipt-table :tableData="userManageTableData"
                       :tableConfig="userManageTableConfig"
                       :params="userManageTableParams">
              <th slot="beforeTitle"><input type="checkbox" @change="checkAll" :checked="checkboxAll"></th>
              <td slot="beforeBody" slot-scope="scope">
                <input type="checkbox" v-model="checkboxList" :value="scope.columnData.userId">
              </td>
            </ipt-table>
          </div>
        </div>
      </div>
    </template>
    <!-- [modalFooter]底部插槽 -->
    <template slot="modalFooter">
      <button type="button" class="btn btn-reset" @click="reset">重置</button>
      <button type="button" class="btn btn-search" @click="confirmSelect">保存</button>
    </template>
  </ipt-modal>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import $ from 'jquery'
  import IptModal from "@/components/common/modal"
  import ManageApi from '@/ipt-manage-system/api'
  import IptTable from '@/components/common/table'

  export default {
    components: {
      IptModal, IptTable
    },
    props: {
      params: {}
    },
    created() {
      this.init()
    },
    data: function () {
      return {
        userManageTableParams: {
          username: '',
          name: '',
          departmentId: '',
          enable: ''
        },
        userManageTableConfig: {
          getApi: 'getUserManageTableData',  // #必须# 数据的的请求Vuex的Action名
          display: 2,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 3,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '用户名', data: 'username'},
            {title: '用户姓名', data: 'name'},
            {title: '所属部门', data: 'departmentName'},
            {title: '电子邮箱', data: 'email'},
            {title: '联系电话', data: 'phone'},
            {title: '状态', data: 'enableName'}
          ]
        },
        selected: [],
        departmentList: [],
        checkboxList: [],
        checkboxAll: false
      }
    },
    computed: {
      pageCheckBoxValues() {
        if (this.userManageTableData && this.userManageTableData.data) {
          return this.userManageTableData.data.map(item => item.userId)
        }
        return []
      },
      ...mapGetters({
        generateReportUserList: 'generateReportUserList',
        userManageTableData: 'userManageTableData'
      })
    },
    watch: {
      checkboxList(curVal) {
        /** Zhao Yun 2017/12/21 上次选择的用户ID */
        let currentPageSelectedUserId = []
        /** Zhao Yun 2017/12/21 上次选择的索引，方便删除 */
        let currentPageSelectedIndex = []
        this.selected.forEach((selectItem, index) => {
          if (this.pageCheckBoxValues.includes(selectItem.userId)) {
            currentPageSelectedUserId.push(selectItem.userId)
            currentPageSelectedIndex.push(index)
          }
        })
        if (this.userManageTableData && this.userManageTableData.data) {
          this.userManageTableData.data.forEach((tableItem) => {
            /** Zhao Yun 2017/12/21 当前选中，上次未选中的[需要添加] */
            if (curVal.includes(tableItem.userId) &&
                  !currentPageSelectedUserId.includes(tableItem.userId)) {
              this.selected.push(tableItem)
            }
            /** Zhao Yun 2017/12/21 当前未选中，上次选中的[需要删除] */
            if (!curVal.includes(tableItem.userId) &&
                  currentPageSelectedUserId.includes(tableItem.userId)) {
              this.selected.splice(currentPageSelectedIndex[currentPageSelectedUserId.indexOf(tableItem.userId)], 1)
            }
          })
        }
        this.checkboxAll = this.pageDataAllInChecked()
      },
      userManageTableData() {
        this.checkboxAll = this.pageDataAllInChecked()
      },
      generateReportUserList(curVal) {
        this.checkboxList = curVal.map(item => item.userId)
      }
    },
    methods: {
      init: function () {
        ManageApi.DepartmentManage.getUserDepartmentList().then((data) => {
          this.departmentList = data.data
        })
        this.getUserManageTableData(this.userManageTableParams)
      },
      search: function () {
        this.getUserManageTableData(this.userManageTableParams)
      },
      confirmSelect() {
        if (this.selected.length < 1) {
          this.$alert("请选择接收人")
          return
        }
        this.selectedGenerateReportUserList(this.selected)
        $('div.modal-header > button[aria-label="Close"]').trigger('click')
        /** TODO 清空数据 */
        Object.assign(this.$data, this.$options.data())
      },
      reset() {
          Object.assign(this.$data, this.$options.data())
      },
      /** Zhao Yun 2017/12/21 子项复选框处理 */
      pageDataAllInChecked() {
        /** Zhao Yun 2017/12/21 数据变化时检查当前页的所有数据是否已选 */
        return this.pageCheckBoxValues.every(element => this.checkboxList.includes(element))
      },
      /** Zhao Yun 2017/12/21 标题全选框处理 */
      checkAll(event) {
        if (!event.currentTarget.checked) {
          /** [1] 未选  */
          /**    从已选择的数据中移除当前页数据所有复选框的值 */
          this.pageCheckBoxValues.forEach(element => {
            let index = this.checkboxList.indexOf(element)
            if (index >= 0) {
              this.checkboxList.splice(index, 1)
            }
          })
        } else {
          /** [2] 全选  */
          /**    向选择的数据中放入当前页数据所有复选框的值 */
          this.pageCheckBoxValues.forEach(element => {
            let index = this.checkboxList.indexOf(element)
            if (index < 0) {
              this.checkboxList.push(element)
            }
          })
        }
        this.checkboxAll = !this.checkboxAll
      },
      ...mapActions({
        selectedGenerateReportUserList: 'selectedGenerateReportUserList',
        getUserManageTableData: 'getUserManageTableData'
      })
    }
  }
</script>
<style scoped>
  .form-horizontal .form-group {
     margin-right: 0;
     margin-left: 0;
  }
</style>
