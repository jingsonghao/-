<template>
  <div class="main">
    <div class="shadow-boxs">
      <div class="col-xs-12">
        <div class="table-title-box">
          <h3>应急事件报告</h3>
        </div>
        <div class="report-content">
          <div class="form-horizontal">
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
                  <div class="ql-editor" v-html="singleData.particulars"></div>
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
              <a class="btn btn-search btn-back-j" @click="returnLastPage">关闭</a>
            </div>
          </div>
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
      cityGenerateReportUserList(curVal) {
        this.selectUsers = curVal.map(item => item.name).join()
        this.editedParams.receiveUserIds = curVal.map(item => item.userId).join()
      }
    },
    computed: {
      queryId() {
        return this.$router.currentRoute.query.id
      },
      ...mapGetters({
        cityGenerateReportUserList: 'cityGenerateReportUserList'
      })
    },
    methods: {
      init() {
        Api.EmergencyCityHandle.getOne(this.queryId).then((data) => {
          new Promise(resolve => {
            this.singleData = data.data
            let receiveUsersMap = data.data.receiveUsers
            let receiveUsers = []
            for (let key in receiveUsersMap) {
              receiveUsers.push(receiveUsersMap[key])
            }
            this.selectedCityGenerateReportUserList(receiveUsers)
            resolve()
          }).then(() => {
          })
        })
      },
      returnLastPage() {
        this.$router.push({
          path: `/superviseHelp/emergencyRecord`
        })
      },
      ...mapActions({
        selectedCityGenerateReportUserList: 'selectedCityGenerateReportUserList'
      })
    }
  }
</script>
