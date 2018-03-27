<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">查看</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">指标编号</label>
          <div class="col-sm-7">
            <input type="text" :value="examineIndexShow.eiNo" class="form-control" readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">指标名称</label>
          <div class="col-sm-7">
            <input type="text" :value="examineIndexShow.eiName" class="form-control" readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">指标类别</label>
          <div class="col-sm-7">
            <input type="text" :value="examineIndexShow.examineType.etName" class="form-control" readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">产品类别</label>
          <div class="col-sm-7">
            <input type="text" :value="examineIndexShow.cateCode == '0000'? '通用': examineIndexShow.cate.cateName" class="form-control"
                   readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">流通节点类型</label>
          <div class="col-sm-7">
            <input type="text" :value="examineIndexShow.nodeTypeNo == '0000'? '通用' : examineIndexShow.nodeType.nodeTypeName"
                   class="form-control" readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">指标内容</label>
          <div class="col-sm-7">
            <input type="text" :value="examineIndexShow.eiContent" name="eiContent"
                   placeholder="上传追溯信息活跃率=(实际上传追溯信息天数/考核周期总天数)*100%" class="form-control" readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">参数设置</label>
          每天上传完整、规范的追溯信息条数>
          <input class="input-text-small" type="text" :value="examineIndexShow.settingNumber" name="settingNumber" readonly>
          条，即记为实际上传追溯信息天数
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">指标状态</label>
          <div class="col-sm-7">
            <input type="text" :value="examineIndexShow.indexStateStr" name="eiContent" class="form-control" readonly>
          </div>
        </div>
      </form>
    </template>
  </ipt-modal>
</template>
<script>
  /**  引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    props: {
      examineIndexShow: {}
    }
  }
</script>

<style scoped>
  .input-text-small {
    display: inline-block;
    width: 50px;
  }
</style>
