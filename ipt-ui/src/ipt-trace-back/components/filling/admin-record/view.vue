<template>
  <ipt-modal @close="close" ref="iptModel">
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">查看</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">管理者姓名</label>
          <div class="col-sm-7">
            {{adminRecord.managerName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">所属企业</label>
          <div class="col-sm-7">
            {{adminRecord.enterpriseName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">管理者职务</label>
          <div class="col-sm-7">
            {{adminRecord.managerJob}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">备案日期</label>
          <div class="col-sm-7">
            {{adminRecord.recordDate}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">邮箱</label>
          <div class="col-sm-7">
            {{adminRecord.email}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系电话</label>
          <div class="col-sm-7">
            {{adminRecord.phone}}
          </div>
        </div>
      </form>
    </template>
    <!-- [modalFooter]底部插槽 -->
    <template slot="modalFooter">
      <button type="button" class="btn btn-search" @click="close">返回</button>
    </template>
  </ipt-modal>
</template>
<script>
  import $ from 'jquery'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-trace-back/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from '@/components/common/modal'

  export default {
    components: {
      IptModal
    },
    props: {
      managerId: '',
      params: {}
    },
    data () {
      return {
        adminRecord: {}
      }
    },
    watch: {
      managerId (curVal) {
        if (!curVal) {
          return
        }
        let this_ = this
        Api.AdminRecord.getOne(curVal).then((data) => {
          if (data.status !== 200) {
            this.storeId = ''
            this.adminRecord = {}
            this_.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.close()
              }
            })
            return
          }
          this.adminRecord = data.data
        })
      }
    },
    methods: {
      close () {
        $(this.$el).find('div.modal-header > button[aria-label="Close"]').trigger('click')
      }
    }
  }
</script>
<style>
  .el-vue-amap-container {
    height: 300px !important;
  }
</style>
