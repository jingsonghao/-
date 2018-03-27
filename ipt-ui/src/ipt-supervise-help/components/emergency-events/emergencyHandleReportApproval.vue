<template>
  <div class="main">
    <div class="shadow-boxs">
      <div class="col-xs-12">
        <div class="table-title-box">
          <h3>应急事件报告</h3>
        </div>
        <div class="report-content">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="label-title">应急事件报告名称</label><div class="col-sm-8">{{singleData.emergencyName}}</div>
            </div>
            <div class="form-group">
              <label class="label-title">应急报告生产时间</label><div class="col-sm-8">{{singleData.createDate}}</div>
            </div>
            <div class="form-group">
              <label class="label-title">应急报告发送人</label><div class="col-sm-8">{{singleData.reportUserName}}</div>
            </div>
            <!-- 链条 -->
            <ipt-chain></ipt-chain>
            <div class="form-group">
              <label class="label-title">内容</label>
              <div class="col-sm-8">
                <div class="summernote">
                  <div  class="ql-editor" v-html="singleData.particulars"></div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="label-title">接收人</label>
              <div class="col-sm-8 choose-personnel">
                <div class="form-control">{{selectUsers}}</div>
              </div>
            </div>
            <div class="text-right btn-box-j">
              <a type="button" class="btn btn-reset" @click="pass">通过</a>
              <a type="button" class="btn btn-reset" @click="reject">不通过</a>
              <a class="btn btn-search btn-back-j" @click="returnLastPage">关闭</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import Api from '@/ipt-supervise-help/api'
  import IptChain from './emergencyChain'

  export default {
    components: {
      IptChain
    },
    mounted() {
      this.init()
    },
    data() {
      return {
        singleData: {},
        editedParams: {},
        selectUsers: ''
      }
    },
    watch: {
      singleData() {
        this.editedParams = JSON.parse(JSON.stringify(this.singleData))
      },
      generateReportUserList(curVal) {
        this.selectUsers = curVal.map(item => item.name).join()
        this.editedParams.receiveUserIds = curVal.map(item => item.userId).join()
      }
    },
    computed: {
      queryId() {
        return this.$router.currentRoute.query.id
      },
      ...mapGetters({
        generateReportUserList: 'generateReportUserList'
      })
    },
    methods: {
      init() {
        Api.EmergencyHandle.getOne(this.queryId).then((data) => {
          new Promise(resolve => {
            this.singleData = data.data
            let receiveUsersMap = data.data.receiveUsers
            let receiveUsers = []
            for (let key in receiveUsersMap) {
              receiveUsers.push(receiveUsersMap[key])
            }
            this.selectedGenerateReportUserList(receiveUsers)
            resolve()
          }).then(() => {
          })
        })
      },
      pass() {
        this.$confirm('完成操作将无法撤回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doAudit({
            pass: true,
            rejectReason: ''
          })
        })
      },
      reject() {
        this.$prompt('请输入否决原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请输入否决原因'
        }).then(({ value }) => {
          this.doAudit({
            pass: false,
            rejectReason: value
          })
        })
      },
      doAudit(param) {
        let self = this
        Api.EmergencyHandle.approval(this.queryId, param).then((data) => {
          self.$alert(data.msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.returnLastPage()
            }
          })
        })
      },
      returnLastPage() {
        this.$router.push({
          path: `/superviseHelp/emergencyHandle`
        })
      },
      ...mapActions({
        selectedGenerateReportUserList: 'selectedGenerateReportUserList'
      })
    }
  }
</script>
<style scoped>
  .is-danger {
    border-color: #EF5350;
  }
  label.is-danger, .help.is-danger {
    color: #EF5350;
  }
</style>
