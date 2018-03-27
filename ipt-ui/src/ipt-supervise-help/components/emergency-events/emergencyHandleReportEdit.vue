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
                  <vue-editor v-model="editedParams.particulars"
                              useCustomImageHandler @imageAdded="handleImageAdded"
                              v-validate="'required'" name="particulars"></vue-editor>
                </div>
                <span v-show="errors.firstByRule('particulars', 'required')" class="help is-danger">请填写内容</span>
              </div>
            </div>
            <div class="form-group">
              <label class="label-title">接收人</label>
              <div class="col-sm-8 choose-personnel">
                <input type="text" readonly v-model="selectUsers" name="selectUsers" v-validate="'required'"
                       class="form-control" :class="{'is-danger': errors.has('selectUsers') }">
                <a class="choice-btn" data-toggle="modal" data-target="#js_user_select"
                   :class="{'is-danger': errors.has('selectUsers') }">选择</a>
                <span v-show="errors.firstByRule('selectUsers', 'required')" class="help is-danger">请选择接收人</span>
                <ipt-user-select id="js_user_select"></ipt-user-select>
              </div>
            </div>
            <div class="text-right btn-box-j">
              <a type="button" class="btn btn-reset" @click="generate">提交</a>
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
  import CommonApi from '@/api'
  import IptChain from './emergencyChain'
  import IptUserSelect from './userSelect'
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      IptChain, VueEditor, IptUserSelect
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
        this.selectUsers = curVal.map(item => item.name)
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
            this.$validator.reset()
          })
        })
      },
      generate() {
        let self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            Api.EmergencyHandle.update(this.queryId, this.editedParams).then((data) => {
              self.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.returnLastPage()
                }
              })
            })
          }
        })
      },
      returnLastPage() {
        this.$validator.reset()
        this.$router.push({
          path: `/superviseHelp/emergencyHandle`
        })
      },
      handleImageAdded: function(file, Editor, cursorLocation) {
        CommonApi.Common.handleImageAdded(file, Editor, cursorLocation)
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
