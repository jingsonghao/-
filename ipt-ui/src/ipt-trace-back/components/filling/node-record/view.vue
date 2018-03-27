<template>
  <ipt-modal @close="close" ref="iptModel">
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">查看</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">企业名称</label>
          <div class="col-sm-7">
            {{nodeRecord.enterpriseName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">企业类型</label>
          <div class="col-sm-7">
            {{nodeRecord.enterpriseTypeEnum.name}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营范围</label>
          <div class="col-sm-7">
            <el-tag v-for="item in nodeRecord.businessTypeEnumList" :key="item.value" type="info">{{item.name}}</el-tag>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">流通节点类型</label>
          <div class="col-sm-7">
            <el-tag v-for="item in nodeRecord.nodeTypeList" :key="item.nodeTypeNo" type="info">{{item.nodeTypeName}}</el-tag>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">备案日期</label>
          <div class="col-sm-7">
            {{nodeRecord.recordDate}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">城市编码</label>
          <div class="col-sm-7">
            {{nodeRecord.cityCode}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">所属地区编码</label>
          <div class="col-sm-7">
            {{nodeRecord.areaCode}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">经营地址</label>
          <div class="col-sm-7">
            {{nodeRecord.address}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">法人代表名称</label>
          <div class="col-sm-7">
            {{nodeRecord.legalRepresent}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">法人身份证号码</label>
          <div class="col-sm-7">
            {{nodeRecord.legalId}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">法人责任主体类型</label>
          <div class="col-sm-7">
            {{nodeRecord.legalTypeEnum.name}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">统一社会信用代码</label>
          <div class="col-sm-7">
            {{nodeRecord.socialCreditCode}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">注册日期</label>
          <div class="col-sm-7">
            {{nodeRecord.issuingDate}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">证照有效期至</label>
          <div class="col-sm-7">
            {{nodeRecord.termOfValidity}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系人</label>
          <div class="col-sm-7">
            {{nodeRecord.contacts}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">联系电话</label>
          <div class="col-sm-7">
            {{nodeRecord.telephone}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">传真</label>
          <div class="col-sm-7">
            {{nodeRecord.fax}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">登记人</label>
          <div class="col-sm-7">
            {{nodeRecord.recordUserName}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label"></label>
          <div class="col-sm-7 amap-wrapper amap-page-container">
            <!-- https://elemefe.github.io/vue-amap/#/zh-cn/examples/base/amap -->
            <el-amap
              vid="amap-fnr3"
              :zoom="zoom"
              :center="center"
              class="amap-default">
              <el-amap-marker
                v-for="(marker, key) in markers"
                :position="marker.position"
                :visible="marker.visible"
                :draggable="marker.draggable"
                :key="key"
                :vid="key">
              </el-amap-marker>
            </el-amap>
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
      enterpriseId: '',
      params: {}
    },
    data () {
      return {
        nodeRecord: {
          enterpriseTypeEnum: {
            name: ''
          },
          legalTypeEnum: {
            name: ''
          },
          businessTypeEnumList: [],
          nodeType: {
            nodeTypeName: ''
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
      enterpriseId (curVal) {
        if (!curVal) {
          return
        }
        let this_ = this
        Api.NodeRecord.getOne(curVal).then((data) => {
          if (data.status !== 200) {
            this.enterpriseId = ''
            this.nodeRecord = {}
            this_.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.close()
              }
            })
            return
          }
          this.nodeRecord = data.data
          this.addMarker({lng: this.nodeRecord.longitude, lat: this.nodeRecord.latitude})
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
