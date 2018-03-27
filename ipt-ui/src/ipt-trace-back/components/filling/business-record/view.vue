<template>
  <ipt-modal @close="close" ref="iptModel">
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">查看</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">自然人责任主体名称</label>
          <div class="col-sm-7">
            {{businessesRecord.bizName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营者性质代码</label>
          <div class="col-sm-7">
            {{businessesRecord.propertyEnum.name}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">备案日期</label>
          <div class="col-sm-7">
            {{businessesRecord.recordDate}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系人</label>
          <div class="col-sm-7">
            {{businessesRecord.contacts}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系电话</label>
          <div class="col-sm-7">
            {{businessesRecord.tel}}
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
  import Utils from '@/utils'

  export default {
    components: {
      IptModal
    },
    props: {
      businessBaseInfoId: '',
      params: {}
    },
    data () {
      return {
        businessesRecord: {
          propertyEnum: {
            name: ''
          }
        },
        areaList: [],
        markers: [],
        zoom: 10,
        center: [106.226806, 38.492294],
        plugin: [
          {
            pName: 'Scale',
            events: {
              init (instance) {
                console.log(instance)
              }
            }
          },
          {
            pName: 'ToolBar',
            events: {
              init (instance) {
                console.log(instance)
              }
            }
          }
        ]
      }
    },
    watch: {
      businessBaseInfoId (curVal) {
        if (!curVal) {
          return
        }
        let this_ = this
        Api.BusinessesRecord.getOne(curVal).then((data) => {
          if (data.status !== 200) {
            this.storeId = ''
            this.businessesRecord = {}
            this_.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.close()
              }
            })
            return
          }
          this.businessesRecord = data.data
          this.addMarker({lng: this.businessesRecord.longitude, lat: this.businessesRecord.latitude})
        })
      }
    },
    methods: {
      close () {
        $(this.$el).find('div.modal-header > button[aria-label="Close"]').trigger('click')
      },
      addMarker (point) {
        let marker = {
          position: [point.lng, point.lat]
        }
        this.removeMarker()
        this.markers.push(marker)
      },
      removeMarker (marker) {
        if (marker) {
          Utils.ArrayUtil.remove(this.markers, marker)
        }
        if (!this.markers.length) {
          return
        }
        this.markers.splice(this.markers.length - 1, 1)
      }
    }
  }
</script>
<style>
  .el-vue-amap-container {
    height: 300px !important;
  }
</style>
