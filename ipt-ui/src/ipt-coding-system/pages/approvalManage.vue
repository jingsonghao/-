<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>赋码系统</a></li>
      <li class="active jsh-active">赋码审批管理</li>
    </ol>
    <div class="shadow-boxs">
      <!--search 搜索框 组件-->
      <div class="r-search search2">
        <form class="form form-inline">
          <div class="form-group col-xs-4">
            <label>企业名称</label>
            <input type="text" v-model="params.enterpriseName" class="form-control search-01" placeholder="">
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-search" @click="search"> 查询</button>
          </div>
        </form>
      </div>
      <!-- end -->
    </div>
    <!--table 组件-->
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <ipt-table :tableData="approvalManageTableData" :tableConfig="tableDataConfig" :params="params">
          <th slot="afterTitle">操作</th>
          <td slot="afterBody" slot-scope="scope">
            <a class="look-link" @click="showBtn(scope.columnData)" v-if="scope.columnData.reviewStatus != 0" data-toggle="modal" data-target="#look_modal">查看</a>
            <a class="add-link" @click="approveBtn(scope.columnData)" v-if="scope.columnData.reviewStatus == 0" data-toggle="modal" data-target="#look_modal" >审核</a>
          </td>
        </ipt-table>
      </div>
      <!--模态框-->
      <div class="modal fade" id="look_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title myModalLabel"></h4>
            </div>
            <div class="modal-body form-control-content row">
              <div class="modal-left col-xs-12">
                <div class="shadow-boxs">
                  <!--search 搜索框 组件-->
                  <div class="r-search search2">
                    <form class="form form-inline">
                      <div class="form-group col-xs-12">
                        <label>企业名称</label>
                        <input type="text" readonly class="form-control" v-model="record.enterpriseName" style="height: 30px;width: 520px;margin-left: 10px;">
                      </div>
                      <div class="form-group col-xs-12">
                        <label>企业类型</label>
                        <input type="text" readonly class="form-control" v-model="record.enterpriseTypeName" style="height: 30px;width: 520px;margin-left: 10px;">
                      </div>
                      <div v-for="option in record.details">
                        <div class="form-group col-xs-4">
                          <label>重要产品品种</label>
                          <input type="text" readonly class="form-control" :value="option.varietyName" style="height: 30px">
                        </div>
                        <div class="form-group col-xs-4">
                          <label>批次码</label>
                          <input type="text" readonly class="form-control" :value="option.batchCode" style="height: 30px">
                        </div>
                        <div class="form-group col-xs-4">
                          <label>申请数量</label>
                          <input type="text" readonly class="form-control" :value="option.approvalNum" style="height: 30px">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" v-if="record.reviewStatus == 0"  @click="reviewData(1)" class="btn btn-reset" data-dismiss="modal">通过</button>
              <button type="button" v-if="record.reviewStatus == 0" class="btn btn-search" data-toggle="modal" data-target="#look_modal2">未通过</button>
              <button type="button" v-if="record.reviewStatus != 0"  class="btn btn-reset" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 模态框-->
      <div class="modal fade" id="look_modal2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title myModalLabel"></h4>
            </div>
            <div class="modal-body form-control-content row">
              <div class="modal-left col-xs-12">
                <div class="shadow-boxs">
                  <!--search 搜索框 组件-->
                  <div class="r-search search2">
                    <form class="form form-inline">
                      <div class="form-group col-xs-4">
                        <label>请填写原因:</label>
                        <textarea class="form-control" v-model="record.notPassReason" name="notPassReason" rows="3" style="width:500px;"></textarea>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-reset" data-dismiss="modal" @click="reviewData(2)">确定</button>
              <button type="button" class="btn btn-search" data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.form-control{
    height: 30px;
  }
</style>
<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import $ from 'jquery'
  import Api from '@/ipt-coding-system/api'
  export default {
    components: {
      IptTable
    },
    created() {
      this.init()
    },
    data() {
      return {
        params: { //参数
          enterpriseName: ""  //参数默认""
        },
        tableDataConfig: { //列表
          getApi: 'getApprovalManageTableData',
          title: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          sequenceShow: true,
          columns: [
            {title: '企业名称', data: 'enterpriseName'},
            {title: '企业类型', data: 'enterpriseTypeName'},
            {title: '时报时间', data: 'createTime'},
            {title: '审批人', data: 'reviewUser.name'},
            {title: '审批时间', data: 'reviewTime'},
            {title: '审批状态', data: 'reviewStatusName'}
          ]
        },
        record: {
        }
      }
    },
    computed: mapGetters({
      approvalManageTableData: 'approvalManageTableData'
    }),
    methods: {
      init() {
        /* 获取表格分页数据 */
        this.getApprovalManageTableData(this.params)
      },
      search() {
        this.getApprovalManageTableData(this.params)
      },
      showBtn(columnData) {
        this.record = columnData
      },
      approveBtn(columnData) {
        this.record = columnData
      },
      reviewData(status) {
        this.record.reviewStatus = status
        delete this.record.reviewUser
        delete this.record.createUser
        Api.ApprovalManage.review(this.record.codeApprovalId, this.record).then((data) => {
          this.$alert(data.msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              $('#look_modal div.modal-header > button[aria-label="Close"]').trigger('click')
            }
          })
          this.getApprovalManageTableData(this.params)
        })
      },
      /* 获取请求数据的action */
      ...mapActions({
        getApprovalManageTableData: 'getApprovalManageTableData'
      })
    }
  }
</script>
